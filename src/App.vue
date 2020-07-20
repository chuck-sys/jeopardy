<template>
  <div id="app" class="container">
    <scoreboard :scores="scores"
      @add-team="onAddTeam"
      @remove-team="onRemoveTeam"></scoreboard>
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

import {
  getQuestions, setQuestions, getTeams, setTeams, Scores,
} from './Storage';
import {
  QuestionWithStatus, questionsMakeStatus, QuestionsWithStatus,
} from './question';
import Scoreboard from './components/Scoreboard.vue';
import QuestionPanel from './components/QuestionPanel.vue';

@Component({
  components: {
    Scoreboard,
    QuestionPanel,
  },
})
export default class App extends Vue {
  private scores: Scores = getTeams();
  private questions: QuestionsWithStatus = questionsMakeStatus(getQuestions());

  private onUploadFile(evt: Event) {
    const reader = new FileReader();
    reader.onload = (e: Event) => {
      const { result } = e.target as any;
      const questions = JSON.parse(result);

      this.questions = questionsMakeStatus(questions);
      setQuestions(questions);
    };

    reader.readAsText((evt.target as any).files[0]);
  }

  private onAddScore(team: string, category: string, i: number) {
    if (i >= 0 && i < this.questions[category].length) {
      const q: QuestionWithStatus = this.questions[category][i];
      this.$set(this.scores, team, this.scores[team] + Number(q.q.points));
      q.answeredBy = team;
    }
  }

  private onAddTeam(team: string) {
    if (Object.prototype.hasOwnProperty.call(this.scores, team)) {
      return;
    }
    this.$set(this.scores, team, 0);
    setTeams(this.scores);
  }

  private onRemoveTeam(team: string) {
    this.$delete(this.scores, team);
    setTeams(this.scores);
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
@use 'src/assets/theme';

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
