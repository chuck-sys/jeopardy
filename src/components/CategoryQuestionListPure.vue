<template>
  <ul class="question-list">
    <li class="question blue white-text z-depth-1"
      v-for="q in questions"
      :key="q.hint"
      @click="$emit('click-question', q)">{{ q.points }}</li>
  </ul>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import { Question } from '../question';

@Component
export default class CategoryQuestionList extends Vue {
  @Prop() private questions!: Array<Question>;
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
  cursor: pointer;
}
</style>
