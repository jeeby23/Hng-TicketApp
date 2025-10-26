<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-[1440px] mx-auto">
      <div class="flex justify-between items-center mb-8"></div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-xl shadow text-center">
          <h3 class="text-lg font-semibold text-gray-600">Total Tickets</h3>
          <p class="text-3xl font-bold text-blue-500">{{ stats.total }}</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow text-center">
          <h3 class="text-lg font-semibold text-gray-600">Open Tickets</h3>
          <p class="text-3xl font-bold text-green-500">{{ stats.open }}</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow text-center">
          <h3 class="text-lg font-semibold text-gray-600">Resolved</h3>
          <p class="text-3xl font-bold text-gray-500">{{ stats.closed }}</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
        <div class="flex flex-wrap gap-4 mb-6">
          <button
            @click="openModal"
            class="bg-green-400 text-white px-1 py-2 rounded hover:bg-green-700 transition"
          >
            + New Ticket
          </button>
        </div>

        <RecentTickets :tickets="recentTickets" @edit="editTicket" @delete="deleteTicket" />
      </div>
    </div>

    <TicketModal
      v-if="showModal"
      :editing="editing"
      @close="closeModal"
      @saved="
        () => {
          loadTickets()
          closeModal()
        }
      "
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TicketModal from '@/components/Dashboard/TicketModal.vue'
import RecentTickets from '@/components/Dashboard/RecentTicketsTable.vue'

const router = useRouter()
const stats = ref({ total: 0, open: 0, closed: 0 })
const recentTickets = ref([])
const showModal = ref(false)
const editing = ref(null)

const loadTickets = () => {
  const tickets = JSON.parse(localStorage.getItem('tickets') || '[]')
  recentTickets.value = tickets.slice(-5).reverse()
  updateStats(tickets)
}

const updateStats = (tickets) => {
  stats.value = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === 'open').length,
    closed: tickets.filter((t) => t.status === 'closed').length,
  }
}

const deleteTicket = (id) => {
  if (confirm('Are you sure you want to delete this ticket?')) {
    let tickets = JSON.parse(localStorage.getItem('tickets') || '[]')
    tickets = tickets.filter((t) => t.id !== id)
    localStorage.setItem('tickets', JSON.stringify(tickets))
    loadTickets()
  }
}

const editTicket = (ticket) => {
  editing.value = ticket
  showModal.value = true
}

const openModal = () => (showModal.value = true)
const closeModal = () => {
  showModal.value = false
  editing.value = null
}

onMounted(loadTickets)
</script>
