<script setup>
import { ref } from 'vue'
import hamburger from '@/assets/hamburger.svg'
import close from '@/assets/close.svg'
const isOpen = ref(false)

defineProps({
  Class: {
    type: String,
    default: 'bg-white shadow-md z-50',
  },
})
</script>

<template>
  <div class="flex flex-col">
    <nav :class="Class" class="relative">
      <div class="max-w-[1440px] mx-auto px-6 py-4 flex justify-between items-center">
        <router-link :to="{ name: 'home' }">
          <h1 class="text-2xl font-bold text-primary">TicketApp</h1>
        </router-link>

        <button @click="isOpen = !isOpen" class="text-gray-700 md:hidden focus:outline-none">
          <img :src="hamburger" alt="hamburger svg" v-if="!isOpen" class="w-6 h-6" />
          <img :src="close" alt="close svg" class="h-6 w-6" v-else />
        </button>

        <!-- Links (Desktop) -->
        <div class="hidden md:flex space-x-4">
          <router-link
            :to="{ name: 'home' }"
            class="px-4 py-2 text-gray-700 hover:text-primary transition"
          >
            Home
          </router-link>
          <router-link
            :to="{ name: 'Login' }"
            class="px-4 py-2 text-gray-700 hover:text-primary transition"
          >
            Login
          </router-link>
    
          <router-link
            :to="{ name: 'Signup' }"
            class="bg-primary px-4 py-2 rounded-lg hover:bg-secondary transition"
          >
            Get Started
          </router-link>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        v-show="isOpen"
        class="absolute top-full left-0 w-full md:hidden px-6 pb-4 flex flex-col space-y-2 bg-white shadow-lg z-40"
      >
        <router-link
          :to="{ name: 'home' }"
          class="text-gray-700 hover:text-primary transition"
          @click="isOpen = false"
        >
          Home
        </router-link>
        <router-link
          :to="{ name: 'Login' }"
          class="text-gray-700 hover:text-primary transition"
          @click="isOpen = false"
        >
          Login
        </router-link>
        <router-link
          :to="{ name: 'Signup' }"
          class="py-2 rounded-lg hover:bg-secondary transition"
          @click="isOpen = false"
        >
          Get Started
        </router-link>
      </div>
    </nav>
  </div>
</template>
