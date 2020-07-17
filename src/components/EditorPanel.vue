<template>
  <div>
    <div v-if="!focused.clicked">
      <div class="category center-align"
        v-for="category in Object.keys(questions)"
        :key="category">
        <span class="header blue white-text z-depth-1">{{ category }}</span>
        <category-question-list-pure :questions="questions[category]"
          @click-question="onClickQuestion"></category-question-list-pure>
        <span class="add-question blue lighten-2 white-text z-depth-1"
          @click="onAddQuestion(category)">
          <i class="material-icons">add</i>
        </span>
      </div>
      <span class="blue lighten-2 white-text z-depth-1"
        @click="onAddCategory"
        :class="{card: typeCategory, 'add-category': !typeCategory}">
        <i class="material-icons">add</i>
        <span>Add Category</span>
      </span>
    </div>
    <edit-card v-else
      :question="focused.question"
      @delete="onDeleteQuestion"
      @cancel-focus="onCancelFocus"></edit-card>

    <category-modal :category="tempCategory" ref="categoryModal"
      @save-category="onSaveCategory"
      @cancel-category="onCancelCategory"
      @delete-category="onDeleteCategory"></category-modal>
  </div>
</template>

<script lang="ts">
import {
  Prop, Component, Ref, Vue,
} from 'vue-property-decorator';
import M from 'materialize-css';

import EditCard from './EditCard.vue';
import CategoryQuestionListPure from './CategoryQuestionListPure.vue';
import CategoryModal from './CategoryModal.vue';
import { Question } from '../question';

interface Focused {
  clicked: boolean;
  question?: Question;
}

function makeUnfocused(): Focused {
  return {
    clicked: false,
  };
}

@Component({
  components: {
    EditCard,
    CategoryQuestionListPure,
    CategoryModal,
  },
})
export default class EditorPanel extends Vue {
  @Ref() private categoryModal!: Vue;
  @Prop() private questions!: any;

  private focused = makeUnfocused();
  private typeCategory = false;
  private tempCategory = '';

  private onSaveCategory(oldCategory: string, newCategory: string) {
    const oldQuestions = oldCategory === '' ? [] : this.questions[oldCategory];
    this.$set(this.questions, newCategory, oldQuestions);
    this.$delete(this.questions, oldCategory);

    const modal = M.Modal.getInstance(this.categoryModal.$el);
    modal.close();
  }

  private onCancelCategory() {
    const modal = M.Modal.getInstance(this.categoryModal.$el);
    modal.close();
  }

  private onDeleteCategory(category: string) {
    this.$delete(this.questions, category);

    const modal = M.Modal.getInstance(this.categoryModal.$el);
    modal.close();
  }

  private onAddQuestion(category: string) {
    const q: Question = {
      hint: '',
      points: 100,
      category,
      answer: '',
    };
    this.questions[category].push(q);
    this.focused = { clicked: true, question: q };
  }

  private onAddCategory() {
    const instance = M.Modal.init(this.categoryModal.$el, {});
    instance.open();
  }

  private onClickQuestion(q: Question) {
    this.focused = { clicked: true, question: q };
  }

  private onCancelFocus() {
    if (this.focused.question && this.focused.question.hint === '') {
      this.onDeleteQuestion(this.focused.question);
    }
    this.focused = makeUnfocused();
  }

  private onDeleteQuestion(q: Question) {
    const { category } = q;
    const i = this.questions[category].indexOf(q);
    if (i >= 0 && i < this.questions[category].length) {
      this.$delete(this.questions[category], i);
    }
  }
}
</script>

<style lang="scss">
div.editor-panel {
  margin-top: 1rem;

  .category {
    float: left;
    width: 10rem;

    .header, .add-question {
      display: block;
      padding: 1rem;
      margin: 0.4rem 0.2rem;
      cursor: pointer;
    }
  }

  .add-category {
    float: left;
    display: block;
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
