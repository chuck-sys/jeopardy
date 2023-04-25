<script setup lang="ts">
import M from 'materialize-css';
import { ref, watch, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { emptySaveData, saveToLocalStorage, loadDefaultSaveNameFromLocalStorage, loadSaveFromBase64, loadSaveFromLocalStorage } from '../storage';

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

watch(workingData, async (newData, _) => {
  if (newData.config.autoSave) {
    lastSave.value = new Date();
    saveToLocalStorage(defaultSaveName, newData);
  }
})
</script>

<template>
  <main></main>
</template>

<style scoped></style>
