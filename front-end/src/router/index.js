import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/LoginCom.vue";
import Register from "../components/RegisterCom.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/",
      name: "Login",
      component: Login,
    },
  ],
});

export default router;
