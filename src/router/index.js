import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index.js"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Todo',    
    component: () => import('../views/Todo.vue'),
    meta: { auth: true },
  },

  {
    path: '/login',
    name: 'Login'
  },

  {
    path: '/webhooks/esewa/:status',
    name: 'EsewaWebhook',    
    component: () => import('../views/esewaWebhook.vue'),
    meta: { auth: true },
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLoggedIn) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else if (to.name == 'Login' && store.getters.isLoggedIn) {
    next({
      path: '/',
      query: { redirect: to.fullPath }
    })
  }
  else {
    next()
  }  
})

export default router
