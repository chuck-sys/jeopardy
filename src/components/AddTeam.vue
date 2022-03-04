<template>
  <li class="add-team row">
    <a class="btn" href="#" v-if="!addTeamPressed"
                            @click="onPressAddTeam">
      Add team
    </a>
    <span v-if="addTeamPressed">
      <input class="col s10"
             id="teamName"
             type="text"
             placeholder="Team name"
             @keyup.13="onAddTeam"
             v-model="teamName">
      <a class="col s2 btn" href="#" @click="onAddTeam">
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

  private onPressAddTeam() {
    this.addTeamPressed = true;

    setTimeout(() => {
      const f = document.getElementById('teamName');
      if (f) {
        f.focus();
      }
    }, 100);
  }

  private onAddTeam() {
    this.$emit('add-team', this.teamName);
    this.teamName = '';
  }
}
</script>

<style scoped lang="scss">
@use 'src/assets/theme.scss';

li.add-team {
  margin: 1rem;

  a.btn {
    background: lighten(theme.$sidenav, 3%) !important;
    color: theme.$text;
    border: 2px solid theme.$text;
    border-radius: 0.2rem;

    i {
      color: theme.$text;
    }
  }

  a.btn:hover, a.btn:focus {
    background: lighten(theme.$sidenav, 5%) !important;
    color: theme.$text;
  }

  input, input:focus {
    color: theme.$text;
    border-color: theme.$text !important;
  }
}
</style>
