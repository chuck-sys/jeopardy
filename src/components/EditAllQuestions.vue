<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { ICategory } from '../storage';

import Category from './Category.vue';

defineProps<{
  modelValue: ICategory[],
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', newValue: ICategory[]): void;
  (e: 'click-category-heading', categoryId: number): void;
  (e: 'click-question', categoryId: number, questionId: number): void;
}>();
</script>

<template>
  <section>
    <Category
        v-for="(category, i) in modelValue"
        v-model="category"
        @click-category-heading="emit('click-category-heading', i)"
        @click-question="questionId => emit('click-question', i, questionId)"/>
  </section>
</template>
