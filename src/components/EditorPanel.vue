<template>
  <div class="editor-panel">
    <div class="category-list">
      <draggable :list="categories" @end="onReorderDone">
        <div class="category center-align"
             v-for="(category, catIndex) in categories"
             :key="catIndex">
          <span class="header z-depth-1"
                slot="header"
                @click="onClickCategory(catIndex, category)">{{ category.name }}</span>
          <category-question-list-pure
              :category="category"
              :catIndex="catIndex"
              @click-question="onClickQuestion"></category-question-list-pure>
          <span class="add-question z-depth-1"
                slot="footer"
                :class="addQuestionClass(category)"
                @click="onAddQuestion(catIndex, category)">
            <i class="material-icons">add</i>
            Add Question
          </span>
        </div>
      </draggable>
      <div class="z-depth-1 add-category"
           :class="{pulse: categories.length === 0}"
           @click="onAddCategory">
        <i class="material-icons">add</i>
        <span>Add Category</span>
      </div>
    </div>

    <edit-modal
      ref="editModal"
      @save-question="onSaveQuestion"
      @delete="onDeleteQuestion"
      @cancel-focus="onCancelFocus"></edit-modal>

    <category-modal ref="categoryModal"
                    @save-category="onSaveCategory"
                    @cancel-category="onCancelCategory"
                    @delete-category="onDeleteCategory"></category-modal>
  </div>
</template>

<script lang="ts">
import {
  Prop, Component, Ref, Vue,
} from 'vue-property-decorator';
import draggable from 'vuedraggable';

import { openModal, closeModal } from '../ModalHelpers';
import EditModal from './EditModal.vue';
import CategoryQuestionListPure from './CategoryQuestionListPure.vue';
import CategoryModal from './CategoryModal.vue';
import { emptyQuestion, copy as copyQuestion, Category } from '../question';

@Component({
  components: {
    EditModal,
    CategoryQuestionListPure,
    CategoryModal,
    draggable,
  },
})
export default class EditorPanel extends Vue {
  @Ref() private categoryModal!: CategoryModal;
  @Ref() private editModal!: EditModal;
  @Prop() private readonly categories!: Array<Category>;

  private clickIndex = -1;
  private questionClone = emptyQuestion('');

  private onReorderDone() {
    this.$emit('finish-reorder');
  }

  private addQuestionClass(category: Category) {
    return {
      pulse: category.questions.length === 0,
    };
  }

  private onSaveCategory(catIndex: number, newCategory: string) {
    if (catIndex === -1) {
      this.$emit('add-category', newCategory);
    } else {
      this.$emit('rename-category', catIndex, newCategory);
    }
    closeModal(this.categoryModal);
  }

  private onCancelCategory() {
    closeModal(this.categoryModal);
  }

  private onDeleteCategory(category: string) {
    this.$emit('delete-category', category);
    closeModal(this.categoryModal);
  }

  private onAddQuestion(catIndex: number, category: Category) {
    // Logically, when you click at the end of a list, the index should be the
    // end of the list.
    this.clickIndex = category.questions.length;
    this.questionClone = emptyQuestion(category.name);

    this.editModal.init(catIndex, this.questionClone);
    openModal(this.editModal);
  }

  private onSaveQuestion(catIndex: number) {
    this.$emit('update-question', catIndex, this.clickIndex, this.questionClone);
    this.onCancelFocus();
  }

  private onAddCategory() {
    this.categoryModal.init(-1, { name: '', questions: [] });
    openModal(this.categoryModal);
  }

  private onClickCategory(catIndex: number, category: Category) {
    this.categoryModal.init(catIndex, category);
    openModal(this.categoryModal);
  }

  private onClickQuestion(catIndex: number, i: number) {
    this.clickIndex = i;
    this.questionClone = copyQuestion(this.categories[catIndex].questions[i]);
    this.editModal.init(catIndex, this.questionClone);
    openModal(this.editModal);
  }

  private onCancelFocus() {
    this.clickIndex = -1;
    this.questionClone = emptyQuestion('');
    closeModal(this.editModal);
  }

  private onDeleteQuestion(catIndex: number) {
    this.$emit('delete-question', catIndex, this.clickIndex);
    closeModal(this.editModal);
  }
}
</script>

<style lang="scss">
@use 'src/assets/theme.scss';

div.category-list {
  margin: 1rem;
  overflow-x: auto;
  min-height: 10rem;
  border-bottom: 1px solid theme.$disabled;
  white-space: nowrap;

  .category {
    display: inline-block;
    width: 10rem;
    vertical-align: top;

    .header, .add-question {
      background: theme.$main;
      color: theme.$text;
      display: block;
      padding: 1rem;
      margin: 0.4rem 0.2rem;
      cursor: pointer;
    }
  }

  .add-category {
    display: inline-block;
    background: theme.$main;
    color: theme.$text;
    padding: 1rem;
    width: 10rem;
    margin: 0.4rem 0.2rem;
    cursor: pointer;
  }

  i.material-icons {
    font-size: 1rem;
    margin: auto;
  }
}
</style>
