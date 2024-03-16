<template>
  <Popup :contentTitle="memo?.title" :onPopupOpen="onPopupOpen" :errorMessage="errorMessage">
    <div class="memo-editor">
      <div class="memo-edit-content">
        <h2>Edit Memo</h2>
        <p>{{ memo?.content }}</p>
        <button @click="saveMemo">Save</button>
      </div>
    </div>
</Popup>
</template>

<script setup lang="ts">
import { ref, defineProps, toRefs, onMounted } from 'vue';
import { Memo, MemoListInner } from '@/generated';
import { memoHandler } from '@/api/handler';
import Popup from './Popup.vue';

const errorMessage = ref('');

const props = defineProps({
  memoListInner: {
    type: Object as () => MemoListInner
  }
});
const { memoListInner } = toRefs(props);

const memo = ref({} as Memo);

onMounted(() => {
  memo.value = memoListInner?.value ? { ...memoListInner.value, content: '', user_id: 0 } : {} as Memo;
});

const onPopupOpen = async () => {
  try {
    const response = await memoHandler.getMemoById(memo?.value?.id ?? 0);
    memo.value = response.data;
  } catch (error) {
    errorMessage.value = error as string;
  }
};

const saveMemo = async () => {
  try {
    //await memoHandler.updateMemo(memo.value.id, memoContent.value);
    close();
  } catch (error) {
    console.error(error);
  }
};

const close = () => {
  // Close the memo editor
};


</script>

<style scoped>
.memo-editor {
  /* Add your styles for the popup here */
}

.memo-edit-content {
  /* Add your styles for the popup content here */
}
</style>