<script setup>
import { ref, computed } from "vue";
import { eventManager } from "../scripts/eventManager.js";
import { eventFilter } from "../scripts/eventFilter.js";

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
  console.log(filter);
  console.log(selectedFilter.value);
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
        class="relative z-10 w-60 flex items-center justify-center py-2 text-sm text-center text-white background-gray border border-violet-600 border-2 rounded-md">
        <span class="mx-1">{{ filterList[3].selectedCategory.categoryName }}</span>
      </div>
      <div v-show="selectedFilter.id == 5"
        class="relative z-10 w-40 flex items-center justify-center py-2 text-sm text-center text-white background-gray border border-violet-600 border-2 rounded-md">
        <span class="mx-1">{{ new Date(choosedDate).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }) }}</span>
      </div>
      <button @click="toggleFilterList()"
        class="relative z-10 w-40 flex items-center justify-between py-3 pl-2 text-sm text-center text-white bg-violet-600 border border-transparent rounded-md hover:bg-violet-700">
        <span class="mx-1">{{ selectedFilter.name }}</span>
        <svg class="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
            fill="currentColor"></path>
        </svg>
      </button>
      </div>
      <div v-show="showFilterList"
        class="background-gray absolute right-0 z-20 mt-2 overflow-hidden rounded-md shadow-xl flex flex-row">
        <div v-show="showFilterTab === 4" class="w-64 background-gray h-80 z-50" @mouseover="showFilterTab = 4"
          @mouseleave="showFilterTab = 0">
          <div v-for="eventCategory in eventCategories" :key="eventCategory.categoryId"
            @click="filterCategory(eventCategory.categoryId); filterList[3].selectedCategory = eventCategory"
            :class="[filterList[3].selectedCategory && filterList[3].selectedCategory.categoryId === eventCategory.categoryId ? 'bg-violet-600 text-white' : 'background-gray text-gray-400']"
            class="block px-4 py-6 h-1/5 text-sm capitalize transition-colors duration-200 transform hover:border hover:border-violet-500 hover:border-2">
            {{ eventCategory.categoryName }}
          </div>
        </div>
        <div v-show="showFilterTab === 5" class="w-64 background-gray h-80 z-50" @mouseover="showFilterTab = 5"
          @mouseleave="showFilterTab = 0">
          <Datepicker v-model="choosedDate" @update:modelValue="filterDate" inline autoApply
            :enableTimePicker="false" dark/>
            
        </div>
        <div class="w-40">
          <div v-for="index in 3" :key="index"
            @click="chooseFilter(filterList[index - 1]); $emit('noEventMessage', filterList[index - 1].noEventMessage)"
            class="block px-4 py-3 text-sm text-gray-400 capitalize transition-colors duration-200 transform hover:bg-violet-600 hover:text-white">
            {{ filterList[index - 1].name }}
          </div>
          <div v-for="index in 2" :key="index" @mouseover="showFilterTab = filterList[index + 2].id; $emit('noEventMessage', filterList[index +2].noEventMessage)"
            @mouseleave="showFilterTab = 0"
            class="block px-4 py-3 text-sm text-gray-400 capitalize transition-colors duration-200 transform hover:bg-violet-600 hover:text-white ">
            {{ filterList[index + 2].name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

.dp123 {
    --dp-background-color: #f80808;
    --dp-text-color: #ffffff;
    --dp-hover-color: #484848;
    --dp-hover-text-color: #ffffff;
    --dp-hover-icon-color: #959595;
    --dp-primary-color: #3ef5b8;
    --dp-primary-text-color: #ffffff;
    --dp-secondary-color: #a9a9a9;
    --dp-border-color: #2d2d2d;
    --dp-menu-border-color: #2d2d2d;
    --dp-border-color-hover: #aaaeb7;
    --dp-disabled-color: #737373;
    --dp-scroll-bar-background: #212121;
    --dp-scroll-bar-color: #484848;
    --dp-success-color: #00701a;
    --dp-success-color-disabled: #428f59;
    --dp-icon-color: #959595;
    --dp-danger-color: #e53935;
}

.dp__theme_light {
    --dp-background-color: #f80808;
    --dp-text-color: #ffffff;
    --dp-hover-color: #484848;
    --dp-hover-text-color: #ffffff;
    --dp-hover-icon-color: #959595;
    --dp-primary-color: #3ef5b8;
    --dp-primary-text-color: #ffffff;
    --dp-secondary-color: #a9a9a9;
    --dp-border-color: #2d2d2d;
    --dp-menu-border-color: #2d2d2d;
    --dp-border-color-hover: #aaaeb7;
    --dp-disabled-color: #737373;
    --dp-scroll-bar-background: #212121;
    --dp-scroll-bar-color: #484848;
    --dp-success-color: #00701a;
    --dp-success-color-disabled: #428f59;
    --dp-icon-color: #959595;
    --dp-danger-color: #e53935;
}


.dp123 {
    --dp-background-color: #f80808;
    --dp-text-color: #ffffff;
    --dp-hover-color: #484848;
    --dp-hover-text-color: #ffffff;
    --dp-hover-icon-color: #959595;
    --dp-primary-color: #3ef5b8;
    --dp-primary-text-color: #ffffff;
    --dp-secondary-color: #a9a9a9;
    --dp-border-color: #2d2d2d;
    --dp-menu-border-color: #2d2d2d;
    --dp-border-color-hover: #aaaeb7;
    --dp-disabled-color: #737373;
    --dp-scroll-bar-background: #212121;
    --dp-scroll-bar-color: #484848;
    --dp-success-color: #00701a;
    --dp-success-color-disabled: #428f59;
    --dp-icon-color: #959595;
    --dp-danger-color: #e53935;
}

#dp {
    --dp-background-color: #f80808;
    --dp-text-color: #ffffff;
    --dp-hover-color: #484848;
    --dp-hover-text-color: #ffffff;
    --dp-hover-icon-color: #959595;
    --dp-primary-color: #3ef5b8;
    --dp-primary-text-color: #ffffff;
    --dp-secondary-color: #a9a9a9;
    --dp-border-color: #2d2d2d;
    --dp-menu-border-color: #2d2d2d;
    --dp-border-color-hover: #aaaeb7;
    --dp-disabled-color: #737373;
    --dp-scroll-bar-background: #212121;
    --dp-scroll-bar-color: #484848;
    --dp-success-color: #00701a;
    --dp-success-color-disabled: #428f59;
    --dp-icon-color: #959595;
    --dp-danger-color: #e53935;
}
</style>
