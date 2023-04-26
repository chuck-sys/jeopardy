<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { IConfig } from '../storage';

defineProps<{
  modelValue: IConfig,
}>();

defineEmits<{
  (e: 'update:modelValue', newValue: IConfig): void
}>();
</script>

<template>
  <section>
    Edit Config

    <label for="autoSave">Auto-save?</label>
    <input type="checkbox" name="autoSave" v-model="modelValue.autoSave">
  </section>
</template>
