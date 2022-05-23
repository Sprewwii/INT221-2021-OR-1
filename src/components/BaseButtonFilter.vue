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

const changeFilter = () => {
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
    <select name="filterNumber" @change="changeFilter();$emit('changeFilterCategory',filterNumber)" v-model="filterNumber" class=" border text-sm rounded-lg block w-full p-2.5 bg-violet-600 placeholder-gray-400 text-white text-center px-10 appearance-none">
      <option value="0">All Event</option>
      <option value="1">Past Event</option>
      <option value="2">Upcoming Event</option>
      <option value="3">Category</option>
      <option value="4">Date</option>
    </select>




  </div>
</template>
 
<style>
</style>