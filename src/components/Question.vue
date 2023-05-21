<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { IQuestion } from '../storage';

defineProps<{
  modelValue: IQuestion,
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', newValue: IQuestion): void;
  (e: 'click-question'): void;
}>();
</script>

<template>
  <div @click="emit('click-question')">{{ modelValue.points }}</div>
</template>
