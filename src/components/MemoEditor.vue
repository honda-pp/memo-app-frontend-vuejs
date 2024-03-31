<template>
  <Popup 
    :contentTitle="contentTitle" 
    :buttonFlg="!memoListInner" 
    :onPopupOpen="onPopupOpen" 
    :errorMessage="errorMessage"
    ref="popup">
    <div class="memo-editor">
      <textarea v-model="memo.title" />
      <textarea v-model="memo.content" rows="5" />
      <button @click="saveMemo">Save</button>
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
const popup = ref<null | { closePopup: () => null }>(null);

const props = defineProps({
  memoListInner: {
    type: Object as () => MemoListInner
  },
  updateList: {
    type: Function,
    default: null
  }
});
const { memoListInner, updateList } = toRefs(props);

const memo = ref({} as Memo);

onMounted(() => {
  if (!memoListInner?.value) {
    setCreateMemo();
  } else {
    memo.value = { ...memoListInner.value, content: '', user_id: 0 };
    contentTitle.value = memo.value.title;
  }
});

const setCreateMemo = () => {
  memo.value = { id: -1, title: 'Create Memo', content: '', user_id: 1 };
  contentTitle.value = memo.value.title;
};

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
      const response = await memoHandler.createMemo(memo.value);
      updateList.value(response.data);
      setCreateMemo();
    } else {
      await memoHandler.updateMemo(memo?.value.id, memo.value);
      contentTitle.value = memo.value.title;
      updateList.value(memo.value);
    }
    popup.value?.closePopup();
  } catch (error) {
    console.error(error);
  }
};

</script>

<style scoped>
textarea {
  height: 100%;
  min-width: 50vw;
  width: 100%;
  font-size: 1.2rem;
}
</style>