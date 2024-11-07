import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/homePage.vue';
import betTable from '../pages/betTable.vue';
import Test from '@/pages/test.vue';
import SignIn from '@/pages/signIn.vue'
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
    },
    {
        path: '/signin',
        name: 'Signin',
        component: SignIn
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
