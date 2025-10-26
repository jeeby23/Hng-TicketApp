<script setup>
import Navbar from '@/components/ui/Navbar.vue'
import Hero from '@/components/ui/Hero.vue'
import Footer from '@/components/ui/Footer.vue'
import About from '@/views/pages/About.vue'
</script>

<template>
  <main class="mx-auto max-w-[1440px]">
    <Navbar />
    <Hero />
    <About />

    <section class="my-16 px-6 text-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Why Choose Us</h1>
        <p class="text-center max-w-2xl mx-auto text-gray-600 leading-relaxed mb-10">
          At Tickets, we don't just sell tickets we curate unforgettable experiences. Our passion
          for events and our commitment to customer satisfaction set us apart. With us, you can
          expect:
        </p>
      </div>

      <div class="flex flex-col md:flex-row gap-10 justify-center items-center">
 
        <div class="flex flex-col justify-center items-center max-w-xs text-center">
          <span
            class="material-symbols-outlined text-[10em] w-auto h-auto p-4 flex items-center justify-center bg-[#fdfdfd] shadow-md rounded-full text-gray-700 mx-auto mb-[13px]"
          >
            calendar_month
          </span>
          <h2 class="font-semibold text-lg mb-2">Diverse Events</h2>
          <p class="text-gray-600">
            A diverse selection of events to cater to all interests and tastes.
          </p>
        </div>

        <div class="flex flex-col justify-center items-center max-w-xs text-center">
          <span
            class="material-symbols-outlined text-[4em] w-auto h-auto p-4 flex items-center justify-center bg-[#fdfdfd] shadow-md rounded-full text-gray-700 mx-auto mb-[13px]"
          >
            lock
          </span>
          <h2 class="font-semibold text-lg mb-2">Secure Bookings</h2>
          <p class="text-gray-600">
            A secure and seamless booking process that ensures peace of mind.
          </p>
        </div>

        <div class="flex flex-col justify-center items-center max-w-xs text-center">
          <span
            class="material-symbols-outlined text-[4em]w-auto h-auto p-4 flex items-center justify-center bg-[#fdfdfd] shadow-md rounded-full text-gray-700 mx-auto mb-[13px]"
          >
            phone_enabled
          </span>
          <h2 class="font-semibold text-lg mb-2">Customer Support</h2>
          <p class="text-gray-600">24/7 customer support that is always ready to assist you.</p>
        </div>
      </div>
    </section>
    <section>
      <div class="flex flex-col justify-center items-center">
        <h2 class="font-medium text-4xl text-center">
          Start creating <span class="text-gray-400">Events</span> now!!
        </h2>
        <p class="text-gray-500 text-center py-5">
          Tickets is an event ticketing platform for experiences in Africa.
        </p>
        <span class="py-2 px-5 bg-gray-800 w-64 text-white text-xl rounded-full text-center">
          <RouterLink class="" :to="{ name: 'Signup' }">Create event</RouterLink>
        </span>
      </div>
    </section>
    <Footer />
  </main>
</template>
