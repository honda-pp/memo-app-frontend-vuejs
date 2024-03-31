<template>
  <Popup 
    :contentTitle="user?.name" 
    :errorMessage="errorMessage">
    <div class="user-info">
      <h2>User Info</h2>
      <p>Name: {{ user?.name }}</p>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { ref, defineProps, toRefs } from 'vue';
import { User } from '@/generated';
import Popup from './Popup.vue';

const errorMessage = ref('');

const props = defineProps({
  userData: {
    type: Object as () => User
  }
});
const { userData } = toRefs(props);

const user = userData?.value;

</script>