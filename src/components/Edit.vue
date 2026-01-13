<script setup lang="ts">
import { ref, watch, reactive } from 'vue';

import Config from './Config.vue';
import EditAllQuestions from './EditAllQuestions.vue';

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
