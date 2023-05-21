<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { ICategory } from '../storage';

import Question from './Question.vue';

defineProps<{
  modelValue: ICategory,
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', newValue: ICategory): void;
  (e: 'click-category-heading'): void;
  (e: 'click-question', questionId: number): void;
}>();
</script>

<template>
  <div>
    <div @click="emit('click-category-heading')">{{ modelValue.name }}</div>

    <Question
        v-for="(q, i) in modelValue.questions"
        v-model="q"
        @click-question="emit('click-question', i)"/>

    <slot></slot>
  </div>
</template>
