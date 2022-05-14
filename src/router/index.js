import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import BaseBookingDetails from '../views/BookingDetails.vue'
import CategoryListPage from '../views/CategoryList.vue'


const history = createWebHistory('/or1/');
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/details/:id',
        name: 'BaseBookingDetails',
        component: BaseBookingDetails
    },
    {
        path: '/category',
        name: 'CategoryListPage',
        component: CategoryListPage
    }
   
]

const router = createRouter({history,routes})
export default router