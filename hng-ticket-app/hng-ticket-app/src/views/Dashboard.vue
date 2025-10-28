<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-[1440px] mx-auto space-y-8">
      <!-- Stats Section -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div class="bg-white  flex flex-col justify-center items-center w-64 md:w-full p-6 rounded-xl shadow md:text-center">
          <h3 class="text-base sm:text-lg font-semibold text-gray-600">
            Total Tickets
          </h3>
          <p class="text-2xl sm:text-3xl font-bold text-blue-500">
            {{ stats.total }}
          </p>
        </div>
        <div class="bg-white flex flex-col justify-center items-center  w-64 md:w-full p-6 rounded-xl shadow md:text-center">
          <h3 class="text-base sm:text-lg font-semibold text-gray-600">
            Open Tickets
          </h3>
          <p class="text-2xl sm:text-3xl font-bold text-green-500">
            {{ stats.open }}
          </p>
        </div>
        <div class="bg-white flex flex-col justify-center items-center w-64 md:w-full  p-6 rounded-xl shadow md:text-center">
          <h3 class="text-base sm:text-lg font-semibold text-gray-600">
            Resolved
          </h3>
          <p class="text-2xl sm:text-3xl font-bold text-gray-500">
            {{ stats.closed }}
          </p>
        </div>
      </div>

      <!-- Quick Actions Section -->
      <div class="bg-white rounded-xl  w-[350px] md:w-full shadow p-6">
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4"
        >
          <h2 class="text-lg sm:text-xl font-semibold text-gray-800">
            Quick Actions
          </h2>
          <div class="flex flex-wrap gap-3">
            <!-- <button
              @click="openModal"
              class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              + New Ticket
            </button> -->
            <RouterLink
              :to="{ name: 'TicketPage' }"
              class="border border-gray-300 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition"
            >
              View all tickets
            </RouterLink>
          </div>
        </div>

        <!-- Recent Tickets Table -->
        <RecentTickets
          :tickets="recentTickets"
          @edit="editTicket"
          @delete="deleteTicket"
        />
      </div>
    </div>

    <!-- Modal -->
    <TicketModal
      v-if="showModal"
      :editing="editing"
      @close="closeModal"
      @saved="
        () => {
          loadTickets();
          closeModal();
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

const updateStats = (tickets) => {
  stats.value = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === 'open').length,
    closed: tickets.filter((t) => t.status === 'closed').length,
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

const loadTickets = () => {
  const tickets = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]')
  recentTickets.value = tickets.slice(-5).reverse()
  updateStats(tickets)
}

const deleteTicket = (id) => {
  if (confirm('Are you sure you want to delete this ticket?')) {
    let tickets = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]')
    tickets = tickets.filter((t) => t.id !== id)
    localStorage.setItem('ticketapp_tickets', JSON.stringify(tickets))
    loadTickets()
  }
}

onMounted(loadTickets)
</script>