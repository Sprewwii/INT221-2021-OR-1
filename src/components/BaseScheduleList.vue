<script setup>
import { computed } from "vue"

import { eventManager } from "../scripts/eventManager.js"
import IconMenuKebabVue from "./icons/IconMenuKebab.vue";
import IconDelete from "./icons/IconDelete.vue";
import IconEdit from "./icons/IconEdit.vue";

const props = defineProps({
  bookingList: {
    type: Array,
    default: []
  },
  selectedBookingId: {
    type: Number,
    default: 0
  },
  noEventsWarning: {
    type: String,
    default: ""
  },
})

defineEmits(['selectBooking', 'editBooking', 'deleteBooking'])

const selectedBookingId = computed(() => props.selectedBookingId)
const noEventsWarning = computed(() => props.noEventsWarning)
</script>

<template>
  <div class="mt-6 mr-20">
    <div class="relative shadow-2xl ml-32 w-full">
      <table class="w-full text-center text-gray-200 select-none">
        <thead class="text-xs uppercase text-gray-300 sm:text-sm">
          <tr>
            <th scope="col" class="px-6 py-3 w-4/12">Name</th>
            <th scope="col" class="px-6 py-3 w-3/12">Category</th>
            <th scope="col" class="px-6 py-3 w-2/12">Date Time</th>
            <th scope="col" class="px-6 py-3 w-1/12">Time</th>
            <th scope="col" class="px-6 py-3 w-1/12">
              Duration <br />
              <p class="text-xs">(minutes)</p>
            </th>
            <th colspan="2" class="px-6 py-3">
              <span class="sr-only">Details</span>
            </th>
          </tr>
        </thead>
        <tbody v-if="bookingList.length === 0">
          <td colspan="7" class="py-64 text-xl">{{ noEventsWarning }}</td>
        </tbody>
        <tbody v-else v-for="booking in bookingList" :key="booking.id">
          <tr class="border-t border-gray-700 text-gray-400 hover:bg-gray-600 text-center font-normal">
            <th scope="row" class="pl-6 font-normal text-white text-left break-words">
              <router-link :to="{ name: 'BaseBookingDetails', params: { id: booking.id } }" class="hover:underline">
                {{ booking.name }}
              </router-link>
            </th>
            <td>
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
            <td class="pr-3">
              <div class="inline-block relative">
                <button @click="$emit('selectBooking', booking.id)" class="p-3">
                  <IconMenuKebabVue />
                </button>
                <ul class="absolute text-white pt-1 z-10" v-show="selectedBookingId === booking.id">
                  <li>
                    <button
                      class="rounded-t bg-gray-500 hover:bg-gray-700 py-2 px-4 block whitespace-no-wrap w-full flex items-center flex"
                      @click="$emit('editBooking')">
                      <IconEdit class="mr-2" />Edit
                    </button>
                  </li>
                  <li>
                    <button
                      class="rounded-b bg-gray-500 hover:bg-gray-700 py-2 px-4 block whitespace-no-wrap w-full items-center flex border-t border-l-0 border-r-0 border-b-0 border-gray-600"
                      @click="$emit('deleteBooking')">
                      <IconDelete class="mr-2" />Delete
                    </button>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
</style>
