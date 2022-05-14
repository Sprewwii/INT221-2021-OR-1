<script setup>
import iconClose from "./icons/IconClose.vue"
import { eventManager } from "../scripts/eventManager.js"
import { ref, computed } from "vue"
const props = defineProps({
    eventCategories: {
        type: Array,
        default: []
    }
})

defineEmits(['createBooking', 'closeCreateModal'])



const creatingBooking = ref({})
const showWarningCreate = ref(false)
const showWarningEmail = ref(false)

const validateEmail = () => {
    if (creatingBooking.value.email && creatingBooking.value.email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
        showWarningEmail.value = false
    } else {
        showWarningEmail.value = true
    }
}

const validateBooking = () => {
    if(creatingBooking.value.name && creatingBooking.value.email && creatingBooking.value.category && creatingBooking.value.startTime && !showWarningEmail.value){
        return true;
    }else{
        showWarningCreate.value= true
        return false;
    }
}

const clearCreatingBooking = () => {
    showWarningEmail.value = false
    showWarningCreate.value= false
    creatingBooking.value = {}
}


</script>
 
<template>
    <div
        class="bg-black/30 z-40 h-screen w-full overflow-y-auto overflow-x-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 justify-center items-center">
        <div
            class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  relative p-4 w-full max-w-md h-full md:h-auto">
            <div class="relative rounded-lg shadow bg-gray-800">
                <button type="button" @click="$emit('closeCreateModal'); clearCreatingBooking()"
                    class="absolute top-3 right-2.5 text-gray-400 mt-2 mr-4 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                    <iconClose />
                </button>

                <div class="py-6 px-6 lg:px-8">
                    <h3 class="mb-4 text-2xl font-medium text-white">Create Schedule Event</h3>
                    <form class="space-y-6">
                        <div>
                            <label for="name" class="block mb-3 text-sm font-medium text-gray-300">Name</label>
                            <input v-model="creatingBooking.name" maxlength="100" type="text" name="name" id="name"
                                class="border text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                placeholder="Example OR-1" required/>
                        </div>
                        <div>
                            <label for="email" class="block mb-3 text-sm font-medium text-gray-300">Email</label>
                            <input v-model="creatingBooking.email" maxlength="50" type="email" name="email" id="email"
                                class="border text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                placeholder="Example@mail.kmutt.ac.th" required=""
                                @blur="validateEmail"
                               >
                            <p v-show="showWarningEmail" class="text-sm text-red-400 absolute mt-1">* Email must be a valid email address</p>

                        </div>
                        <div>
                            <label for="category" class="block mb-3 text-sm font-medium text-gray-300">Choose Event
                                Category</label>
                            <div class="flex">
                                <select v-model="creatingBooking.category"
                                    class="text-white bg-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-pink-300 focus:border-pink-500 rounded-lg text-sm text-left inline-flex items-center">
                                    <option value="" selected disabled hidden></option>
                                    <option :value="eventCategory" v-for="(eventCategory, index) in eventCategories"
                                        :key="index">
                                        {{ eventCategory.categoryName }}
                                    </option>
                                </select>
                                <div
                                    class="ml-3 border text-sm rounded-lg block w-3/4 p-2.5 bg-gray-600 border-gray-500 text-white">
                                    <p v-if="!creatingBooking.category" class="text-gray-400">duration</p>
                                    <p v-else class="select-none">{{ creatingBooking.category.categoryDuration }} minutes
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label for="email" class="block mb-3 text-sm font-medium text-gray-300">Start Time</label>
                            <!-- <input v-model="creatingBooking.startTime" type="datetime-local" name="email" id="email"
                                class="border text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                required="" min="2022-05-14T20:30"> -->

                            <Datepicker v-model="creatingBooking.startTime" :minDate="new Date()" :minTime="{ hours: 11, minutes: 30 }" class="dp__theme_light" position="center" required/>    
                        </div>
                        <div>
                            <label for="note" class="block mb-3 text-sm font-medium text-gray-300">Note</label>
                            <textarea v-model="creatingBooking.note" maxlength="500" name="text" id="text"
                                class="border mb-4 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                placeholder="detail..."> </textarea>
                        </div>
                        <p v-show="showWarningCreate" class="text-sm text-red-400 absolute bottom-20">* Please fill out the form completely.</p>
                        <button type="button" @click="if(validateBooking()) { $emit('createBooking', creatingBooking, $event); clearCreatingBooking();}"
                            class="w-full text-white bg-pink-600 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">Create</button>
                     
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
 <!-- $emit('createBooking', creatingBooking, $event) -->
<style>
.dp__theme_light {
    --dp-background-color: #212121;
    --dp-text-color: #ffffff;
    --dp-hover-color: #484848;
    --dp-hover-text-color: #ffffff;
    --dp-hover-icon-color: #959595;
    --dp-primary-color: #005cb2;
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