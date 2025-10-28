<template>
  <div class="flex min-h-screen bg-gray-50 relative">
    <Sidebar />

    <div class="flex-1 ml-20 md:ml-60 transition-all duration-300 p-6 relative">
   <Navbar Class="shadow-none"/>
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/ui/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'


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
