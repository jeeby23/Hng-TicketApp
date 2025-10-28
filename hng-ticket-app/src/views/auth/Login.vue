<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/ui/Navbar.vue'
import { useFormValidation } from '@/composables/useFormValidation'
import AuthBackground from '@/assets/AuthBackground.png'
import { useToast } from 'vue-toast-notification'
import useVisibilityToggle from '@/composables/visibility-toggle' 
import Footer from '@/components/ui/Footer.vue'

const isLoading = ref(false)
const toast = useToast()
const router = useRouter()
const email = ref('')
const password = ref('')
const { errors, validateRequired } = useFormValidation(['email', 'password'])
const { visible: showPassword, toggle: togglePassword } = useVisibilityToggle(false) 
function handleLogin() {
  isLoading.value = true
  const fields = { email: email.value, password: password.value }
  if (!validateRequired(fields))  return

  const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]')
  const user = users.find((u) => u.email === email.value && u.password === password.value)

  if (!user) {
    toast.failed('Invalid email or password. Please try again.')
    return
    
  }
  isLoading.value = false

  localStorage.setItem('ticketapp_session', JSON.stringify(user))
  toast.success(`Welcome back, ${user.name}!`)
  router.push('/dashboard')
  
}
</script>

<template>
  <div>

    <Navbar />
    <div
      class="bg-cover bg-no-repeat bg-center min-h-screen w-full flex items-center justify-center px-4"
      :style="{ backgroundImage: `url(${AuthBackground})` }"
    >
      <div
        class="backdrop-blur-md bg-white/70 shadow-xl rounded-2xl w-full max-w-md p-8 md:p-10 flex flex-col justify-center"
      >
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p class="text-gray-600 text-sm">We're glad to see you again. Log in to your account.</p>
        </div>
  
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="Email" class="block text-gray-700 font-medium mb-2 text-sm">Email</label>
            <input
              id="Email"
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
          </div>
  
         <div class="relative">
            <label for="password" class="block text-gray-700 font-medium mb-2 text-sm"
              >Password</label
            >
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              class="w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <!-- 👁️ Toggle Icon -->
            <button
              type="button"
              @click="togglePassword"
              class="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <font-awesome-icon :icon="['fas', showPassword ? 'eye-slash' : 'eye']" />
            </button>
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
          </div>
  
          <button
            :disabled="isLoading"
            type="submit"
            class="w-full bg-gray-400 text-white font-semibold rounded-xl py-3 hover:bg-gray-600 transition duration-300 shadow-md"
          >
            <span v-if="!isLoading">Log In</span>
            <span v-else>Loading...</span>
          </button>
  
          <p class="text-sm text-gray-700 mt-6 text-center">
            Don't have an account?
            <router-link :to="{ name: 'Signup' }" class="text-blue-500 font-semibold hover:underline">
              Sign Up
            </router-link>
          </p>
        </form>
      </div>
    </div>
    <Footer/>
  </div>
</template>
