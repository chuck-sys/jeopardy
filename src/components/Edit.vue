<script setup lang="ts">
import { ref, watch, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { emptySaveData, saveToLocalStorage, loadDefaultSaveNameFromLocalStorage, loadSaveFromBase64, loadSaveFromLocalStorage } from '../storage';

import Config from './Config.vue';

const route = useRoute();

const defaultSaveName = loadDefaultSaveNameFromLocalStorage();
const queryB64 = route.query.data;

let workingData = reactive(emptySaveData());
/** Most recent time we saved to local storage */
let lastSave = ref(new Date());

// Query string blob takes precedent
if (queryB64) {
  const querySaveData = loadSaveFromBase64(queryB64.toString());
  if (querySaveData) {
    workingData = reactive(querySaveData);
  }
} else if (defaultSaveName) {
  const localSaveData = loadSaveFromLocalStorage(defaultSaveName);
  if (localSaveData) {
    workingData = reactive(localSaveData);
  }
}

let mode = ref('config');

watch(workingData, async (newData, _) => {
  if (newData.config.autoSave) {
    lastSave.value = new Date();
    saveToLocalStorage(defaultSaveName, newData);
  }
});
</script>

<template>
  <main>
    <section v-if="mode === 'all'">
      Edit the game
    </section>

    <section v-if="mode === 'question'">
      Edit a question
    </section>

    <Config
        v-if="mode === 'config'"
        v-model="workingData.config" />

    <section v-if="mode === 'load'">
      Load save
    </section>

    <section v-if="mode === 'save'">
      Save to
    </section>
  </main>
</template>

<style scoped></style>
