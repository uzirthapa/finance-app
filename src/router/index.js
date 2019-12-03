import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { auth } from "@/plugins/firebase";
Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'hash',
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged(function (user) {
    // console.log(user);
    let currentUser = null
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (user) {
      currentUser = auth.currentUser
    }

    if (requiresAuth && !currentUser) {

      next('/auth')
      // } 
    } else if (requiresAuth && currentUser) {
      next()
    } else {
      next()
    }

  })
})

export default router
