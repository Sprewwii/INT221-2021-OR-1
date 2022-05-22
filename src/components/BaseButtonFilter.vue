<script setup>
import { ref, computed } from "vue"
import { eventManager } from "../scripts/eventManager.js";

const props = defineProps({
    eventCategories: {
        type: Array,
        default: []
    }
})

defineEmits(['changeFilterCategory'])

const showInsertDate = ref(false)
const filterDate = (date) => eventManager.getEventByDate(date)

const filterNumber = ref(0);
const filterCategory = ref("");
const date = ref();

const onChange = () => {
    showInsertDate.value = false
    filterCategory.value = ""
  switch (filterNumber.value) {
    case "0": {
      eventManager.getEvents()
    }
      break;
    case "1": {
      eventManager.getEventPast()
    }
      break;
    case "2": {
      eventManager.getEventFuture()
       console.log("future")
    }
      break;
    case "3": {
      eventManager.getEvents()
      showInsertDate.value = true
    }
      break;
  }
// onChange; 
};

const chooseFilterCategory = (categoryId) => {
eventManager.getEventByCategory(categoryId)
console.log(categoryId)
}
</script>
 
<template>
  <div class="">
    <select name="filterFetch" v-show="filterNumber === '3'" @change="chooseFilterCategory(filterCategory.categoryId)" v-model="filterCategory" >
      <option value="" selected disabled hidden>Choose Event Category</option>
      <option :value="eventCategory" v-for="(eventCategory, index) in eventCategories" :key="index">
        {{ eventCategory.categoryName }}
      </option>
    </select>
    <input type="date" v-model="date" v-show="filterNumber === '4'" @change="filterDate(date)">
    <select name="filterNumber" @change="onChange;$emit('changeFilterCategory',filterNumber)" v-model="filterNumber" class=" border text-sm rounded-lg block w-full p-2.5 bg-violet-600 placeholder-gray-400 text-white text-center px-10 appearance-none">
      <option value="0">All Event</option>
      <option value="1">Past Event</option>
      <option value="2">Upcoming Event</option>
      <option value="3">Category</option>
      <option value="4">Date</option>
    </select>



<button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center" type="button" data-dropdown-toggle="dropdown">Dropdown button <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>

<!-- Dropdown menu -->
<div class="hidden bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4" id="dropdown">
    <div class="px-4 py-3">
      <span class="block text-sm">Bonnie Green</span>
      <span class="block text-sm font-medium text-gray-900 truncate">name@flowbite.com</span>
    </div>
    <ul class="py-1" aria-labelledby="dropdown">
      <li>
        <a href="#" class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Dashboard</a>
      </li>
      <li>
        <a href="#" class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Settings</a>
      </li>
      <li>
        <a href="#" class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Earnings</a>
      </li>
      <li>
        <a href="#" class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Sign out</a>
      </li>
    </ul>
</div>
  </div>
</template>
 
<style>
</style>