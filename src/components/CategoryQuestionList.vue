<template>
  <ul class="question-list">
    <li class="question white-text z-depth-1"
      v-for="(q, i) in questions"
      :class="questionClass(q)"
      :key="q.q.hint"
      @click="$emit('click-question', q.q.category, i)">{{ q.q.points }}</li>
  </ul>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import { QuestionWithStatus } from '../question';

@Component
export default class CategoryQuestionList extends Vue {
  @Prop() private questions!: Array<QuestionWithStatus>;

  // eslint-disable-next-line
  private questionClass(q: QuestionWithStatus): any {
    return {
      blue: !q.seenAnswer,
      grey: q.seenAnswer,
      unanswered: !q.seenAnswer,
      answer: q.seenAnswer,
    };
  }
}
</script>

<style lang="scss">
ul.question-list {
  margin: 0;
}

.question {
  display: block;
  padding: 1rem;
  margin: 0.4rem 0.2rem;
}

.question.unanswered {
  cursor: pointer;
}

.question.answered {
  cursor: default;
}
</style>
