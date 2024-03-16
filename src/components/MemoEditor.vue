<template>
  <Popup :contentTitle="memoData ? memoData.title : ''">
    <div class="memo-editor">
      <div class="memo-edit-content">
        <h2>Edit Memo</h2>
        <p>{{ memoData ? memoData.content : '' }}</p>
        <button @click="saveMemo">Save</button>
      </div>
    </div>
</Popup>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';
import { Memo } from '@/generated';
//import { memoHandler } from '@/api/handler';
import Popup from './Popup.vue';

//const errorMessage = ref('');

const props = defineProps({
  memoData: {
    type: Object as () => Memo
  }
});
const { memoData } = toRefs(props);


const saveMemo = async () => {
  try {
    //await memoHandler.updateMemo(memoData.value.id, memoContent.value);
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