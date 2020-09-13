<template>
  <div class="modal">
    <div class="modal-content">
      <span class="card-title">
        [ {{ question.points }} {{ question.points === 1 ? "Point" : "Points" }} ]
      </span>
      <hr>
      <p id="question-hint" v-html="question.hint"></p>
      <div v-if="showAnswer">
        <hr>
        <strong class="inconspicuous-text">Answer</strong>
        <p id="question-answer" v-html="question.answer"></p>
      </div>
    </div>
    <div class="modal-footer" v-if="showAnswer">
      <a href="#" v-for="team in teams"
                  :key="team"
                  class="waves-effect waves-light btn"
                  @click="$emit('answer-question', team)">
        {{ team }}
      </a>
      <a href="#" @click="$emit('cancel-focus')" class="waves-effect waves-light btn">Close</a>
    </div>
    <div class="modal-footer" v-else>
      <a href="#" @click="onShowAnswer" class="waves-effect waves-light btn">Show Answer</a>
      <a href="#" @click="$emit('cancel-focus')" class="waves-effect waves-light btn">Close</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Question, emptyQuestion } from '../question';

@Component
export default class QuestionModal extends Vue {
  private showAnswer = false;
  private teams: Array<string> = [];
  private question: Question = emptyQuestion('');

  private onShowAnswer() {
    this.showAnswer = true;
    this.$emit('show-answer');
  }

  public init(teams: Array<string>, question: Question) {
    this.showAnswer = false;
    this.teams = teams;
    this.question = question;
  }
}
</script>

<style scoped lang="scss">
@use 'src/assets/theme.scss';

div.modal div.modal-footer a.btn {
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}

span.card-title {
  text-align: right;
  display: block;
  line-height: 0;
  color: theme.$text-inconspicuous;
}

strong.inconspicuous-text {
  font-size: 0.9rem;
}
</style>
