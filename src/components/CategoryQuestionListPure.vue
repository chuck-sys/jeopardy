<template>
  <ul class="question-list">
    <li class="question z-depth-1"
      v-for="(q, i) in category.questions"
      :key="q.hint"
      @click="$emit('click-question', catIndex, i)">{{ q.points }}</li>
  </ul>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import { Category } from '../question';

@Component
export default class CategoryQuestionList extends Vue {
  @Prop() private readonly category!: Category;
  @Prop() private readonly catIndex!: number;
}
</script>

<style scoped lang="scss">
@use 'src/assets/theme';

ul.question-list {
  margin: 0;
}

.question {
  background: theme.$main;
  color: theme.$text;
  display: block;
  padding: 1rem;
  margin: 0.4rem 0.2rem;
  cursor: pointer;
}
</style>
