import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/Layouts/DashboardLayout.vue'
import Dashboard from '@/views/Dashboard.vue'
import Tickets from '@/components/TicketsCard.vue'

export const dashboardroutes = [
  {
    path: '/Dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: '/tickets',
        name: 'Tickets',
        component: Tickets,
        meta: { requiresAuth: true },
      },
    ],
  },
]
