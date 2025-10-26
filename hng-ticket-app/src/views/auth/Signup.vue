<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/ui/Navbar.vue'
import AuthBackground from "@/assets/AuthBackground.png" 
import { useFormValidation } from '@/composables/useFormValidation'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')

const { errors, validateRequired } = useFormValidation(['name', 'email', 'password'])

function handleSignup() {
  const fields = { name: name.value, email: email.value, password: password.value }

  if (!validateRequired(fields)) return

  const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]')
  const exists = users.find((u) => u.email === email.value)

  if (exists) {
    alert('An account with this email already exists!')
    return
  }

  const newUser = { name: name.value, email: email.value, password: password.value }
  users.push(newUser)
  localStorage.setItem('ticketapp_users', JSON.stringify(users))

  alert('Account created successfully! You can now log in.')
  router.push('/login')
}
</script>

<template>
  <Navbar />
  <div
    class="bg-cover bg-no-repeat bg-center min-h-screen w-full flex items-center justify-center px-4"
    :style="{ backgroundImage: `url(${AuthBackground})` }"
  >
    <div
      class="backdrop-blur-md bg-white/70 shadow-xl rounded-2xl w-full max-w-md p-8 md:p-10 flex flex-col justify-center"
    >
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Join Ticket</h1>
        <p class="text-sm text-gray-400">Create your account to get started</p>
      </div>

      <form @submit.prevent="handleSignup" class="space-y-6">
        <!-- Name Field -->
        <div>
          <label for="name" class="block text-gray-700 font-medium mb-2 text-sm">Full Name</label>
          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="Enter your full name"
            class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
        </div>

        <!-- Email Field -->
        <div>
          <label for="email" class="block text-gray-700 font-medium mb-2 text-sm">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <!-- Password Field -->
        <div>
          <label for="password" class="block text-gray-700 font-medium mb-2 text-sm">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full bg-gray-400 text-white font-semibold rounded-xl py-3 hover:bg-gray-600 transition duration-300 shadow-md"
        >
          Sign Up
        </button>

        <p class="text-sm text-gray-700 mt-6 text-center">
          Already have an account?
          <router-link :to="{ name: 'Login' }" class="text-blue-400 font-semibold hover:underline">
            Log In
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>