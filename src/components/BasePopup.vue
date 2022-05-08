<script setup>
import iconPlus from "./icons/IconPlus.vue"
import iconClose from "./icons/IconClose.vue"
import iconArrowDown from "./icons/IconArrowDown.vue";
import { eventManager } from "../scripts/eventManager.js"
import { ref, computed } from "vue"
const props = defineProps({
    eventCategories: {
        type: Array,
        default: []
    }
})

const addingEvent = {
     name: 'booking.name',
        email: 'booking.email',
        startTime: "2022-05-23T13:30:00.000+07:00",
        categoryId: 1,
        duration: 30,
        note: 'note',
}
const selectedEventCategory = ref("")
</script>
 
<template>
    <button class="mr-32 mb-32 absolute bottom-0 right-0" data-modal-toggle="create-event-modal">
        <iconPlus />
    </button>
    <button class="text-white" @click="eventManager.createEvent(addingEvent)">addd</button>
    <div id="create-event-modal" tabindex="-1" aria-hidden="true"
        class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center">

        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
            <div class="relative rounded-lg shadow bg-gray-800">
                <button type="button"
                    class="absolute top-3 right-2.5 text-gray-400 mt-2  bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-toggle="create-event-modal">
                    <iconClose />
                </button>

                <div class="py-6 px-6 lg:px-8">
                    <h3 class="mb-4 text-xl font-medium text-white">Create Schedule Event</h3>



                    <form class="space-y-6" action="#">
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-300">Name</label>
                            <input type="text" name="name" id="name"
                                class="border text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                placeholder="Example OR-1" required="">
                        </div>




                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-300">Email</label>
                            <input type="email" name="email" id="email"
                                class="border text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                placeholder="Example@mail.kmutt.ac.th" required="">
                        </div>
<div>
  <label for="email" class="block mb-2 text-sm font-medium text-gray-300">Choose Event Category</label>
  <div class="flex">
  <select v-model="selectedEventCategory" class="text-white bg-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-pink-300 focus:border-pink-500 rounded-lg text-sm text-left inline-flex items-center">
    <option value="" selected disabled hidden ></option>
    <option :value="eventCategory" v-for="(eventCategory, index) in eventCategories" :key="index">
    {{ eventCategory.categoryName }}
    </option>
  </select>
  
  <div class="ml-3 border text-sm rounded-lg block w-3/4 p-2.5 bg-gray-600 border-gray-500 text-white">
                                <p v-if="!selectedEventCategory" class="text-gray-400">duration</p>
                                <p v-else class="select-none">{{selectedEventCategory.categoryDuration}} minutes</p>
                                </div>
</div></div>

<div>
                            <label for="note" class="block mb-2 text-sm font-medium text-gray-300">Note</label>
                            <textarea maxlength="500" name="text" id="text"
                                class="border text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                placeholder="detail..."> </textarea>
                        </div>



                        <button type="submit"
                            class="w-full text-white bg-pink-600 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">Create</button>

                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
 
<style>
</style>