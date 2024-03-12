<template>
  <h1>User List</h1>
  <ul>
    <li v-for="user in userList" :key="user.id">
      <UserInfo :userData="user" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { User } from '@/generated';
import { usersHandler } from '@/api/handler';
import UserInfo from '@/components/UserInfo.vue';

const userList = ref([] as Array<User>);

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
    userList.value = response.data as Array<User>;
  } catch (error) {
    console.error(error);
  }
};

</script>