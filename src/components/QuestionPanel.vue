<template>
  <div class="question-panel">
    <div class="category center-align"
         v-for="category in Object.keys(questions)"
         :key="category">
      <span class="header blue white-text z-depth-1">{{ category }}</span>
      <category-question-list :questions="questions[category]"
            @click-question="onClickQuestion"></category-question-list>
    </div>
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

import { openModal, closeModal } from '../ModalHelpers';
import { emptyQuestion } from '../question';
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
  @Prop() private readonly questions!: any;
  @Prop() private readonly scores!: any;

  private questionClicked = emptyQuestion('');
  private clickIndex = -1;
  private showAnswer = false;

  private onClickQuestion(category: string, i: number) {
    const q = this.questions[category][i];
    if (q.seenAnswer) {
      return;
    }

    this.questionClicked = q.q;
    this.clickIndex = i;

    this.questionModal.init(Object.keys(this.scores), this.questionClicked);
    openModal(this.questionModal);
  }

  private onCancelFocus() {
    closeModal(this.questionModal);
    this.questionClicked = emptyQuestion('');
    this.clickIndex = -1;
  }

  private onShowAnswer() {
    this.$emit('view-answer', this.questionClicked.category, this.clickIndex);
  }

  private onAnswerQuestion(team: string) {
    this.$emit('add-score', team, this.questionClicked.category, this.clickIndex);
    this.onCancelFocus();
  }
}
</script>

<style lang="scss">
div.question-panel {
  margin-top: 1rem;

  .category {
    float: left;
    width: 10rem;

    .header {
      display: block;
      padding: 1rem;
      margin: 0.4rem 0.2rem;
    }
  }
}

ul.question-list {
  margin: 0;
}
</style>
