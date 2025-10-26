<template>
  <aside
    :class="[
      'fixed top-0 left-0 z-50 h-screen flex flex-col bg-gray-700 text-white transition-all duration-300 ease-in-out overflow-y-auto',
      collapsed ? 'w-20' : 'w-60'
    ]"
  >
    <!-- Header -->
    <div
      class="flex items-center gap-3 cursor-pointer p-3 rounded-md  hover:bg-gray-200 hover:text-black transition-colors duration-200"
      @click="toggleSidebar"
    >
      <span class="material-symbols-outlined text-2xl hover:text-black">confirmation_number</span>
      <span v-if="!collapsed" class="font-semibold text-lg">TicketApp</span>
    </div>

    <!-- Navigation -->
    <nav class="flex flex-col gap-1 mt-4">
      <RouterLink
        to="/dashboard"
        class="flex items-center gap-3 p-3 rounded-md  hover:bg-gray-200 hover:text-black transition"
        exact-active-class="bg-gray-200  text-black font-semibold"
      >
        <span class="material-symbols-outlined text-xl">dashboard</span>
        <span v-if="!collapsed">Dashboard</span>
      </RouterLink>

    </nav>

    <!-- Logout -->
    <button
      class="mt-auto flex items-center gap-3 p-3 rounded-md  hover:bg-red-400 transition text-white font-medium"
      @click="logout"
    >
      <span class="material-symbols-outlined text-xl">logout</span>
      <span v-if="!collapsed">Logout</span>
    </button>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const collapsed = ref(true)
const router = useRouter()

const toggleSidebar = () => {
  collapsed.value = !collapsed.value
}

const logout = () => {
  localStorage.removeItem('ticketapp_session')
  router.push({ name: 'Login' })
}
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings:
    "FILL" 0,
    "wght" 400,
    "GRAD" 0,
    "opsz" 24;
}
</style>