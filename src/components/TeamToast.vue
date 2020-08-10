<template>
  <div class="row">
    <div class="col s2">{{ rank + 1 }}</div>
    <div class="col s7">{{ team }}</div>
    <div class="col s3">{{ Math.trunc(score) }}</div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';

@Component
export default class TeamToast extends Vue {
  @Prop() private rank!: number;
  @Prop() private team!: string;
  @Prop() private score!: number;
}
</script>
