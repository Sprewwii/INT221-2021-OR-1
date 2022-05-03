<script setup>
import { eventManager } from "../scripts/eventManager.js"
import { useRoute, useRouter } from "vue-router"
import IconArrowLeft from "../components/icons/IconArrowLeft.vue"
import { ref, computed } from "vue"
let { params } = useRoute()

const bookingDetails = computed(() =>
  eventManager.eventList.find((event) => event.id == params.id)
)
</script>

<template>
  <div>
  <h1
    class="text-gray-300 text-2xl pt-10 mb-3 mx-8 md:mx-16 lg:mx-32 font-medium"
  >
    Scheduled Event Details
  </h1>
  <div
    class="relative overflow-x-auto shadow-2xl rounded-lg mx-8 ml:mx-16 lg:mx-32"
  >
    <div
     
      class="text-white bg-gray-600 bg-opacity-20 rounded-lg"
    >
    <div  v-if="bookingDetails" class="flex flex-col items-center">
      <div class="mt-16">
        <p class="bg-pink-500 text-white rounded-3xl px-6 py-1 text-2xl text-center">
          {{ bookingDetails.name }}
        </p>
        <p class="text-l text-center mt-3">{{ bookingDetails.email }}</p>
      </div>
      <div class="flex flex-col items-center mt-8">
        <p class="text-gray-500 text-xs">EVENT</p>
        <p class="text-pink-500 text-3xl my-3 font-medium tracking-wider">
          {{ bookingDetails.eventCategory.categoryName }}
        </p>
        <div>
              {{
                  new Date(bookingDetails.startTime).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    timeZone: 'UTC'
                  })
              }}
          at
               {{
                  new Date(bookingDetails.startTime).toLocaleTimeString("it-IT", {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: 'UTC'
                  })
              }}
          <span class="text-gray-400">
            ({{ bookingDetails.duration }} minutes)</span
          >
        </div>
      </div>

      <div class="text-white mt-10 my-7 text-center">
        <div v-if="bookingDetails.note">
          <p class="text-gray-500">note</p>
          <p>{{ bookingDetails.note }}</p>
        </div>
        <p v-else class="text-gray-500">No message</p>
      </div>
      </div>
      <div>
        <router-link :to="{ name: 'Home' }" class="flex pb-6 pl-10">
          <div class="flex items-center hover:opacity-80">
            <IconArrowLeft /><p class="mt-1">Back</p>
          </div>
        </router-link>
      </div>
    </div>
    
  </div>

  </div>
</template>

<style></style>
