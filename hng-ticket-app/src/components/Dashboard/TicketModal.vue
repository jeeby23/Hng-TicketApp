<template>
  <div class="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">
        {{ editing ? 'Update Ticket' : 'Create New Ticket' }}
      </h2>
      
      <form @submit.prevent="saveTicket" class="space-y-4">
        <div>
          <label class="block text-gray-700 mb-1">Title</label>
          <input 
            v-model="form.title" 
            type="text" 
            placeholder="Enter ticket title"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <p v-if="errors.title" class="text-red-500 text-sm">{{ errors.title }}</p>
        </div>

        <div>
          <label class="block text-gray-700 mb-1">Description</label>
          <textarea 
            v-model="form.description" 
            placeholder="Describe the issue..."
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          ></textarea>
        </div>

        <div>
          <label class="block text-gray-700 mb-1">Status</label>
          <select 
            v-model="form.status" 
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Select status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          <p v-if="errors.status" class="text-red-500 text-sm">{{ errors.status }}</p>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button 
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 border rounded-lg hover:bg-gray-100">
            Cancel
          </button>
          <button 
     
            type="submit"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,  // controls modal visibility
  editing: Object,      // ticket to edit
})
const emit = defineEmits(['close', 'saved'])

const form = ref({
  title: '',
  description: '',
  status: '',
})
const errors = ref({})

watch(
  () => props.editing,
  (val) => {
    if (val) form.value = { ...val }
    else form.value = { title: '', description: '', status: '' }
  },
  { immediate: true }
)

const validateForm = () => {
  errors.value = {}
  if (!form.value.title.trim()) errors.value.title = 'Title is required.'
  if (!form.value.status.trim()) errors.value.status = 'Status is required.'
  return Object.keys(errors.value).length === 0
}

const saveTicket = () => {
  if (!validateForm()) return

  let tickets = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]')

  if (props.editing) {
    const index = tickets.findIndex(t => t.id === props.editing.id)
    if (index !== -1) {
      tickets[index] = { ...tickets[index], ...form.value }
    }
  } else {
    tickets.push({
      id: Date.now(),
      ...form.value,
      createdAt: new Date().toISOString()
    })
  }
  localStorage.setItem('ticketapp_tickets', JSON.stringify(tickets))
  emit('saved')
}
</script>