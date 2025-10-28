<template>
  <div class="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 text-center">
      <h1 class="text-lg font-semibold text-gray-800 mb-6">{{ title }}</h1>

      <div class="flex justify-center gap-4">
        <button
          @click="$emit('confirm')"
          class="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition w-24"
        >
          Yes
        </button>
        <button
          @click="$emit('close')"
          class="border border-gray-300 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-100 transition w-24"
        >
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Are you sure you want to logout?',
  },
})
defineEmits(['close', 'confirm'])
</script>