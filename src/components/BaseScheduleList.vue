<script setup>
import {ref,computed} from "vue";
const props = defineProps({
  events: {
    type: Array,
    default: [],
  }
});

const events = computed(() => props.events);
</script>
 
<template>
    <div>
        <h1 class="text-gray-400 text-2xl pt-10 mb-3 mr-32 ml-32">Scheduled Events</h1>
        <div class="relative overflow-x-auto shadow-2xl mr-32 ml-32 rounded-lg">
            <table class="w-full text-center text-gray-400">
                <thead class="text-sm uppercase bg-gray-700 text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                            Date
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                            Duration <br> <p class="text-xs">(minutes)</p>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Datails</span>
                        </th>
                    </tr>
                </thead>
                <tbody v-if="events.length === 0">
                    <td colspan="5" class="py-64 text-xl">No Scheduled Event</td>
                </tbody>
                <tbody v-else v-for="event in events" :key="event.id" >
                    <tr class="border-t bg-gray-800 border-gray-700 hover:bg-gray-600 text-center font-normal">
                        <th scope="row" class="px-6 py-4 font-normal text-white whitespace-nowrap text-left">
                            {{ event.name }}
                        </th>
                        <td class="px-6 py-4">
                            {{ event.category}}
                        </td>
                        <td class="px-6 py-4">
                            {{ event.startTime}}
                        </td>
                        <td class="px-6 py-4">
                            {{ event.duration }}
                        </td>
                        <td class="px-6 py-4 text-right">
                            <a href="#" class="text-pink-500 hover:underline">Details</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        
        </div>

    </div>
</template>
 
<style>
</style>