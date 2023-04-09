<script setup lang="ts">
import M from 'materialize-css'
import { useRoute } from 'vue-router'
import { loadSaveFromBase64, loadSaveFromLocalStorage } from '../storage'

const route = useRoute()

const queryB64 = route.query.data;

</script>

<template>
  <main></main>
</template>

<style scoped></style>
