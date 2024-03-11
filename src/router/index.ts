import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import MemoList from '@/views/MemoList.vue';
import UserList from '@/views/UserList.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/memo-list',
    component: MemoList,
  },
  {
    path: '/user-list',
    component: UserList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;