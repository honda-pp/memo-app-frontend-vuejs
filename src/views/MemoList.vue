<template>
  <h1>memo list</h1>
  <ul>
    <li v-for="memo in memoList" :key="memo.id">
      <MemoEditor :memoData="memo" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Memo } from '@/generated';
import { memoHandler } from '@/api/handler';
import MemoEditor from '@/components/MemoEditor.vue';

const memoList = ref([] as Array<Memo>);

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
    memoList.value = response.data;
  } catch (error) {
    console.error(error);
  }
  
};
</script>