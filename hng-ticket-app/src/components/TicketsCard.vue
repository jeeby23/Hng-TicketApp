<template>
  <div class="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Create New Ticket</h1>
        <p class="text-gray-600">Fill in the details below to create a new support ticket</p>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              v-model="form.title"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter ticket title"
            />
            <p v-if="errors.title" class="text-red-500 text-sm mt-2">{{ errors.title }}</p>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              v-model="form.description"
              rows="4"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Describe your issue..."
            ></textarea>
          </div>

          <!-- Status -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status *</label>
            <select
              v-model="form.status"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select Status</option>
              <option value="open" class="text-green-600">Open</option>
              <option value="in_progress" class="text-amber-600">In Progress</option>
              <option value="closed" class="text-gray-600">Closed</option>
            </select>
            <p v-if="errors.status" class="text-red-500 text-sm mt-2">{{ errors.status }}</p>
          </div>

          <!-- Priority -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              v-model="form.priority"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4 pt-4">
            <button
              type="button"
              @click="handleCancel"
              class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-md"
            >
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentUser = ref(null)

const form = reactive({
  title: '',
  description: '',
  status: '',
  priority: 'medium'
})

const errors = ref({})

// onMounted(() => {
//   // Get current user from session
//   const session = localStorage.getItem('ticketapp_session')
//   if (!session) {
//     router.push('/auth/login')
//     return
//   }
//   currentUser.value = JSON.parse(session)
// })

const validateForm = () => {
  errors.value = {}
  
  if (!form.title.trim()) {
    errors.value.title = 'Title is required'
  }
  
  if (!form.status) {
    errors.value.status = 'Status is required'
  } else if (!['open', 'in_progress', 'closed'].includes(form.status)) {
    errors.value.status = 'Invalid status value'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (!validateForm()) return

  if (!currentUser.value) {
    alert('Please log in to create tickets')
    router.push('/auth/login')
    return
  }

  // Get existing tickets from localStorage
  const existingTickets = JSON.parse(localStorage.getItem('tickets') || '[]')
  
  // Create new ticket with user ownership
  const newTicket = {
    id: Date.now().toString(),
    ...form,
    createdBy: {
      userId: currentUser.value.userId,
      name: currentUser.value.name,
      email: currentUser.value.email
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  // Save to localStorage
  existingTickets.push(newTicket)
  localStorage.setItem('tickets', JSON.stringify(existingTickets))
  
  alert('Ticket created successfully!')
  router.push('/tickets')
}

const handleCancel = () => {
  router.push('/tickets')
}
</script>