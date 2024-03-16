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
