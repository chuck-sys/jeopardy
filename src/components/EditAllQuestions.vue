<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import type { ICategory, IQuestion } from '../storage';

import Category from './Category.vue';
import EditCategory from './EditCategory.vue';
import EditQuestion from './EditQuestion.vue';

const props = defineProps<{
  modelValue: ICategory[],
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', newValue: ICategory[]): void;
  (e: 'create:question', categoryId: number): void;
  (e: 'create:category'): void;
}>();

let mode = ref('all');

let selectedCategoryId : number | null = null;
function onClickCategoryHeading(categoryId: number) {
  selectedCategoryId = categoryId;
  mode.value = 'category';
}

let selectedQuestionId: number | null = null;
function onClickQuestion(categoryId: number, questionId: number) {
  selectedCategoryId = categoryId;
  selectedQuestionId = questionId;
  mode.value = 'question';
}

function onClickAddQuestion(categoryId: number) {
  props.modelValue[categoryId].questions.push({
    content: '',
    answer: '',
    points: 100,
  });
}

function onClickAddCategory() {
  props.modelValue.push({
    name: 'Unnamed',
    questions: [],
  });
}
</script>

<template>
  <section>
    <Category
        v-for="(category, i) in modelValue"
        v-model="category"
        @click-category-heading="onClickCategoryHeading(i)"
        @click-question="questionId => onClickQuestion(i, questionId)">

        <div @click="onClickAddQuestion(i)">
          Add question
        </div>
    </Category>

    <button
        @click="onClickAddCategory">Add category</button>

    <div v-if="mode === 'question'">
      Edit question
    </div>

    <EditCategory
        v-if="mode === 'category'"
        v-model="modelValue[selectedCategoryId || 0]"/>

    <EditQuestion
        v-if="mode === 'question'"
        v-model="modelValue[selectedCategoryId || 0].questions[selectedQuestionId || 0]" />
  </section>
</template>
