import Signup from '@/views/auth/Signup.vue'
import Login from '@/views/auth/Login.vue'
const isAuthenticated = () => {
  return !!localStorage.getItem('ticketapp_session')
}

export const authRoutes = [
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]
export const authGuard = (to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login')
  } else {
    next()
  }
}
