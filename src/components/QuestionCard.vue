<template>
  <div class="card blue large">
    <div class="card-content white-text">
      <span class="card-title">{{ question.q.points }}</span>
      <p v-html="question.q.hint"></p>
      <p v-if="showAnswer" v-html="question.q.answer"></p>
    </div>
    <div class="card-action" v-if="question.seenAnswer">
      <a href="#" v-for="team in teams"
                  :key="team"
                  @click="$emit('answer-question', team, question)">
        {{ team }}
      </a>
      <a href="#" v-if="!question.seenAnswer" @click="onShowAnswer">Show Answer</a>
      <a href="#" @click="$emit('cancel-focus')">Close</a>
    </div>
    <div class="card-action" v-else>
      <a href="#" @click="onShowAnswer">Show Answer</a>
      <a href="#" @click="$emit('cancel-focus')">Close</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import { QuestionWithStatus } from '../question';

@Component
export default class QuestionCard extends Vue {
  @Prop() private teams!: Array<string>;
  @Prop() private question!: QuestionWithStatus;

  private showAnswer = false;

  private onShowAnswer() {
    this.showAnswer = true;
    this.question.seenAnswer = true;
  }
}
</script>
