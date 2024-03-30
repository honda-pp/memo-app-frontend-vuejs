<template>
  <Popup :contentTitle="contentTitle" :createPopupFlg="createPopupFlg" :onPopupOpen="onPopupOpen" :errorMessage="errorMessage">
    <div class="memo-editor">
      <div class="memo-edit-content">
        <textarea v-model="memo.title" />
        <textarea v-model="memo.content" rows="5" />
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
const contentTitle = ref('');
const createPopupFlg = ref(false);

const props = defineProps({
  memoListInner: {
    type: Object as () => MemoListInner
  }
});
const { memoListInner } = toRefs(props);

const memo = ref({} as Memo);

onMounted(() => {
  if (!memoListInner?.value) {
    createPopupFlg.value = true;
    contentTitle.value = "Create Memo";
    memo.value = { id: -1, title: 'New Memo', content: '', user_id: 1 };
    return;
  }
  memo.value = { ...memoListInner.value, content: '', user_id: 0 };
  contentTitle.value = memo.value.title;
});

const onPopupOpen = async () => {
  try {
    if (memo.value.id === -1) {
      return;
    }
    const response = await memoHandler.getMemoById(memo.value.id);
    memo.value = response.data;
  } catch (error) {
    errorMessage.value = error as string;
  }
};

const saveMemo = async () => {
  try {
    if (memo.value.id === -1) {
      await memoHandler.createMemo(memo.value);
      return;
    }
    await memoHandler.updateMemo(memo?.value.id, memo.value);
  } catch (error) {
    console.error(error);
  }
};

</script>

<style scoped>
.memo-editor {
  /* Add your styles for the popup here */
}

.memo-edit-content {
  /* Add your styles for the popup content here */
}

textarea {
  height: 100%;
  min-width: 50vw;
  width: 100%;
  font-size: 1.2rem;
}
</style>