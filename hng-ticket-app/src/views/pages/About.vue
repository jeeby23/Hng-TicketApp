<script setup>
import about from "@/assets/about.jpg"
</script>

<template>
  <main class="mx-auto max-w-[1440px] px-6 py-12">
     
    <div class="flex flex-col md:flex-row items-center gap-10">
      
      <!-- Left Text Section -->
      <div class="flex-1">
         <div class="bg-gray-500 h-2 md:h-1 my-4 rounded" style="width: 48px"></div>
        <h1 class="text-3xl md:text-4xl font-bold mb-4 text-gray-800">About Us</h1>
        <p class="text-gray-600 leading-relaxed mb-6">
          Tickets is an efficient platform where booking tickets is made easy and secure. 
          Our coverage spans across Nigeria, and we're passionate about connecting people 
          with unforgettable experiences. We are your one-stop platform for all event ticket booking needs.
        </p>
        <button class="bg-black text-white rounded-full py-3 px-6 hover:bg-gray-800 transition">
          Read More
        </button>
      </div>

      <!-- Right Image Section -->
      <div class="flex-1">
        <figure>
          <img 
            :src="about" 
            alt="About" 
            class="w-full h-auto rounded-2xl shadow-md object-cover  hover:scale-110 transition-transform duration-500"
          />
        </figure>
      </div>
    </div>
  </main>
</template>