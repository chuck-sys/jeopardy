<template>
  <div class="editor-panel">
    <div class="category-list">
      <div class="category center-align"
           v-for="category in Object.keys(questions)"
           :key="category">
        <span class="header z-depth-1"
              @click="onClickCategory(category)">{{ category }}</span>
        <category-question-list-pure
              :questions="questions[category]"
              :category="category"
              @click-question="onClickQuestion"></category-question-list-pure>
        <span class="add-question z-depth-1"
              :class="addQuestionClass(category)"
              @click="onAddQuestion(category)">
          <i class="material-icons">add</i>
          Add Question
        </span>
      </div>
      <div class="z-depth-1 add-category"
           :class="{pulse: Object.keys(questions).length === 0}"
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

import { openModal, closeModal } from '../ModalHelpers';
import EditModal from './EditModal.vue';
import CategoryQuestionListPure from './CategoryQuestionListPure.vue';
import CategoryModal from './CategoryModal.vue';
import { emptyQuestion, copy as copyQuestion, Questions } from '../question';

@Component({
  components: {
    EditModal,
    CategoryQuestionListPure,
    CategoryModal,
  },
})
export default class EditorPanel extends Vue {
  @Ref() private categoryModal!: CategoryModal;
  @Ref() private editModal!: EditModal;
  @Prop() private readonly questions!: Questions;

  private clickIndex = -1;
  private questionClone = emptyQuestion('');

  private addQuestionClass(category: string) {
    return {
      pulse: this.questions[category]
      && Object.keys(this.questions[category]).length === 0,
    };
  }

  private onSaveCategory(oldCategory: string, newCategory: string) {
    if (oldCategory === '') {
      this.$emit('add-category', newCategory);
    } else {
      this.$emit('rename-category', oldCategory, newCategory);
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

  private onAddQuestion(category: string) {
    // Logically, when you click at the end of a list, the index should be the
    // end of the list.
    this.clickIndex = this.questions[category].length;
    this.questionClone = emptyQuestion(category);

    this.editModal.init(this.questionClone);
    openModal(this.editModal);
  }

  private onSaveQuestion() {
    this.$emit('update-question', this.clickIndex, this.questionClone);
    this.onCancelFocus();
  }

  private onAddCategory() {
    this.categoryModal.init('');
    openModal(this.categoryModal);
  }

  private onClickCategory(category: string) {
    this.categoryModal.init(category);
    openModal(this.categoryModal);
  }

  private onClickQuestion(category: string, i: number) {
    this.clickIndex = i;
    this.questionClone = copyQuestion(this.questions[category][i]);
    this.editModal.init(this.questionClone);
    openModal(this.editModal);
  }

  private onCancelFocus() {
    this.clickIndex = -1;
    this.questionClone = emptyQuestion('');
    closeModal(this.editModal);
  }

  private onDeleteQuestion() {
    const { category } = this.questionClone;
    this.$emit('delete-question', category, this.clickIndex);
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
