<template>
  <div>
    <div v-if="!focused.clicked">
      <div class="category center-align"
        v-for="category in Object.keys(questions)"
        :key="category">
        <span class="header blue white-text z-depth-1">{{ category }}</span>
        <category-question-list-pure :questions="questions[category]"
          @click-question="onClickQuestion"></category-question-list-pure>
      </div>
    </div>
    <edit-card v-else
      :question="focused.question"
      @delete="onDeleteQuestion"
      @cancel-focus="onCancelFocus"></edit-card>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import EditCard from './EditCard.vue';
import CategoryQuestionListPure from './CategoryQuestionListPure.vue';
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
  },
})
export default class EditorPanel extends Vue {
  @Prop() private questions!: any;

  private focused = makeUnfocused();

  private onClickQuestion(q: Question) {
    this.focused = { clicked: true, question: q };
  }

  private onCancelFocus() {
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

    .header {
      display: block;
      padding: 1rem;
      margin: 0.4rem 0.2rem;
    }
  }
}
</style>
