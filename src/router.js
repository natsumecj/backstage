import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";

Vue.use(Router);

const router=new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: () =>
          import("./views/Register.vue")
    },
    {
      path: "/home",
      name: "home",
      component: () =>
          import("./views/Home.vue")
    },
    {
      path: "/publishing",
      name: "publishing",
      component: () =>
          import("./views/Publishing.vue")
    },
    {
      path: "/published",
      name: "published",
      component: () =>
          import("./views/Published.vue")
    },
  ]
});
export default router