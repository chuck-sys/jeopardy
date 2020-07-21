<template>
  <div class="scoring-toast" v-if="show">
    <team-toast v-if="teamAbove !== -1"
                class="team-toast"
                ref="aboveElem"
                :rank="teamAbove"
                :team="teamAboveName"
                :score="teamAbovePoints"></team-toast>
    <team-toast ref="focusedElem"
                class="team-toast"
                :rank="focusedTeam"
                :team="focusedTeamName"
                :score="focusedPoints"></team-toast>
    <team-toast v-if="teamBelow !== -1"
                class="team-toast"
                :rank="teamBelow"
                :team="teamBelowName"
                :score="teamBelowPoints"></team-toast>
  </div>
</template>

<script lang="ts">
import {
  Ref, Prop, Component, Vue,
} from 'vue-property-decorator';

import { Scores } from '../Storage';
import TeamToast from './TeamToast.vue';

@Component({
  components: {
    TeamToast,
  },
})
export default class ScoringToast extends Vue {
  @Ref() private aboveElem!: TeamToast;
  @Ref() private focusedElem!: TeamToast;
  @Prop() private readonly scores!: Scores;

  // Duration of the entire animation (incrementing score and swapping places
  // if need arises).
  private readonly duration = 4000;
  private readonly deltaStaticBefore = this.duration * 0.125;
  private readonly deltaIncrement = this.duration * 0.625;
  private readonly deltaSwap = this.duration * 0.875;
  private readonly deltaStaticAfter = this.duration * 1;
  private readonly frames = 100;
  private readonly interval = this.duration / this.frames;

  private focusedTeam = -1;
  private newFocusedRank = -1;
  private focusedTeamName = '';
  private focusedTeamOriginalPoints = -1;
  private focusedPoints = -1;
  private pointsAdded = -1;
  private teamAbove = -1;
  private teamAboveName = '';
  private teamAbovePoints = -1;
  private teamBelow = -1;
  private teamBelowName = '';
  private teamBelowPoints = -1;
  private timeCount = this.duration;
  private show = false;
  private rankingWentUp = false;

  public init(teamName: string, oldPoints: number, points: number) {
    this.teamAbove = -1;
    this.teamBelow = -1;
    this.focusedTeamName = teamName;
    this.focusedTeamOriginalPoints = oldPoints;
    this.focusedPoints = oldPoints;
    this.pointsAdded = points;

    // Descending order requires reverse sort
    const ranks = Object.keys(this.scores).sort(
      (a, b) => this.scores[b] - this.scores[a],
    );
    const newScores = { ...this.scores };
    newScores[teamName] = oldPoints + points;
    // Do 2 sorts to figure out if we went up rankings
    const newRanks = Object.keys(newScores).sort(
      (a, b) => newScores[b] - newScores[a],
    );

    this.focusedTeam = ranks.indexOf(teamName);
    this.newFocusedRank = newRanks.indexOf(teamName);
    this.rankingWentUp = this.newFocusedRank < this.focusedTeam;

    if (this.focusedTeam >= 1) {
      this.teamAbove = this.focusedTeam - 1;
      this.teamAboveName = ranks[this.teamAbove];
      this.teamAbovePoints = this.scores[this.teamAboveName];
    }
    if (this.focusedTeam < ranks.length - 1) {
      this.teamBelow = this.focusedTeam + 1;
      this.teamBelowName = ranks[this.teamBelow];
      this.teamBelowPoints = this.scores[this.teamBelowName];
    }

    this.timeCount = 0;
  }

  private animate() {
    setTimeout(() => {
      if (this.timeCount < this.deltaIncrement) {
        // In the state of incrementing, do linear increments
        const inc = this.pointsAdded / (this.deltaIncrement / this.interval);
        this.focusedPoints += inc;
        if (this.focusedPoints > this.focusedTeamOriginalPoints + this.pointsAdded) {
          this.focusedPoints = this.focusedTeamOriginalPoints + this.pointsAdded;
        }
      } else if (this.timeCount < this.deltaSwap) {
        // In the state of swapping, if needed
        if (this.focusedPoints < this.focusedTeamOriginalPoints
          + this.pointsAdded) {
          this.focusedPoints = this.focusedTeamOriginalPoints
            + this.pointsAdded;
        }
        if (this.rankingWentUp
          && !this.focusedElem.$el.classList.contains('bubble-up')) {
          this.focusedElem.$el.classList.add('bubble-up');
          this.aboveElem.$el.classList.add('bubble-down');
          this.focusedTeam = this.newFocusedRank;
          this.teamAbove += 1;
        }
      } else if (this.timeCount < this.deltaStaticAfter) {
        // In the state of not moving, awaiting a swift death
      }
      this.timeCount += this.interval;

      if (this.timeCount < this.duration) {
        this.animate();
      } else {
        this.show = false;
        this.focusedTeam = -1;
      }
    }, this.interval);
  }

  public display() {
    this.show = true;

    setTimeout(() => {
      this.timeCount += this.deltaStaticBefore;
      this.animate();
    }, this.deltaStaticBefore);
  }
}
</script>

<style lang="scss" scoped>
@use 'src/assets/theme.scss';

.scoring-toast {
  position: fixed;
  right: 1rem;
  top: 1rem;
  width: 20rem;

  .team-toast {
    position: absolute;
    width: 100%;
    transition: top 0.3s;
    background: rgba(theme.$disabled, 90%);

    &:nth-child(1) {
      top: 1.5rem;
    }

    &:nth-child(2) {
      top: 4.5rem;
    }

    &:nth-child(3) {
      top: 7.5rem;
    }
  }
}

.scoring-toast .team-toast.bubble-up {
  top: 1.5rem;
}

.scoring-toast .team-toast.bubble-down {
  top: 4.5rem;
}
</style>
