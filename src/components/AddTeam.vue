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
import { Prop, Component, Vue } from 'vue-property-decorator';
import { Question, QuestionWithStatus, mapAddStatus } from '../question';

@Component
export default class AddTeam extends Vue {
  @Prop() private scores!: object;

  private addTeamPressed = false;
  private teamName = '';

  private onAddTeam() {
    if (Object.prototype.hasOwnProperty.call(this.scores, this.teamName)) {
      return;
    }

    this.$set(this.scores, this.teamName, 0);
    this.addTeamPressed = false;
    this.teamName = '';
    this.$forceUpdate();
  }
}
</script>

<style lang="scss">
li.add-team {
  margin: 1rem;
}
</style>
