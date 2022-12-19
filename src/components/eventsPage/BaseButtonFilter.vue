<script setup>
import { ref, computed } from "vue";
import { eventManager } from "../../scripts/eventManager.js";
import { eventFilter } from "../../scripts/eventFilter.js";

const props = defineProps({
  eventCategories: {
    type: Array,
    default: [],
  },
});

defineEmits(["noEventMessage"]);

const selectedFilter = computed(() => eventFilter.selectedFilter);
const filterList = eventFilter.filterList;
const showFilterList = ref(false);
const showFilterTab = ref(0);
const choosedDate = ref("")

const chooseFilter = (filter) => {
  eventFilter.selectedFilter = filter;
  selectedFilter.value.getEvents();
  filterList[3].selectedCategory = null;
  toggleFilterList();
};

const filterCategory = (categoryId) => {
  eventFilter.selectedFilter = filterList[3];
  eventManager.getEventsByCategory(categoryId)
  toggleFilterList();
};

const toggleFilterList = () => {
  showFilterList.value = !showFilterList.value;
};

const filterDate = () => {
  if (choosedDate.value) {
    eventFilter.selectedFilter = filterList[4];
    filterList[3].selectedCategory = null
     toggleFilterList();

    eventManager.getEventsByDate(formatDate())
  }
}

const formatDate = () =>  {
  const date = new Date(choosedDate.value)
    date.setMonth(date.getMonth() + 1)
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}
</script>

<template>
  <div class="">
    <div class="relative inline-block">
      <div class="flex space-x-2">
        <div v-if="selectedFilter.id == 4 && filterList[3].selectedCategory"
        class="relative z-10 w-full sm:w-60 flex items-center justify-center py-2 text-sm text-center text-white background-gray border border-manapurple-100 rounded-md">
        <span class="mx-1">{{ filterList[3].selectedCategory.categoryName }}</span>
      </div>
      <div v-show="selectedFilter.id == 5"
        class="relative z-10 w-40 flex items-center justify-center py-2 text-sm text-center text-white background-gray border border-manapurple-100 rounded-md">
        <span class="mx-1">{{ new Date(choosedDate).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }) }}</span>
      </div>
      <button @click="toggleFilterList()"
        class="relative z-10 w-30 flex items-center justify-between py-2 sm:py-3 px-1 sm:pl-2 text-sm text-center text-manapurple-100 outline outline-1 outline-manapurple-100 border border-transparent rounded-md hover:bg-manapurple-100 hover:text-white">
        <span class="mx-1 w-20 lg:w-40 truncate">{{ selectedFilter.name }}</span>
        <svg class="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
            fill="currentColor"></path>
        </svg>
      </button>
      </div>
      <div v-show="showFilterList"
        class="bg-managray-100/10 backdrop-blur-lg shadow-xl absolute right-0 z-20 mt-2 overflow-hidden rounded-md shadow-xl flex flex-row hover:cursor-pointer">
        <div v-show="showFilterTab === 4" class="w-40 sm:w-64 background-gray h-80 z-20" @mouseover="showFilterTab = 4"
          @mouseleave="showFilterTab = 0">
          <div v-for="eventCategory in eventCategories" :key="eventCategory.categoryId"
            @click="filterCategory(eventCategory.categoryId); filterList[3].selectedCategory = eventCategory"
            :class="[filterList[3].selectedCategory && filterList[3].selectedCategory.categoryId === eventCategory.categoryId ? 'bg-manapink-100 text-white' : 'text-managray-100']"
            class="block px-4 py-6 h-1/5 flex items-center text-sm capitalize transition-colors duration-200 transform hover:border hover:border-manapurple-100 hover:border-2">
            {{ eventCategory.categoryName }}
          </div>
        </div>
        <div v-show="showFilterTab === 5" class="w-44 sm:w-64 h-80 z-20" @mouseover="showFilterTab = 5"
          @mouseleave="showFilterTab = 0">
          <Datepicker v-model="choosedDate" @update:modelValue="filterDate" inline autoApply
            :enableTimePicker="false" dark/>
            
        </div>
        <div class="w-40">
          <div v-for="index in 3" :key="index"
            @click="chooseFilter(filterList[index - 1]); $emit('noEventMessage', filterList[index - 1].noEventMessage)"
            class="block px-4 py-3 text-sm text-gray-400 capitalize transition-colors duration-200 transform hover:bg-manapurple-100 hover:text-white">
            {{ filterList[index - 1].name }}
          </div>
          <div v-for="index in 2" :key="index" @mouseover="showFilterTab = filterList[index + 2].id; $emit('noEventMessage', filterList[index +2].noEventMessage)"
            @mouseleave="showFilterTab = 0"
            class="block px-4 py-3 text-sm text-gray-400 capitalize transition-colors duration-200 transform hover:bg-manapurple-100 hover:text-white ">
            {{ filterList[index + 2].name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>
