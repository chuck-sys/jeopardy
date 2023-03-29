<template>
  <div id="app">
    <scoreboard :scores="scores"
       id="scoreboard"
       ref="scoreboard"
       @add-team="onAddTeam"
       @remove-team="onRemoveTeam"></scoreboard>
    <div class="main">
      <question-panel
          :categories="categories"
          :scores="scores"
          @add-score="onAddScore"
          @view-answer="onViewAnswer"></question-panel>
    </div>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large danger"
         :class="{pulse: categories.length === 0}"
         title="Edit Game"
         href="editor.html">
        <i class="material-icons">mode_edit</i>
      </a>
    </div>

    <a class="pulltab danger" href="#" @click="onPulloutScoreboard"
                              :class="pulltabClass()">
      Scoreboard
    </a>

    <scoring-toast :scores="scores" ref="scoringToast"></scoring-toast>
  </div>
</template>

<script lang="ts">
import { Ref, Component, Vue } from 'vue-property-decorator';
import M from 'materialize-css';

import {
  getCategories, getTeams, setTeams, Scores, setCategories,
} from './Storage';
import { Question, Category } from './question';
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
  private categories: Array<Category> = getCategories();

  private onPulloutScoreboard() {
    const instance = M.Sidenav.init(this.scoreboard.$el, {});
    instance.open();
  }

  private onAddScore(team: string, q: Question) {
    this.scoringToast.init(team, this.scores[team], Number(q.points));
    this.$set(this.scores, team, this.scores[team] + Number(q.points));
    q.answeredBy = team;

    this.scoringToast.display();
    setTeams(this.scores);
    setCategories(this.categories);
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

  private onViewAnswer(q: Question) {
    q.seenAnswer = true;
    setCategories(this.categories);
  }

  private pulltabClass() {
    return {
      pulse: this.categories.length > 0
      && Object.keys(this.scores).length === 0,
    };
  }
}
</script>

<style scoped lang="scss">
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

div.fixed-action-btn {
  left: 23px;
  right: unset;
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
