<template>
  <div id="app" class="container">
    <scoreboard :scores="scores"></scoreboard>
    <div class="main">
      <question-panel :questions="questions" :scores="scores"
        @add-score="onAddScore" @view-answer="onViewAnswer"></question-panel>
      <input id="i-file" type="file" @change="onUploadFile($event)"
                         accept="application/json">
    </div>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large red" href="editor.html">
        <i class="material-icons">mode_edit</i>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Question, QuestionWithStatus, mapAddStatus } from './question';
import Scoreboard from './components/Scoreboard.vue';
import QuestionPanel from './components/QuestionPanel.vue';

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
    Scoreboard,
    QuestionPanel,
  },
})
export default class App extends Vue {
  private scores: any = {
    'Team Hulu': 100,
    'Team Bond': 300,
  };
  private questions: any = {
    Psalm: mapAddStatus(Q_PSALMS),
    '4 Loves': mapAddStatus(Q_LOVES),
  };

  private onUploadFile(evt: Event) {
    const reader = new FileReader();
    reader.onload = (e: Event) => {
      const { result } = e.target as any;
      const questions = JSON.parse(result);

      Object.keys(questions).forEach((category) => {
        questions[category] = mapAddStatus(questions[category]);
      });

      this.questions = questions;
    };

    reader.readAsText((evt.target as any).files[0]);
  }

  private onAddScore(team: string, category: string, i: number) {
    if (i >= 0 && i < this.questions[category].length) {
      const q: QuestionWithStatus = this.questions[category][i];
      this.$set(this.scores, team, this.scores[team] + q.q.points);
      q.answeredBy = team;
    }
  }

  private onViewAnswer(category: string, i: number) {
    if (i >= 0 && i < this.questions[category].length) {
      const q: QuestionWithStatus = this.questions[category][i];
      q.seenAnswer = true;
    }
  }
}
</script>

<style lang="scss">
#app {
  padding-left: 300px;
}

div.main {
  display: flex;
  flex-direction: column;
  align-content: center;
}

input#i-file {
  margin-top: 2rem;
}
</style>
