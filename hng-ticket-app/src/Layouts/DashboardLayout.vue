<template>
  <div class="flex min-h-screen bg-gray-50 relative">
    <Sidebar />

    <div class="flex-1 ml-20 md:ml-60 transition-all duration-300 p-6 relative">
      <header class="flex justify-between items-center mb-6 relative">
        <RouterLink :to="{ name: 'home' }">
          <h1 class="text-2xl font-bold text-gray-800">Ticket Dashboard</h1>
        </RouterLink>

        <div class="flex items-center gap-4 relative">
          <h1 class="hidden md:block text-gray-700">Welcome User</h1>

          <span class="material-symbols-outlined text-gray-600 cursor-pointer">
            notifications
          </span>
          <div class="relative">
            <img
              src="https://i.pravatar.cc/40"
              alt="User Avatar"
              class="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
              @click="togglePop"
            />

            <transition name="fade">
              <ul
                v-if="showPop"
                class="absolute right-0 mt-2 w-40 bg-white shadow-xl rounded-md py-2 z-50"
              >
                <li
                  v-for="popup in popups"
                  :key="popup"
                  class="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer text-left"
                  @click="handlePopupAction(popup)"
                >
                  <RouterLink :to="{ name: popup.route }">
                    {{ popup.name }}
                  </RouterLink>
                </li>
              </ul>
            </transition>
          </div>
        </div>
      </header>
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'

const popups = [
  { name: 'Home', routes: 'home' },
  { name: 'Login', route: 'Login' },
  { name: 'Get Started', route: 'Signup' },
]
const showPop = ref(false)

// Toggle popup visibility
const togglePop = () => {
  showPop.value = !showPop.value
}

// Handle actions (optional)
const handlePopupAction = (popup) => {
  showPop.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
