<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { ICategory } from '../storage';

defineProps<{
  modelValue: ICategory,
}>();

defineEmits<{
  (e: 'update:modelValue', newValue: ICategory): void;
}>();
</script>

<template>
  <input type="text" v-model="modelValue.name"/>
</template>
