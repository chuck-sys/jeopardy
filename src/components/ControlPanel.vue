<template>
  <div>
    <input type="file" @change="$emit('upload-file', $event)"
           accept="application/json">
    <div class="right-pane">
      <p>Control panel</p>
      <a class="waves-effect waves-light btn" href="#"
                @click="$emit('download-file')">
        <i class="material-icons">cloud_download</i>
        Download
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';

export default class ControlPanel extends Vue {
}
</script>

<style lang="scss">
div.control-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;

  .right-pane {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
  }
}
</style>
