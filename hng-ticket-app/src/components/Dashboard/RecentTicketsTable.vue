<template>
  <div>
    <h3 class="text-lg font-semibold text-gray-700 mb-3">Recent Tickets</h3>
    <div v-if="tickets.length > 0" class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-3 text-left text-sm font-medium text-gray-700">Title</th>
            <th class="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
            <th class="px-4 py-3 text-left text-sm font-medium text-gray-700">Priority</th>
            <th class="px-4 py-3 text-left text-sm font-medium text-gray-700">Created</th>
            <th class="px-4 py-3 text-center text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>

        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="ticket in tickets" :key="ticket.id" class="hover:bg-gray-50">
            <td class="px-4 py-3 text-gray-800 font-medium">{{ ticket.title }}</td>
            <td class="px-4 py-3">
              <span
                class="px-2 py-1 rounded-full text-xs font-semibold capitalize"
                :class="{
                  'bg-green-100 text-green-700': ticket.status === 'open',
                  'bg-amber-100 text-amber-700': ticket.status === 'in_progress',
                  'bg-gray-100 text-gray-700': ticket.status === 'closed',
                }"
              >
                {{ ticket.status }}
              </span>
            </td>
            <td class="px-4 py-3 capitalize">{{ ticket.priority || 'normal' }}</td>
            <td class="px-4 py-3 text-sm text-gray-500">{{ formatDate(ticket.createdAt) }}</td>
            <td class="px-4 py-3 text-center flex justify-center gap-2">
              <button
                @click="$emit('edit', ticket)"
                class=" border text-amber-400 px-3 py-1 rounded-md hover:bg-yellow-500 hover:text-white transition"
              >
                Update
              </button>
              <button
                @click="$emit('delete', ticket.id)"
                class="bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-500 transition"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="text-gray-500 text-sm">No recent tickets found.</p>
  </div>
</template>

<script setup>
const props = defineProps({
  tickets: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])

const formatDate = (date) => new Date(date).toLocaleDateString()
</script>