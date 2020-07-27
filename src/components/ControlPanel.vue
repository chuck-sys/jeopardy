<template>
  <div class="control-panel">
    <div>
      <h5>Upload file</h5>
      <input type="file" @change="$emit('upload-file', $event)"
             accept="application/json">
    </div>
    <div class="right-pane">
      <a class="waves-effect waves-light btn affirm" href="#"
                                                     @click="$emit('download-file')">
        Download
      </a>
      <a class="waves-effect waves-light btn affirm" href="index.html">
        Play!
      </a>
      <a class="waves-effect waves-light btn danger" href="#"
        @click="deleteAll" :class="{'danger-confirm': clickDelete}">
        Delete all
      </a>
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

    a {
      margin: 0.2rem;
      width: 8rem;
    }

    a.danger {
      margin-top: 6rem;
    }
  }
}
</style>
