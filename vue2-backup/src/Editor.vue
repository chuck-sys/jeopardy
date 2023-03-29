<template>
  <div id="app">
    <editor-panel :categories="categories"
       @update-question="onUpdateQuestion"
       @delete-question="onDeleteQuestion"
       @rename-category="onRenameCategory"
       @add-category="onAddCategory"
       @finish-reorder="onFinishReorder"
       @delete-category="onDeleteCategory"></editor-panel>
    <control-panel class="control-panel"
                   @reset-questions="onResetQuestions"
                   @reset-scores="onResetScores"
                   @delete-all="onDeleteAll"
                   @download-file="onDownloadFile"
                   @upload-file="onUploadFile"></control-panel>

    <footer>
      <div class="footer-content">
        <a href="about.html">About Jeopardy {{ version }}</a> .
        <a href="https://gitlab.com/chucksys/jeopardy-vue/">Code</a> .
        <a href="https://youtu.be/RnRrs5neEMo">Help</a>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import PKGINFO from '../package.json';
import { Question, Category } from './question';
import {
  getCategories, setCategories, getTeams, setTeams, Scores,
} from './Storage';
import ControlPanel from './components/ControlPanel.vue';
import EditorPanel from './components/EditorPanel.vue';
import T from './Toaster';

function encodeBase64(str: string): string {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    (_, p1) => String.fromCharCode(Number(`0x${p1}`))));
}

@Component({
  components: {
    ControlPanel,
    EditorPanel,
  },
})
export default class Editor extends Vue {
  private categories: Array<Category> = getCategories();
  private hasPermanentlyDeletedBefore = false;
  private readonly version = PKGINFO.version;

  // eslint-disable-next-line
  private onResetScores() {
    const teams: Scores = getTeams();
    Object.keys(teams).forEach((teamName) => {
      teams[teamName] = 0;
    });
    setTeams(teams);
    T.resetAllTeamScores();
  }

  private onFinishReorder() {
    setCategories(this.categories);
  }

  private onResetQuestions() {
    this.categories.forEach((cat: Category) => {
      cat.questions.forEach((q: Question) => {
        q.answeredBy = '';
        q.seenAnswer = false;
      });
    });
    setCategories(this.categories);
    T.resetAllQuestions();
  }

  private onDeleteAll() {
    // We appear to delete everything here, but we don't actually save the
    // empty question set into local storage until AFTER you make a change, or
    // unless you press the "delete all" button again.
    if (this.categories.length === 0) {
      setCategories(this.categories);
      T.permanentDelete();
      this.hasPermanentlyDeletedBefore = true;
    } else {
      this.categories = [];

      if (!this.hasPermanentlyDeletedBefore) {
        T.deleteOnceNotPermanent();
      }
    }
  }

  private onUpdateQuestion(catIndex: number, qIndex: number, q: Question) {
    const { hint, answer } = q;
    q.points = Number(q.points);
    if (qIndex === this.categories[catIndex].questions.length) {
      this.categories[catIndex].questions.push(q);
    } else {
      this.categories[catIndex].questions[qIndex].hint = hint;
      this.categories[catIndex].questions[qIndex].answer = answer;
      this.categories[catIndex].questions[qIndex].points = q.points;
    }

    this.categories[catIndex].questions.sort((a: Question, b: Question) => a.points - b.points);
    setCategories(this.categories);
  }

  private onDeleteQuestion(catId: number, i: number) {
    this.$delete(this.categories[catId].questions, i);
    setCategories(this.categories);
    T.deleteQuestion();
  }

  private onRenameCategory(catId: number, newCategory: string) {
    this.categories[catId].name = newCategory;
    this.categories[catId].questions.forEach((q: Question) => {
      q.category = newCategory;
    });
    setCategories(this.categories);
    T.updateCategory();
  }

  private onAddCategory(category: string) {
    this.categories.push({ name: category, questions: [] });
    setCategories(this.categories);
  }

  private onDeleteCategory(catId: number) {
    const catName = this.categories[catId].name;
    this.$delete(this.categories, catId);
    setCategories(this.categories);
    T.deleteCategory(catName);
  }

  private onUploadFile(evt: Event) {
    const reader = new FileReader();
    reader.onload = (e: Event) => {
      const { result } = e.target as any;
      const categories = JSON.parse(result);
      this.categories = categories;
      setCategories(this.categories);
      T.uploadFile();
    };

    reader.readAsText((evt.target as any).files[0]);
  }

  private onDownloadFile() {
    const filename = 'jeopardy.json';
    const filetype = 'application/json';
    const contents = JSON.stringify(this.categories);
    const a = document.createElement('a');

    a.href = `data:${filetype};base64,${encodeBase64(contents)}`;
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

<style scoped lang="scss">
@use 'src/assets/theme';

div#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
}

footer {
  margin: 3rem auto 1rem auto;

  .footer-content {
    text-align: center;
    color: theme.$text;

    a, a:hover, a:focus, a:visited {
      margin: auto 0.5rem;
      color: darken(theme.$text, 10%);
      text-decoration: underline;
    }
  }
}
</style>
