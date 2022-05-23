<script setup>
import { ref, onBeforeMount } from "vue"
import { eventManager } from "../scripts/eventManager.js"
import { useRoute, useRouter } from "vue-router"
import IconArrowLeft from "../components/icons/IconArrowLeft.vue"

let { params } = useRoute()

const bookingDetails = ref({})

onBeforeMount(async () => {
  bookingDetails.value = await eventManager.getEventById(params.id);
})
</script>

<template>
  <div class="ml-64">
    <h1 class="text-gray-300 text-2xl pt-10 mb-3 mx-8 md:mx-16 lg:mx-32 font-medium select-none">
      Scheduled Event Details
    </h1>
    <div class="relative overflow-x-auto shadow-2xl rounded-lg ml-32 mr-16">
      <div class="text-white rounded-lg" id="details">
        <div v-if="bookingDetails" class=" flex flex-col items-center">
          <div class="mt-16 flex flex-col items-center w-4/6">
            <p class="bg-violet-600 text-white rounded-3xl px-6 py-1 text-2xl text-center break-words w-5/6">
              {{ bookingDetails.name }}
            </p>
            <p class="text-l text-center mt-3">{{ bookingDetails.email }}</p>
          </div>
          <div class="flex flex-col items-center mt-8">
            <p class="text-gray-500 text-xs">EVENT</p>
            <p class="text-violet-600 text-3xl my-3 font-medium tracking-wider">
              {{ bookingDetails.categoryName }}
            </p>
            <div>
              {{
                  new Date(bookingDetails.startTime).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
              }}
              at
              {{
                  new Date(bookingDetails.startTime).toLocaleTimeString("it-IT", {
                    hour: "2-digit",
                    minute: "2-digit"
                  })
              }}
              <span class="text-gray-400">
                ({{ bookingDetails.duration }} minutes)</span>
            </div>
          </div>
          <div class="text-white mt-10 my-7 text-center w-4/6">
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
              <IconArrowLeft />
              <p class="mt-1">Back</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#details {
  background-color: #292B2E;
}
</style>