<template>
  <div class="question-panel">
    <div class="category-list">
      <div class="category center-align"
           v-for="(category, catIndex) in categories"
           :key="catIndex">
        <span class="header z-depth-1">{{ category.name }}</span>
        <category-question-list :category="category"
              @click-question="onClickQuestion"></category-question-list>
      </div>
    </div>
    <p v-if="categories.length === 0">
    It looks like there aren't any questions yet. Try adding some via edit mode!
    </p>
    <question-modal
            :showAnswer="showAnswer"
            ref="questionModal"
            @show-answer="onShowAnswer"
            @answer-question="onAnswerQuestion"
            @cancel-focus="onCancelFocus"></question-modal>
  </div>
</template>

<script lang="ts">
import {
  Prop, Ref, Component, Vue,
} from 'vue-property-decorator';

import { Scores } from '../Storage';
import { openModal, closeModal } from '../ModalHelpers';
import { emptyQuestion, Question, Category } from '../question';
import CategoryQuestionList from './CategoryQuestionList.vue';
import QuestionModal from './QuestionModal.vue';

@Component({
  components: {
    CategoryQuestionList,
    QuestionModal,
  },
})
export default class QuestionPanel extends Vue {
  @Ref() private questionModal!: QuestionModal;
  @Prop() private readonly categories!: Array<Category>;
  @Prop() private readonly scores!: Scores;

  private questionClicked = emptyQuestion('');
  private clickIndex = -1;
  private showAnswer = false;

  private onClickQuestion(i: number, q: Question) {
    if (q.seenAnswer) {
      return;
    }

    this.questionClicked = q;
    this.clickIndex = i;

    this.questionModal.init(Object.keys(this.scores), q);
    openModal(this.questionModal);
  }

  private onCancelFocus() {
    closeModal(this.questionModal);
    this.questionClicked = emptyQuestion('');
    this.clickIndex = -1;
  }

  private onShowAnswer() {
    this.$emit('view-answer', this.questionClicked);
  }

  private onAnswerQuestion(team: string) {
    this.$emit('add-score', team, this.questionClicked);
    this.onCancelFocus();
  }
}
</script>

<style scoped lang="scss">
@use 'src/assets/theme';

div.category-list {
  white-space: nowrap;
}

div.question-panel {
  margin-top: 1rem;
  overflow-x: auto;

  .category {
    display: inline-block;
    width: 12rem;
    vertical-align: top;

    .header {
      background: theme.$main;
      color: theme.$text;
      display: block;
      padding: 1rem;
      margin: 0.4rem 0.2rem;
      cursor: pointer;
    }
  }

}

ul.question-list {
  margin: 0;
}
</style>
