import Landing from '@/views/pages/Landing.vue'
import About from '@/views/pages/About.vue'

export const defRoutes = [
  {
    path: '/',
    name: 'home',
    component: Landing,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
  },
]
