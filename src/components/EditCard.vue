<template>
  <div class="card blue large">
    <div class="card-content white-text">
      <input id="i-points" class="white-text" type="number" v-model="points">
      <span>Number of points</span>
      <textarea id="i-hint" cols="30" rows="10" v-model="hint"></textarea>
      <label for="i-hint">The question itself</label>
      <textarea id="i-answer" cols="30" rows="10" v-model="answer"></textarea>
      <label for="i-answer">The answer to the question</label>
    </div>
    <div class="card-action">
      <a href="#" @click="$emit('cancel-focus')">Cancel</a>
      <a href="#" @click="onSave">Save</a>
      <a href="#"
         class="btn"
         :class="{red: clickDelete, 'white-text': clickDelete}"
        @click="onClickDelete">Delete</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import { Question } from '../question';

@Component
export default class EditClass extends Vue {
  @Prop() private question!: Question;
  @Prop() private category!: string;

  private points = this.question.points;
  private hint = this.question.hint;
  private answer = this.question.answer;
  private clickDelete = false;

  private deleteClass() {
    return {
      red: this.clickDelete,
      'white-text': this.clickDelete,
      btn: this.clickDelete,
    };
  }

  private onSave() {
    this.question.points = this.points;
    this.question.hint = this.hint;
    this.question.answer = this.answer;

    this.$emit('cancel-focus');
  }

  private onClickDelete() {
    if (this.clickDelete) {
      this.$emit('cancel-focus');
      this.$emit('delete', this.question);
    } else {
      this.clickDelete = true;
      setTimeout(() => {
        this.clickDelete = false;
      }, 1000);
    }
  }
}
</script>
