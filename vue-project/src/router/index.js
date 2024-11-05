import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/homePage.vue';
import betTable from '../pages/betTable.vue';
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/bettable',
        name: 'BetTable',
        component: betTable
    },
];

const router = createRouter({
    history: createWebHistory(), // Chế độ history không có dấu #
    routes
});

export default router;
