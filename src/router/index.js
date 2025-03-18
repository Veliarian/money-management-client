import {createRouter, createWebHistory} from "vue-router";
import LoginView from "../views/LoginView.vue"
import DashboardView from "../views/DashboardView.vue";
import SignUpView from "../views/SignUpView.vue";

const routes = [
    {path: "/", component: DashboardView, meta: {requiresAuth: true}},
    {path: "/login", component: LoginView, meta: {requiresAuth: false}},
    {path: "/sign-up", component: SignUpView, meta: {requiresAuth: false}}
];

const router = createRouter({
   history: createWebHistory(),
   routes
});

router.beforeEach((to, from, next) => {
   const isAuthenticated = !!localStorage.getItem("token");

   if(to.meta.requiresAuth && !isAuthenticated){
       next("/login");
   }else {
       next();
   }
});

export default router;