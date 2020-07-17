<template>
  <div id="app" class="container">
    <scoreboard :scores="scores"></scoreboard>
    <question-panel :questions="questions" :scores="scores"></question-panel>
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
  private scores: object = {
    'Team Hulu': 100,
    'Team Bond': 300,
  };

  private questions: object = {
    Psalm: mapAddStatus(Q_PSALMS),
    '4 Loves': mapAddStatus(Q_LOVES),
  };
}
</script>

<style lang="scss">
#app {
  padding-left: 300px;
}
</style>
