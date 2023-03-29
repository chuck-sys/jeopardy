<template>
    <ul class="sidenav">
      <li class="center-align">
        <h3>Scoreboard</h3>
      </li>
      <li class="team"
          :class="teamClass(teamName)"
          v-for="teamName in Object.keys(scores)"
          :key="teamName">
        <button :id="teamName"
                class="danger btn-floating btn-small"
                @click="onRemove(teamName, $event)"
                title="Remove team">
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

  private focused: Array<string> = [];

  private teamClass(name: string) {
    return {
      danger: this.focused.includes(name),
    };
  }

  private onRemove(name: string, evt: MouseEvent) {
    const clickedOnce = this.focused.includes(name);
    const i = evt.target as HTMLElement;
    const teamNameSpan = i.parentNode?.parentNode?.childNodes[1] as HTMLElement;

    if (clickedOnce) {
      this.$emit('remove-team', name);
      this.focused.splice(this.focused.indexOf(name), 1);
      i.classList.remove('danger-confirm');
    } else {
      this.focused.push(name);
      i.classList.add('danger-confirm');
      teamNameSpan.textContent = 'Confirm delete?';

      setTimeout(() => {
        this.focused.splice(this.focused.indexOf(name), 1);
        teamNameSpan.textContent = name;
        i.classList.remove('danger-confirm');
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
  transition: background 0.3s;
}

.sidenav button {
  margin-right: 1rem;
}

.sidenav h3 {
  text-shadow: 2px 2px 2px grey;
}
</style>
