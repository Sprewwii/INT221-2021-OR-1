<script setup>
import { computed } from "vue"
const props = defineProps({
  bookingList: {
    type: Array,
    default: []
  }
})

const bookingSort = computed(() =>
  props.bookingList.sort(
    (a, b) => new Date(b.startTime) - new Date(a.startTime)
  )
)
</script>

<template>
  <div>
    <h1
      class="text-gray-300 text-2xl pt-10 mb-3 mx-8 md:mx-16 lg:mx-32 font-medium"
    >
      Scheduled Events
    </h1>
    <div
      class="relative overflow-x-auto shadow-2xl rounded-lg mx-8 ml:mx-16 lg:mx-32"
    >
      <table class="w-full text-center text-gray-200">
        <thead
          class="text-xs uppercase bg-gray-700 text-gray-300 bg-opacity-50 sm:text-sm"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Category</th>
            <th scope="col" class="px-6 py-3 text-center">Date</th>
            <th scope="col" class="px-6 py-3 text-center">Time</th>
            <th scope="col" class="px-6 py-3 text-center">
              Duration <br />
              <p class="text-xs">(minutes)</p>
            </th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Details</span>
            </th>
          </tr>
        </thead>
        <tbody v-if="bookingList.length === 0">
        <td colspan="6" class="py-64 text-xl">No Scheduled Event</td></tbody>
        <tbody v-else v-for="booking in bookingSort" :key="booking.id">
          <tr
            class="border-t bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-600 text-center font-normal bg-opacity-50 sm:text-sm"
          >
            <th
              scope="row"
              class="px-6 py-4 font-normal text-white whitespace-nowrap text-left"
            >
              {{ booking.name }}
            </th>
            <td class="px-6 py-4">
              {{ booking.eventCategory.categoryName }}
            </td>
            <td class="px-6 py-4">
              {{
                new Date(booking.startTime).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                })
              }}
            </td>
            <td class="px-6 py-4">
              {{
                new Date(booking.startTime).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit"
                })
              }}
            </td>
            <td class="px-6 py-4">
              {{ booking.duration }}
            </td>
            <td class="px-6 py-4 text-right">
              <router-link
                :to="{ name: 'BaseBookingDetails', params: { id: booking.id } }"
                class="text-pink-500 hover:underline"
                >Details</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style></style>
