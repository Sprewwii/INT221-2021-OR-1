<script setup>
import BaseCategoryList from "../components/BaseCategoryList.vue"
import BaseScheduleList from "../components/BaseScheduleList.vue";
import iconPlus from "../components/icons/IconPlus.vue";
import { ref, computed } from "vue";
import { eventManager } from "../scripts/eventManager.js"

const eventCategories = computed(() => eventManager.eventCategories);

</script>

<template>
    <div class="ml-64">
        <h1 class="text-gray-300 text-2xl pt-16 mb-3 mr-8 ml-32 md:mx-16 lg:mx-32 font-medium select-none">
            Event Categories
        </h1>
        <div class="grid gap-10 grid-cols-3 ml-32 mr-24 mt-10">
            <div class="flex flex-col items-center block p-6 bg-white rounded-lg shadow-md text-center w-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                id="cards" v-for="eventCategory in eventCategories" :key="eventCategory.categoryId">
                <h5 class="text-xl font-semibold tracking-tight text-white text-center tracking-wider">{{ eventCategory.categoryName }}</h5>
            
                <p class="bg-violet-600 rounded-lg text-white text-center w-2/6 my-5 pt-1">{{ eventCategory.categoryDuration }} minutes</p>
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