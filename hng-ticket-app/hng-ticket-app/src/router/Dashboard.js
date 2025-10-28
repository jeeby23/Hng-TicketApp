import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/Layouts/DashboardLayout.vue'
import Dashboard from '@/views/Dashboard.vue'
import TicketPage from '@/views/Ticket.vue'

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
        path: '/TicketPage',
        name: 'TicketPage',
        component: TicketPage,
       
      },
    ],
  },
]
