<template>
  <header>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/memo-list">Memo List</router-link></li>
        <li><router-link to="/user-list">User List</router-link></li>
      </ul>
    </nav>
  </header>
  <main>
    <router-view />
  </main>
  <footer></footer>
</template>

<script setup lang="ts">
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

</style>
