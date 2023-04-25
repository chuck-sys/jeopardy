<script setup lang="ts">
import M from 'materialize-css';
import { watch } from 'vue';
import Scoreboard from './Scoreboard.vue';
import QuestionsPanel from './QuestionsPanel.vue';
</script>

<template>
  <main>
    <scoreboard />

    <questions-panel />

    <div class="fixed-action-btn">
      <router-link to="/edit" class="btn-floating btn-large danger">
        <i class="material-symbols-outlined">edit</i>
      </router-link>
    </div>
  </main>
</template>

<style scoped></style>
