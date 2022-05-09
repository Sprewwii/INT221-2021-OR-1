<script setup>
import { ref } from "vue"

import { eventManager } from "../scripts/eventManager.js"
import BaseDropdownOption from "./BaseDropdownOption.vue"
import BasePopupConfirm from "./BasePopupConfirm.vue"

defineProps({
  bookingList: {
    type: Array,
    default: []
  }
})

const selectedId = ref(0);
const selectEventOption = (id) => {
  if (selectedId.value === id) {
    selectedId.value = 0
  } else {
    selectedId.value = id
  }
}

const showDeleteConfirmModal = ref(false)

const deleteBookingConfirm = () => {
  showDeleteConfirmModal.value = true
}

const toggleDeleteConfirmModal = () => {
  showDeleteConfirmModal.value = !showDeleteConfirmModal.value
  selectEventOption(0)
}

const deleteSelectedBooking = () => {
  eventManager.deleteEvent(selectedId.value)
  toggleDeleteConfirmModal()
  selectEventOption(0)
}


</script>

<template>
  <div>
    <BasePopupConfirm v-show="showDeleteConfirmModal" @closeConfirmModal="toggleDeleteConfirmModal"
      @deleteSelectedBooking="deleteSelectedBooking" />
    <h1 class="text-gray-300 text-2xl pt-10 mb-3 mx-8 md:mx-16 lg:mx-32 font-medium">
      Scheduled Events
    </h1>
    <div class="relative shadow-2xl mx-8 ml:mx-16 lg:mx-32">
      <table class="w-full text-center text-gray-200">
        <thead class="text-xs uppercase bg-gray-700 text-gray-300 bg-opacity-50 sm:text-sm">
          <tr>
            <th scope="col" class="px-6 py-3 w-1/3">Name</th>
            <th scope="col" class="px-6 py-3">Category</th>
            <th scope="col" class="px-6 py-3">Date Time</th>
            <th scope="col" class="px-6 py-3">Time</th>
            <th scope="col" class="px-6 py-3">
              Duration <br />
              <p class="text-xs">(minutes)</p>
            </th>
            <th colspan="2" class="px-6 py-3">
              <span class="sr-only">Details</span>
            </th>
          </tr>
        </thead>
        <tbody v-if="bookingList.length === 0">
          <td colspan="7" class="py-64 text-xl">No Scheduled Event</td>
        </tbody>
        <tbody v-else v-for="booking in bookingList" :key="booking.id">
          <tr
            class="border-t bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-600 text-center font-normal bg-opacity-50">
            <th scope="row" class="pl-6 font-normal text-white text-left">
              {{ booking.name }}
            </th>
            <td class="">
              {{ booking.categoryName }}
            </td>
            <td class="px-6 py-4">
              {{
                  new Date(booking.startTime).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
              }}
              <!-- {{
                new Date(booking.startTime).toISOString()
              }} -->
            </td>

            <td class="px-6 py-4">
              {{
                  new Date(booking.startTime).toLocaleTimeString("it-IT", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
              }}
            </td>
            <td class="px-6 py-4">
              {{ booking.duration }}
            </td>
            <td class="pr-10 py-4 text-right">
              <router-link :to="{ name: 'BaseBookingDetails', params: { id: booking.id } }"
                class="text-pink-500 hover:underline">Details</router-link>

            </td>
            <td class="pr-3">



              <BaseDropdownOption :selectedId="selectedId" :bookingId="booking.id" @deleteBooking="deleteBookingConfirm"
                @selectEventOption="selectEventOption" />

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
</style>
