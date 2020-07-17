<template>
  <div class="modal blue">
    <div class="modal-content white-text">
      Number of points
      <div class="input-field inline">
        <input id="i-points" class="white-text validate" type="number"
                                                         v-model="copy.points">
      </div>
      <textarea id="i-hint" cols="30" rows="10" v-model="copy.hint"></textarea>
      <label for="i-hint">The question itself</label>
      <textarea id="i-answer" cols="30" rows="10" v-model="copy.answer"></textarea>
      <label for="i-answer">The answer to the question</label>
    </div>
    <div class="modal-footer">
      <a href="#" class="btn waves-effect waves-light" @click="$emit('cancel-focus')">Cancel</a>
      <a href="#" class="btn waves-effect waves-green"
                  @click="$emit('save-question')">Save</a>
      <a href="#"
         class="btn waves-effect waves-red"
         :class="{red: clickDelete, 'white-text': clickDelete}"
         @click="onClickDelete">Delete</a>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Prop, PropSync, Component, Vue,
} from 'vue-property-decorator';
import { Question } from '../question';

@Component
export default class EditModal extends Vue {
  @PropSync('question') private copy!: Question;
  @Prop() private category!: string;

  private clickDelete = false;

  private onClickDelete() {
    if (this.clickDelete) {
      this.$emit('delete');
    } else {
      this.clickDelete = true;
      setTimeout(() => {
        this.clickDelete = false;
      }, 1000);
    }
  }
}
</script>
