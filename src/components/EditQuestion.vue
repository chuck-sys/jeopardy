<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { IQuestion } from '../storage';

defineProps<{
  modelValue: IQuestion,
}>();

defineEmits<{
  (e: 'update:modelValue', newValue: IQuestion): void;
}>();
</script>

<template>
  <textarea v-model="modelValue.content"></textarea>
  <textarea v-model="modelValue.answer"></textarea>
  <input type="number" v-model="modelValue.points" />
</template>

