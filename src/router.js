import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const router=new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path:'/home',
      redirect:'/'
    },
    {
      path:'*',
      redirect:'/'
    },
    {
      path: "/register",
      name: "register",
      component: () =>
          import("./views/Register.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () =>
          import("./views/Login.vue")
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
    {
      path: "/editor",
      name: "editor",
      component: () =>
          import("./views/Editor.vue")
    },
    {
      path: "/views",
      name: "views",
      component: () =>
          import("./views/Views.vue")
    },
    {
      path: "/exit",
      name: "exit",
      component: () =>
          import("./views/Exit.vue")
    },
    {
      path: "/excel",
      name: "excel",
      component: () =>
          import("./views/Excel.vue")
    },
    {
      path: "/upload",
      name: "upload",
      component: () =>
          import("./views/Upload.vue")
    },
    {
      path: "/tab",
      name: "tab",
      component: () =>
          import("./views/Tab.vue")
    },
    {
      path: "/statistics",
      name: "statistics",
      component: () =>
          import("./views/Statistics.vue")
    },
  ]
});
router.beforeEach((to, from, next) => {
  let user = localStorage.getItem('user')
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    if(user){
      next()
    }else {
      next('/login')
    }
  }
})
export default router