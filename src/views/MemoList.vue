<template>
  <h1>memo list</h1>
  <ul>
    <li v-for="memo in memoList" :key="memo.id">
      {{ memo.title }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { memoHandler } from '@/api/handler';

const memoList = ref([]);

onMounted(async () => {
  try {
    await getMemoList();
  } catch (error) {
    console.error(error);
  }
});

const getMemoList = async () => {
  try {
    const response = await memoHandler.getMemoList();
    memoList.value = response.data.memoList;  
  } catch (error) {
    console.error(error);
  }
  
};
</script>