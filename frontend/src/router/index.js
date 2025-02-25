import { createRouter, createWebHistory } from 'vue-router'
// import { createRouter, createWebHistory } from "@ionic/vue-router"
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory("/pwa"),
  routes: [
    {
      path: "/pwa",
      redirect: "/home",
    },
    {
      path: "/pwa/",
      redirect: "/home",
    },
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "",
      redirect: "/home",
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path:'/contact',
      name:'contact',
      component:()=>import('../views/ContactView.vue')
    },
    {
      path:'/todo-list',
      name:'todo-list',
      component:()=>import('../views/TodoListView.vue')
    },
    {
      path:'/todo-form/:id',
      name:'tododetail',
      component:()=>import('../views/ToDoDetail.vue')
    },
    {
      path:'/todo-create',
      name:'todocreate',
      component:()=>import('../views/ToDoCreate.vue')
    },
    {
      path:'/login',
      name:'login',
      component:()=>import('../views/Login.vue')
    }
  ],
})

export default router
