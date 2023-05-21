<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { ICategory } from '../storage';

defineProps<{
  modelValue: ICategory[],
}>();

defineEmits<{
  (e: 'update:modelValue', newValue: ICategory[]): void
}>();
</script>

<template>
  <section>
    <div v-for="category in modelValue">
      <div>{{ category.name }}</div>
    </div>
  </section>
</template>
