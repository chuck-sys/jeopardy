<template>
  <li class="add-team row">
    <a class="btn" href="#" v-if="!addTeamPressed"
                            @click="onPressAddTeam">
      Add team
    </a>
    <div v-else class="input-field">
      <input class="validate"
             id="teamName"
             type="text"
             @keyup.13="onAddTeam"
             v-model="teamName">
      <label for="teamName">New team name</label>
    </div>
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
    if (this.teamName === '') {
      return;
    }

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

  div.input-field label,
  div.input-field input:focus+label {
    color: theme.$text;
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
