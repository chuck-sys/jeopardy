<template>
  <div id="app" class="container">
    <editor-panel class="editor-panel" :questions="questions"></editor-panel>
    <control-panel class="control-panel"
      @download-file="onDownloadFile"
      @upload-file="onUploadFile"></control-panel>
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
  private questions: object = {
    Psalm: Q_PSALMS,
    '4 Loves': Q_LOVES,
  };

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
