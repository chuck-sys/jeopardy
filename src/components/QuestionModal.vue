<template>
  <div class="modal blue">
    <div class="modal-content white-text">
      <span class="card-title">{{ question.points }}</span>
      <p v-html="question.hint"></p>
      <p v-if="showAnswer" v-html="question.answer"></p>
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
import { Prop, Component, Vue } from 'vue-property-decorator';
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

<style lang="scss">
div.modal div.modal-footer a.btn {
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}
</style>
