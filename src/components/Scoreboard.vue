<template>
  <ul class="sidenav sidenav-fixed blue">
    <li class="center-align white-text">
      <h3>Scoreboard</h3>
    </li>
    <li class="blue lighten-3 team" v-for="teamName in Object.keys(scores)"
                                    :key="teamName">
      <button :id="teamName"
                                    class="waves-effect waves-light btn-floating btn-small"
                                    @click="onRemove(teamName)">
        <i class="material-icons">remove_circle</i>
      </button>
      <span class="name">{{ teamName }}</span>
      <span class="badge">{{ scores[teamName] }}</span>
    </li>

    <add-team @add-team="onAddTeam"></add-team>
  </ul>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import { Scores } from '../Storage';
import AddTeam from './AddTeam.vue';

@Component({
  components: {
    AddTeam,
  },
})
export default class Scoreboard extends Vue {
  @Prop() private readonly scores!: Scores;

  private focused: Set<string> = new Set();

  private onRemove(name: string) {
    const clickedOnce = this.focused.has(name);
    const bt = document.getElementById(name) as HTMLElement;

    if (clickedOnce) {
      this.$emit('remove-team', name);
      this.focused.delete(name);
      bt.classList.remove('red');
    } else {
      this.focused.add(name);
      bt.classList.add('red');

      setTimeout(() => {
        this.focused.delete(name);
        bt.classList.remove('red');
      }, 1000);
    }
  }

  private onAddTeam(team: string) {
    this.$emit('add-team', team);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.team {
  padding-left: 1rem;
}
</style>
