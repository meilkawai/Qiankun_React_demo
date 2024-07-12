import { createRouter, createWebHashHistory } from 'vue-router'

let routes = [
  {
    path: "/",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/homePage",
    component: () => import("../views/homePage.vue")
  },
  {
    path: "/dashboard",
    component: () => import("../views/dashboard/dashboard.vue"),
    children: [
      {
        path: "/dashboard/category",
        component: () => import("../views/dashboard/category.vue")
      },
      {
        path: "/dashboard/article",
        component: () => import("../views/dashboard/article.vue")
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router
