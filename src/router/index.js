import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import EventList from "../views/EventList.vue";
import EventDetail from "../views/EventDetail.vue";
import CategoryList from "../views/CategoryList.vue";
import AboutUs from "../views/AboutUs.vue";
import UserList from "../views/UserList.vue";
import UserDetails from "../views/UserDetails.vue";
import { userManager } from "../scripts/userManager.js";

async function usersPageGuard(to, from, next) {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  if (token && role === "admin") {
    let response = await userManager.getUsers();
    if (response) next();
    return;
  }
  userManager.userInfo.role = "guest";
  next("/");
}

async function guardLecturer(to, from, next) {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  if (token && role !== "lecturer") {
    userManager.getUsers();
    next();
  }
  next("/");
}

const history = createWebHistory("/or1/");
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/events",
    name: "EventList",
    component: EventList,
  },

  {
    path: "/events/:id",
    name: "EventDetail",
    component: EventDetail,
  },
  {
    path: "/category-list",
    name: "CategoryList",
    component: CategoryList,
  },
  {
    path: "/users/:id",
    name: "UserDetails",
    component: UserDetails,
  },
  {
    path: "/about",
    name: "AboutUs",
    component: AboutUs,
  },
  {
    path: "/users",
    name: "UserList",
    beforeEnter: usersPageGuard,
    component: UserList,
  },
];

const router = createRouter({ history, routes });
export default router;
