import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import BookingDetails from '../views/BookingDetails.vue'
import CategoryList from '../views/CategoryList.vue'
import AboutUs from '../views/AboutUs.vue'
import UserList from '../views/UserList.vue'
import UserDetails from '../views/UserDetails.vue'

const history = createWebHistory('/or1/');
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/details/:id',
        name: 'BookingDetails',
        component: BookingDetails
    },
    {
        path: '/category-list',
        name: 'CategoryList',
        component: CategoryList
    },
    {
        path: '/users/:id',
        name: 'UserDetails',
        component: UserDetails
    },
    {
        path: '/about',
        name: 'AboutUs',
        component: AboutUs
    },
    {
        path: '/users',
        name: 'UserList',
        component: UserList
    },
]

const router = createRouter({history,routes})
export default router