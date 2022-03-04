<template>
  <div class="control-panel">
    <div>
      <h5>Upload file</h5>
      <input type="file" @change="$emit('upload-file', $event)"
             accept="application/json">
    </div>
    <div class="right-pane">
      <div class="affirmative-actions">
        <button class="btn affirm" href="#"
                              title="Download a copy as a backup"
                              @click="$emit('download-file')">
          Download
        </button>
        <a class="btn affirm" href="index.html">
          Play
        </a>
      </div>
      <div class="dangerous-actions">
        <button class="btn danger" href="#" title="Resets question answered status"
          @click="$emit('reset-questions')">
          Reset questions
        </button>
        <button class="btn danger" href="#" title="Resets team scores to zero"
          @click="$emit('reset-scores')">
          Reset scores
        </button>
        <button class="btn danger" href="#"
                              title="Deletes all questions"
                              @click="deleteAll" :class="{'danger-confirm': clickDelete}">
          Delete questions
        </button>
      </div>
    </div>
  </div>
</template>

<script scoped lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ControlPanel extends Vue {
  private clickDelete = false;

  private deleteAll() {
    if (this.clickDelete) {
      this.$emit('delete-all');
    } else {
      this.clickDelete = true;
      setTimeout(() => {
        this.clickDelete = false;
      }, 1000);
    }
  }
}
</script>

<style scoped lang="scss">
@use 'src/assets/theme.scss';

div.control-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;

  .right-pane {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;

    a, button {
      margin: 0.2rem auto;
      width: 100%;
    }

    div.dangerous-actions {
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      margin-top: 6rem;
    }
  }
}
</style>
