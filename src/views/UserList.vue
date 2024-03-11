<template>
  <h1>User List</h1>
  <ul>
    <li v-for="user in userList" :key="user.id">
      {{ user.name }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usersHandler } from '@/api/handler';

const userList = ref([]);

onMounted(async () => {
  try {
    await getUserList();
  } catch (error) {
    console.error(error);
  }
});

const getUserList = async () => {
  try {
    const response = await usersHandler.getUserList();
    userList.value = response.data.userList;  
  } catch (error) {
    console.error(error);
  }
  
};

</script>