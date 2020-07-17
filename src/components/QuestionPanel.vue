<template>
  <div class="question-panel">
    <div v-if="!focused.clicked">
      <div class="category center-align"
           v-for="category in Object.keys(questions)"
           :key="category">
        <span class="header blue white-text z-depth-1">{{ category }}</span>
        <category-question-list :questions="questions[category]"
              @click-question="onClickQuestion"></category-question-list>
      </div>
    </div>
    <question-card v-else :question="focused.question"
                   :teams="Object.keys(scores)"
                   @answer-question="onAnswerQuestion"
                   @cancel-focus="onCancelFocus"></question-card>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import { QuestionWithStatus } from '../question';
import CategoryQuestionList from './CategoryQuestionList.vue';
import QuestionCard from './QuestionCard.vue';

interface Focused {
  clicked: boolean;
  question?: QuestionWithStatus;
}

function makeUnfocused(): Focused {
  return {
    clicked: false,
  };
}

@Component({
  components: {
    CategoryQuestionList,
    QuestionCard,
  },
})
export default class QuestionPanel extends Vue {
  @Prop() private questions!: any;
  @Prop() private scores!: any;

  private focused: Focused = makeUnfocused();

  private onClickQuestion(q: QuestionWithStatus) {
    if (q.seenAnswer) {
      return;
    }

    this.focused = { clicked: true, question: q };
  }

  private onCancelFocus() {
    this.focused = makeUnfocused();
  }

  private onAnswerQuestion(team: string, q: QuestionWithStatus) {
    if (q.answeredBy === '') {
      this.$set(this.scores, team, this.scores[team] + q.q.points);
      q.answeredBy = team;
    }
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
