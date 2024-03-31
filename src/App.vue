<template>
  <header>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/memo-list">Memo List</router-link></li>
        <li><router-link to="/user-list">User List</router-link></li>
      </ul>
    </nav>
    <select v-model="curentUser">
      <option v-for="user in userList" 
        :key="user.id" 
        :value="user">
        {{ user.name }}
      </option>
    </select>
  </header>
  <main>
    <router-view />
  </main>
  <footer></footer>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { User } from '@/generated';
import { usersHandler } from '@/api/handler';

const userList = ref([] as Array<User>);
const curentUser = ref({} as User);
const store = useStore();

onMounted(async () => {
  try {
    await getUserList();
    curentUser.value = userList.value[0];
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

watch(curentUser, () => {
  store.commit('setCurrentUserId', curentUser.value.id);
});
</script>

<style>
header {
  background-color: #f2f2f2;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

li {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 10px;
}

nav ul li {
  display: inline;
}

main {
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 40px;
  padding: 10px;
}

footer {
  background-color: #f2f2f2;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  padding: 10px;
}

select {
  height: fit-content;
  background-color: #3a727e;
  color: #fff;
  font-size: 1.2rem;
}

button {
  padding: 10px 10px;
  margin: 0 10px;
  border: none;
  background-color: #007bff;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
}

</style>
