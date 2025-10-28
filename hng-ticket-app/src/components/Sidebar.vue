<template>
  <main>
    <aside
      :class="[
        'fixed top-0 left-0 z-50 h-screen flex flex-col bg-gray-700 text-white transition-all duration-300 ease-in-out',
        collapsed ? 'w-10' : 'w-60',
      ]"
    >
      <!-- Header -->
      <div
        class="flex items-center gap-3 cursor-pointer p-3 rounded-md hover:bg-gray-200 hover:text-black transition-colors duration-200"
        @click="toggleSidebar"
      >
        <span v-if="collapsed" class="material-symbols-outlined text-2xl hover:text-black"> double_arrow </span>
        <span v-else class="material-symbols-outlined"> keyboard_double_arrow_left </span>
        <span v-if="!collapsed" class="font-semibold text-lg">TicketApp</span>
      </div>

      <!-- Navigation -->
      <nav class="flex flex-col gap-1 mt-4 flex-1 overflow-y-auto">
        <RouterLink
          to="/dashboard"
          class="flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 hover:text-black transition"
          exact-active-class="bg-gray-200 text-black font-semibold"
        >
          <span class="material-symbols-outlined text-xl">dashboard</span>
          <span v-if="!collapsed">Dashboard</span>
        </RouterLink>

        <RouterLink
          to="/TicketPage"
          class="flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 hover:text-black transition"
          exact-active-class="bg-gray-200 text-black font-semibold"
        >
          <span class="material-symbols-outlined text-xl">confirmation_number</span>
          <span v-if="!collapsed">Tickets</span>
        </RouterLink>
      </nav>

      <!-- Logout -->
      <button
        class="flex items-center gap-3 p-3 rounded-md hover:bg-red-400 transition text-white font-medium shrink-0"
        @click="showLogoutModal = true"
      >
        <span class="material-symbols-outlined text-xl">logout</span>
        <span v-if="!collapsed">Logout</span>
      </button>

      <!-- Logout Modal -->
      <ToastModal
        v-if="showLogoutModal"
        title="Are you sure you want to logout?"
        @close="showLogoutModal = false"
        @confirm="handleLogout"
      />
    </aside>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import ToastModal from '@/components/Dashboard/ToastModal.vue'

const collapsed = ref(true)
const showLogoutModal = ref(false)
const router = useRouter()

const toggleSidebar = () => {
  collapsed.value = !collapsed.value
}

// 👇 Show modal instead of direct logout
const logout = () => {
  showLogoutModal.value = true
}

// 👇 Runs only when user clicks “Yes”
const handleLogout = () => {
  localStorage.removeItem('ticketapp_session')
  showLogoutModal.value = false
  router.push({ name: 'Login' })
}
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}
</style>