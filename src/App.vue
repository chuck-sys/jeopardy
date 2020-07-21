<template>
  <div id="app">
    <scoreboard :scores="scores"
       id="scoreboard"
       ref="scoreboard"
       @add-team="onAddTeam"
       @remove-team="onRemoveTeam"></scoreboard>
    <div class="main">
      <question-panel :questions="questions" :scores="scores"
        @add-score="onAddScore" @view-answer="onViewAnswer"></question-panel>
    </div>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large red"
         :class="{pulse: Object.keys(questions).length === 0}"
         href="editor.html">
        <i class="material-icons">mode_edit</i>
      </a>
    </div>

    <a class="pulltab danger" href="#" @click="onPulloutScoreboard">
      Scoreboard
    </a>

    <scoring-toast :scores="scores" ref="scoringToast"></scoring-toast>
  </div>
</template>

<script lang="ts">
import { Ref, Component, Vue } from 'vue-property-decorator';
import M from 'materialize-css';

import {
  getQuestions, getTeams, setTeams, Scores,
} from './Storage';
import {
  QuestionWithStatus, questionsMakeStatus, QuestionsWithStatus,
} from './question';
import Scoreboard from './components/Scoreboard.vue';
import QuestionPanel from './components/QuestionPanel.vue';
import ScoringToast from './components/ScoringToast.vue';

@Component({
  components: {
    Scoreboard,
    QuestionPanel,
    ScoringToast,
  },
})
export default class App extends Vue {
  @Ref() private scoreboard!: Scoreboard;
  @Ref() private scoringToast!: ScoringToast;

  private scores: Scores = getTeams();
  private questions: QuestionsWithStatus = questionsMakeStatus(getQuestions());

  private onPulloutScoreboard() {
    const instance = M.Sidenav.init(this.scoreboard.$el, {});
    instance.open();
  }

  private onAddScore(team: string, category: string, i: number) {
    if (i >= 0 && i < this.questions[category].length) {
      const q: QuestionWithStatus = this.questions[category][i];
      this.scoringToast.init(team, this.scores[team], Number(q.q.points));
      this.$set(this.scores, team, this.scores[team] + Number(q.q.points));
      q.answeredBy = team;

      this.scoringToast.display();
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
  font-size: 18px;
  margin: 1rem;
}

div.main {
  display: flex;
  flex-direction: column;
  align-content: center;
}

input#i-file {
  margin-top: 2rem;
}

a.pulltab {
  position: absolute;
  width: 10rem;
  text-align: right;
  left: -8rem;
  top: 50vh;
  padding: 0.5rem 3rem 0.5rem 0;
  border-radius: 0 1rem 1rem 0;

  transition: left 0.3s;

  &:hover {
    left: 0;
  }
}
</style>
