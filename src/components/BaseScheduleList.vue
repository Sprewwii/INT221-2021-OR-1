<script setup>
import { ref,computed } from "vue"
import iconMenuKebab from "./icons/IconMenuKebab.vue";
const props = defineProps({
  bookingList: {
    type: Array,
    default: []
  }
})

// const bookingSort = computed(() =>
//   props.bookingList.sort(
//     (a, b) => new Date(b.startTime) - new Date(a.startTime)
//   )
// )

const isShowOption = ref(false)

function ab(){
  console.log("sadas")
}

</script>

<template>
  <div>
    <h1 class="text-gray-300 text-2xl pt-10 mb-3 mx-8 md:mx-16 lg:mx-32 font-medium">
      Scheduled Events
    </h1>
    <div class="relative overflow-x-auto shadow-2xl rounded-lg mx-8 ml:mx-16 lg:mx-32">
      <table class="w-full text-center text-gray-200">
        <thead class="text-xs uppercase bg-gray-700 text-gray-300 bg-opacity-50 sm:text-sm">
          <tr>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Category</th>
            <th scope="col" class="px-6 py-3 text-center">Date Time</th>
            <th scope="col" class="px-6 py-3 text-center">Time</th>
            <th scope="col" class="px-6 py-3 text-center">
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
            <th scope="row" class="pl-6 font-normal text-white whitespace-nowrap text-left">
              {{ booking.name }}
            </th>
            <td class="pl-6">
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
            <td  class="pr-3">
              <button @click="ab()" :id="`dropdownRightStartButton${booking.id}`" data-dropdown-toggle="dropdownRightStart" data-dropdown-placement="right-start">
                <iconMenuKebab />
                </button>
              <div :id="`dropdownRightStart${booking.id}`" class="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700">
                  <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRightStartButton">
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                    </li>
                  </ul>
              </div>
              </td>
          </tr>
        </tbody>
      </table>
    </div>
       <button class="text-white" id="dropdownRightStart" data-dropdown-toggle="dropdownRightStart" data-dropdown-placement="right-start">
                <iconMenuKebab />
                </button>
              <div id="dropdownRightStart" class="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700">
                  <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRightStartButton">
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                    </li>
                  </ul>
              </div>


                     <button @click="ab()" id="dropdownRightStart2" class="text-white" data-dropdown-toggle="dropdownRightStart" data-dropdown-placement="right-start">
                <iconMenuKebab />saaaaaa
                </button>
              <div id="dropdownRightStart2" class="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700">
                  <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRightStartButton">
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                    </li>
                  </ul>
              </div>
  </div>
</template>

<style>
</style>
