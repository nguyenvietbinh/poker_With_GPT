import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/homePage.vue';
import betTable from '../pages/betTable.vue';
import Test from '@/pages/test.vue';
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
    {
        path: '/test',
        name: 'Test',
        component: Test
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
