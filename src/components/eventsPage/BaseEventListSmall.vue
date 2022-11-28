<script setup>
import { computed } from "vue"
import { userManager } from "../../scripts/userManager.js"
import { eventManager } from "../../scripts/eventManager.js"
import IconMenuKebabVue from "../icons/IconMenuKebab.vue"
import IconDelete from "../icons/IconDelete.vue"
import IconEdit from "../icons/IconEdit.vue"

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
  <div class="mt-6 pb-64 ml-0 lg:ml-20 lg:pr-20 w-full ">
    <div class="relative bg-managray-300/20 rounded-2xl shadow-2xl w-full">
      <table class="w-full text-center text-gray-200 select-none divide-y divide-managray-100/30">
        <tbody v-if="bookingList.length === 0">
          <td colspan="7" class="py-64 text-xl">{{ noEventsWarning }}</td>
        </tbody>
        <tbody v-else v-for="booking in bookingList" :key="booking.id">
          <tr class="border-managray-100/20 pl-6 text-white hover:bg-managray-300/30 text-center font-[200]">
            <td scope="row" class="pl-6 py-2 w-full font-[200] text-white text-left">
              <router-link :to="{ name: 'EventDetail', params: { id: booking.id } }" class="hover:underline">
                <p class="text-lg w-[200px] md:w-[400px] lg:w-[200px] xl:w-[400px] truncate">{{ booking.name }}</p>
              </router-link>
              <!-- <div v-else> {{ booking.name }}</div> -->
              <div class="text-sm text-managray-100">
                <p>{{ booking.categoryName }}</p>
                <span class="flex gap-x-2">  <p>{{
                  new Date(booking.startTime).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
              }} </p><p>{{
                  new Date(booking.startTime).toLocaleTimeString("it-IT", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
              }}
              </p>
            <p> ({{ booking.duration}} minutes)</p>
            </span>
            </div>
            </td>
        
            <td class="pr-3">
              <div v-if="userManager.userInfo.role !== 'lecturer'" class="inline-block relative">
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
