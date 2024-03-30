<template>
  <div @click="openPopup" class="popup-title" :class="{'button': buttonFlg}">{{ contentTitle }}</div>
  <div v-if="isPopupOpen" class="popup-overlay" @click="closePopup">
    <div class="popup-content" @click.stop>
      <button @click="closePopup" class="close-button">&times;</button>
      <slot></slot>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, toRefs, onMounted, onUnmounted, defineExpose } from 'vue';

const isPopupOpen = ref(false);
const props = defineProps({
  contentTitle: String,
  buttonFlg: Boolean,
  errorMessage: String,
  onPopupOpen: Function,
  onPopupClose: Function
});
const { contentTitle, buttonFlg, errorMessage, onPopupOpen, onPopupClose } = toRefs(props);

function openPopup() {
  isPopupOpen.value = true;
  onPopupOpen?.value && onPopupOpen.value();
}

function closePopup() {
  isPopupOpen.value = false;
  onPopupClose?.value && onPopupClose.value();
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

function handleKeydown(event: { key: string; }) {
  if (event.key === 'Escape') {
    closePopup();
  }
}

defineExpose({
  openPopup,
  closePopup
});
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}

.popup-title {
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 5px;
}

.button {
  background-color: #007bff;
  color: white;
  width: fit-content;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: black;
  background-color: transparent;
  padding: 0;
  margin: 0;
  height: 20px;
  width: 20px;
  border: none;
}

.close-button:hover {
  background-color: #656565;
}
</style>