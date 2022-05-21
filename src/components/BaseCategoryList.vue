<script setup>
import { ref, computed } from "vue"
import iconMenuKebabVue from "./icons/IconMenuKebab.vue";
import iconDelete from "./icons/IconDelete.vue";
import iconEdit from "./icons/IconEdit.vue";

const props = defineProps({
  categoryList: {
    type: Array,
    default: []
  },
  selectedCategoryId: {
    type: Number,
    default: 0
  },
})

defineEmits(['selectCategory','editBooking'])

const selectedCategoryId = computed(() => props.selectedCategoryId)


</script>
 
<template>

  <div class="grid gap-10 grid-cols-3 ml-32 mr-24 mt-6">
    <div
      class="block p-6 bg-white rounded-lg shadow-md text-gray-400 text-center w-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
      id="cards" v-for="eventCategory in categoryList" :key="eventCategory.categoryId">
      <div class="w-full inline-block relative">
        <div class="flex items-end justify-end z-50">
          <button @click="$emit('selectCategory', eventCategory.categoryId)" class="">
            <iconMenuKebabVue />
          </button>
        </div>
        <div class="absolute left-16">
        <ul class="text-white pt-2 z-40"
          v-show="selectedCategoryId === eventCategory.categoryId">
          <li>
            <button
              class="rounded bg-gray-500 hover:bg-gray-700 py-2 px-4 block whitespace-no-wrap w-full flex items-center flex z-50"
              @click="$emit('editCategory',{...eventCategory})">
              <iconEdit class="mr-2" />Edit
            </button>
          </li>
          


        </ul>
        </div>
      </div>
      <div class="flex flex-col items-center">
        <h5 class="text-xl font-semibold tracking-tight text-white text-center tracking-wider">{{
            eventCategory.categoryName
        }}</h5>

        <p class="bg-violet-600 rounded-lg text-white text-center w-1/2 my-5 pt-1">{{ eventCategory.categoryDuration }}
          minutes</p>
        <div class="flex flex-col items-center justify-center w-full h-full">
          <p v-if="eventCategory.categoryDescription == null" class="font-normal text-gray-500">No Description</p>
          <p v-else class="font-normal text-gray-300">{{ eventCategory.categoryDescription }}</p>
        </div>
      </div>
    </div>
  </div>

</template>
 
<style>
</style>