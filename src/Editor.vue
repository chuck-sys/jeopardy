<template>
  <div id="app" class="container">
    <editor-panel :questions="questions"
      @update-question="onUpdateQuestion"
      @delete-question="onDeleteQuestion"
      @rename-category="onRenameCategory"
      @add-category="onAddCategory"
      @delete-category="onDeleteCategory"></editor-panel>
    <control-panel class="control-panel"
      @download-file="onDownloadFile"
      @upload-file="onUploadFile"></control-panel>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large red" href="index.html">
        <i class="material-icons">play_arrow</i>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Question } from './question';
import ControlPanel from './components/ControlPanel.vue';
import EditorPanel from './components/EditorPanel.vue';

const Q_PSALMS: Array<Question> = [
  {
    hint: 'List 3 of the chapters we have studied this year.',
    points: 200,
    category: 'Psalm',
    answer: '1, 8, 23, 51, 90, 139, 16:1-11, 19:1-14, 121, 119:1-16, 119:89-106',
  },
  {
    hint: '1 + 1 =',
    points: 300,
    category: 'Psalm',
    answer: '2',
  },
];

const Q_LOVES: Array<Question> = [
  {
    hint: 'List the names of the 4 loves.',
    points: 100,
    category: '4 Loves',
    answer: 'Agape, Eros, Philia, Storge',
  },
];

@Component({
  components: {
    ControlPanel,
    EditorPanel,
  },
})
export default class Editor extends Vue {
  private questions: any = {
    Psalm: Q_PSALMS,
    '4 Loves': Q_LOVES,
  };

  private onUpdateQuestion(i: number, q: Question) {
    const { category } = q;
    if (i === this.questions[category].length) {
      this.questions[category].push(q);
    } else {
      this.questions[category][i].hint = q.hint;
      this.questions[category][i].answer = q.answer;
      this.questions[category][i].points = q.points;
    }

    this.questions[category].sort((a: Question, b: Question) => a.points - b.points);
  }

  private onDeleteQuestion(category: string, i: number) {
    if (i >= 0 && i < this.questions[category].length) {
      this.$delete(this.questions[category], i);
    }
  }

  private onRenameCategory(oldCategory: string, newCategory: string) {
    if (oldCategory === newCategory) {
      return;
    }

    const oldQuestions: Array<Question> = this.questions[oldCategory];
    oldQuestions.forEach((q) => {
      q.category = newCategory;
    });
    this.$set(this.questions, newCategory, oldQuestions);
    this.$delete(this.questions, oldCategory);
  }

  private onAddCategory(category: string) {
    this.$set(this.questions, category, []);
  }

  private onDeleteCategory(category: string) {
    this.$delete(this.questions, category);
  }

  private onUploadFile(evt: Event) {
    const reader = new FileReader();
    reader.onload = (e: Event) => {
      const { result } = e.target as any;
      const questions = JSON.parse(result);
      this.questions = questions;
    };

    reader.readAsText((evt.target as any).files[0]);
  }

  private onDownloadFile() {
    const filename = 'jeopardy.json';
    const filetype = 'application/json';
    const contents = JSON.stringify(this.questions);
    const a = document.createElement('a');

    a.href = `data:${filetype};base64,${btoa(contents)}`;
    a.download = filename;

    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: false,
    });
    a.dispatchEvent(clickEvent);
    a.remove();
  }
}
</script>

<style lang="scss">
div#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
}
</style>
