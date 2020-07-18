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
import { Question, Questions } from './question';
import { getQuestions, setQuestions } from './Storage';
import ControlPanel from './components/ControlPanel.vue';
import EditorPanel from './components/EditorPanel.vue';

@Component({
  components: {
    ControlPanel,
    EditorPanel,
  },
})
export default class Editor extends Vue {
  private questions: Questions = getQuestions();

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
    setQuestions(this.questions);
  }

  private onDeleteQuestion(category: string, i: number) {
    if (i >= 0 && i < this.questions[category].length) {
      this.$delete(this.questions[category], i);
      setQuestions(this.questions);
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
    setQuestions(this.questions);
  }

  private onAddCategory(category: string) {
    this.$set(this.questions, category, []);
    setQuestions(this.questions);
  }

  private onDeleteCategory(category: string) {
    this.$delete(this.questions, category);
    setQuestions(this.questions);
  }

  private onUploadFile(evt: Event) {
    const reader = new FileReader();
    reader.onload = (e: Event) => {
      const { result } = e.target as any;
      const questions = JSON.parse(result);
      this.questions = questions;
      setQuestions(this.questions);
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
