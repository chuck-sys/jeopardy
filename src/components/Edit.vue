<script setup lang="ts">
import { ref, watch, reactive } from 'vue';
import { useRoute } from 'vue-router';

import Config from './Config.vue';
import EditAllQuestions from './EditAllQuestions.vue';

const route = useRoute();

const queryB64 = route.query.data;

/** Most recent time we saved to local storage */
let lastSave = ref(new Date());

// Query string blob takes precedent
if (queryB64) {
}
</script>

<template>
  <main>
    <EditAllQuestions />

    <Config />

    <section>
      Load save
    </section>

    <section>
      Save to
    </section>
  </main>
</template>

<style scoped></style>
