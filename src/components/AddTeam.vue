<template>
  <li class="add-team row">
    <a class="waves-effect waves-light btn" href="#" v-if="!addTeamPressed"
                                                     @click="addTeamPressed = true">
      Add team<i class="material-icons">add</i>
    </a>
    <span v-if="addTeamPressed">
      <input class="white-text col s10" type="text" placeholder="Team name"
                                                    v-model="teamName">
      <a class="col s2 waves-effect waves-light btn" href="#"
                                                     @click="onAddTeam">
        <i class="material-icons">add</i>
      </a>
    </span>
  </li>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AddTeam extends Vue {
  private addTeamPressed = false;
  private teamName = '';

  private onAddTeam() {
    this.$emit('add-team', this.teamName);
    this.addTeamPressed = false;
    this.teamName = '';
  }
}
</script>

<style lang="scss">
li.add-team {
  margin: 1rem;
}
</style>
