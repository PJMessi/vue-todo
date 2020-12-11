import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index.js"

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login'
  },

  {
    path: '/register',
    name: 'Register'
  },

  {
    path: '/',
    name: 'Dashboard',    
    component: () => import('../views/Dashboard.vue'),
    meta: { auth: true },
  },

  {
    path: '/todos',
    name: 'Todo',    
    component: () => import('../views/Todo.vue'),
    meta: { auth: true },
  },

  {
    path: '/packages',
    name: 'Package',    
    component: () => import('../views/Package.vue'),
    meta: { auth: true },
  },


  {
    path: '/webhooks/esewa/:status',
    name: 'EsewaWebhook',    
    component: () => import('../views/EsewaWebhook.vue'),
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
