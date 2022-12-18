<script setup>
import { computed } from "vue"
import IconMenuKebabVue from "../icons/IconMenuKebab.vue"
import IconDelete from "../icons/IconDelete.vue"
import IconEdit from "../icons/IconEdit.vue"

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

defineEmits(['selectCategory', 'editBooking'])

const selectedCategoryId = computed(() => props.selectedCategoryId)
</script>

<template>
  <div class="grid gap-10 grid-col content-center w-4/5 lg:grid-cols-3 lg:ml-32 sm:mr-24 sm:mt-6 sm:mb-32 mx-auto justify-center justify-self-center">
    <div
      class="block p-6 bg-managray-100/10 rounded-lg shadow-xl text-managray-100 text-center w-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
      id="cards" v-for="eventCategory in categoryList" :key="eventCategory.categoryId">
      <div class="flex flex-col items-center">
        <div class="grid grid-cols-7 gap-4">
          <h5
            class="text-xl font-[500] break-words w-full tracking-tight text-white text-center tracking-wider col-span-6 pl-10">
            {{
                eventCategory.categoryName
            }}</h5>
          <div class="inline-block relative w-full justify-end">
            <div class="flex justify-end">
              <button @click="$emit('selectCategory', eventCategory.categoryId)" class="px-2 py-1">
                <IconMenuKebabVue />
              </button>
            </div>
            <div class="flex justify-end w-full pt-3 ml-20">
              <ul class="absolute text-white z-10" v-show="selectedCategoryId === eventCategory.categoryId">
                <li>
                  <button
                    class="rounded bg-gray-500 hover:bg-gray-700 py-2 px-4 block whitespace-no-wrap w-full flex items-center flex z-50"
                    @click="$emit('editCategory', { ...eventCategory })">
                    <IconEdit class="mr-2" />Edit
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p class="bg-manapurple-100 rounded-lg text-white text-center w-[120px] my-5 py-0.5">{{
            eventCategory.categoryDuration
        }}
          minutess</p>
        <div class="flex flex-col items-center justify-center w-full h-full">
          <p v-if="!eventCategory.categoryDescription" class="font-normal text-managray-200">No Description</p>
          <p v-else class="font-normal text-managray-100 break-words w-full">{{ eventCategory.categoryDescription }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
 
<style>

</style>