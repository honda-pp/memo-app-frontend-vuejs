<template>
  <h1>memo list</h1>
  <MemoEditor :updateList="updateMemoList"/>
  <ul>
    <li v-for="memo in memoList" :key="memo.id">
      <MemoEditor :memoListInner="memo" :updateList="updateMemoList"/>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex'
import { MemoListInner } from '@/generated';
import { memoHandler } from '@/api/handler';
import MemoEditor from '@/components/MemoEditor.vue';

const memoList = ref([] as Array<MemoListInner>);
const store = useStore();

onMounted(async () => {
  try {
    await getMemoList();
  } catch (error) {
    console.error(error);
  }
});

watch(() => store.state.currentUserId, (newUserId, oldUserId) => {
  console.log(`currentUserId changed from ${oldUserId} to ${newUserId}`);
  
});

const getMemoList = async () => {
  try {
    const response = await memoHandler.getMemoList();
    memoList.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const updateMemoList = (memo: MemoListInner) => {
  const index = memoList.value.findIndex((m) => m.id === memo.id);
  if (index === -1) {
    memoList.value.unshift(memo);
  } else {
    memoList.value[index] = memo;
  }
}

</script>