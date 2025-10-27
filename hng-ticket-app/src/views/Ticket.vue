<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '@/components/ui/Navbar.vue'

const tickets = ref([])
const showModal = ref(false)
const title = ref('')
const description = ref('')
const status = ref('open')
const errors = ref({})

const STORAGE_KEY = 'ticketapp_tickets'

// Load tickets
onMounted(() => {
  tickets.value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
})

// Create ticket
const createTicket = () => {
  errors.value = {}
  if (!title.value.trim()) errors.value.title = 'Title required'
  if (!status.value.trim()) errors.value.status = 'Status required'
  if (Object.keys(errors.value).length) return

  const newTicket = {
    id: Date.now(),
    title: title.value,
    description: description.value,
    status: status.value,
    createdAt: new Date().toLocaleString(),
  }

  tickets.value.push(newTicket)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets.value))

  title.value = description.value = ''
  status.value = 'open'
  showModal.value = false
}

// Delete ticket
const deleteTicket = (id) => {
  if (confirm('Delete this ticket?')) {
    tickets.value = tickets.value.filter(t => t.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets.value))
  }
}
</script>
<template>
  <!-- <Navbar /> -->
  <div class="max-w-[1440px] mx-auto px-4 py-10">
    <div class="flex justify-between items-center mb-8">
      <h1 class="md:text-3xl font-bold text-gray-800">Ticket Management</h1>
      <button
        @click="showModal = true"
        class="bg-blue-500 hover:bg-blue-600 text-sm text-white font-semibold py-2 px-5 rounded-xl shadow-md transition"
      >
        + New Ticket
      </button>
    </div>

    <!-- Ticket Cards -->
    <div
      v-if="tickets.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="ticket in tickets"
        :key="ticket.id"
        class="bg-white p-5 rounded-2xl shadow-md border"
      >
        <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ ticket.title }}</h2>
        <p class="text-gray-600 text-sm mb-3">{{ ticket.description || 'No description' }}</p>
        <span
          class="inline-block px-3 py-1 text-xs font-semibold rounded-full"
          :class="{
            'bg-green-100 text-green-600': ticket.status === 'open',
            'bg-amber-100 text-amber-600': ticket.status === 'in_progress',
            'bg-gray-200 text-gray-600': ticket.status === 'closed',
          }"
        >
          {{ ticket.status }}
        </span>
        <div class="text-xs text-gray-500 mt-3">Created: {{ ticket.createdAt }}</div>

        <div class="mt-4 flex justify-end space-x-2">
          <button
            @click="deleteTicket(ticket.id)"
            class="bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <p v-else class="text-center text-gray-500 mt-20 text-sm">
      No tickets yet. Click <span class="font-semibold">"New Ticket"</span> to create one.
    </p>

    <!-- Create Ticket Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0  bg-black/40 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl">
        <h2 class="text-2xl font-semibold mb-4">Create New Ticket</h2>

        <form @submit.prevent="createTicket" class="space-y-4">
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-1">Title</label>
            <input
              v-model="title"
              type="text"
              class="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter ticket title"
            />
            <p v-if="errors.title" class="text-red-500 text-xs mt-1">{{ errors.title }}</p>
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-medium mb-1">Description</label>
            <textarea
              v-model="description"
              class="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter ticket details"
            ></textarea>
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-medium mb-1">Status</label>
            <select
              v-model="status"
              class="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            <p v-if="errors.status" class="text-red-500 text-xs mt-1">{{ errors.status }}</p>
          </div>

          <div class="flex justify-end space-x-3 pt-3">
            <button
              type="button"
              @click="showModal = false"
              class="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
            >
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>