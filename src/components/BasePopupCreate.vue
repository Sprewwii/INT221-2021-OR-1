<script setup>
import iconClose from "./icons/IconClose.vue"
import { eventManager } from "../scripts/eventManager.js"
import { validation } from "../scripts/validation.js"
import { decorator } from "../scripts/decorator.js"
import { ref, computed } from "vue"
defineEmits(['closeCreateModal'])

const eventCategories = computed(() => eventManager.eventCategories);
const creatingBooking = ref({})
const showWarning = ref({isName:false,isEmail:false,isCategory:false,isStartTime:false,create:false,email:false,dateTimePast:false,dateTimeOverlap:false})

const validateEmail = () => {
    showWarning.value.email = !validation.isEmail(creatingBooking.value.email)
}

const validateDateTime = () => {
    if(!creatingBooking.value.startTime) return;
    showWarning.value.dateTimePast = validation.isPast(creatingBooking.value.startTime)
    showWarning.value.dateTimeOverlap = validation.isOverlap(creatingBooking.value)
}

const createBooking = (e) => {
    e.preventDefault();
    showWarning.value.create = false
    if(!creatingBooking.value.name)  showWarning.value.isName = true
    if(!creatingBooking.value.email)  showWarning.value.isEmail = true
    if(!creatingBooking.value.category)  showWarning.value.isCategory = true
    if(!creatingBooking.value.startTime)  showWarning.value.isStartTime = true

    for (let warning in showWarning.value) {
  if(warning != "create" && showWarning.value[warning] === true){
        console.log(`${warning}: ${showWarning.value[warning]}`);
        showWarning.value.create = true
  }
}

if(!showWarning.value.create && (creatingBooking.value.name.length > 100 || creatingBooking.value.email.length > 50 || creatingBooking.value.note && creatingBooking.value.note.length > 500) ) 
{showWarning.value.create = true
console.log("error")
}

if(!showWarning.value.create){
  eventManager.createEvent(creatingBooking.value);
  clearCreatingBooking()
}

//      if(creatingBooking.value.name && creatingBooking.value.email && creatingBooking.value.category && creatingBooking.value.startTime && !showWarning.value.email && !showWarning.value.dateTimePast && !showWarning.value.dateTimeOverlap){
// e.preventDefault();
//   eventManager.createEvent(creatingBooking.value);
//   clearCreatingBooking()
// //   toggleCreateModal();
//      }else{
//          showWarning.value.create = true
//      }
};

const clearCreatingBooking = () => {
    showWarning.value = {isName:false,isEmail:false,isCategory:false,isStartTime:false,create:false,email:false,dateTimePast:false,dateTimeOverlap:false}
    // showWarning.value.email = false
    //  showWarning.value.create= false
    // showWarning.value.dateTimePast = false
    creatingBooking.value = {}
}



</script>
 
<template>
    <div
        class="bg-black/70 z-40 h-screen w-full overflow-y-auto overflow-x-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 justify-center items-center">
        <div
            class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  relative p-4 w-full max-w-md h-full md:h-auto">
            <div class="relative rounded-lg shadow" id="popupCreate">
                <button type="button" @click="$emit('closeCreateModal'); clearCreatingBooking()"
                    class="absolute top-3 right-2.5 text-neutral-400 mt-2 mr-4 bg-transparent hover:bg-neutral-200 hover:text-neutral-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-neutral-800">
                    <iconClose />
                </button>

                <div class="py-6 px-6 lg:px-8 ">
                    <h3 class="mb-4 text-2xl font-medium text-white">Create Schedule Event {{validation.validateLengthAndNotNull(creatingBooking.name,10)}}</h3>
                    <form class="space-y-8">
                        <div>
                            <label for="name" class="block mb-3 text-sm font-medium text-neutral-300">Name</label>
                            <input v-model="creatingBooking.name" type="text" name="name" id="name"
                             :class="[validation.validateLength(creatingBooking.name,100) && !showWarning.isName ? decorator.normalFormBorder : decorator.redFormBorder]"
                                class="text-sm rounded-lg block w-full p-2.5 bg-neutral-700 border placeholder-neutral-400 text-white"
                                placeholder="Example OR-1" @blur="showWarning.isName = !creatingBooking.name"/>
                             <p v-show="showWarning.isName" class="text-sm text-red-400 absolute mt-1">* Enter your name.</p>
                              <div v-if="creatingBooking.name" class="flex justify-end">
                                <p :class="{'text-red-400': !validation.validateLength(creatingBooking.name,100)}" class="text-sm text-gray-500 absolute mt-1">{{creatingBooking.name.length}}/100</p>    
                            </div>
                        </div>
                        <div>
                            <label for="email" class="block mb-3 text-sm font-medium text-neutral-300">Email</label>
                            <input v-model="creatingBooking.email" name="email" id="email" type="text"
                              :class="[validation.validateLength(creatingBooking.email,50) && !showWarning.isEmail && !showWarning.email ? decorator.normalFormBorder : decorator.redFormBorder]"
                                class="text-sm rounded-lg block w-full p-2.5 bg-neutral-700 border placeholder-neutral-400 text-white"
                                placeholder="Example@mail.kmutt.ac.th"
                                @blur="showWarning.isEmail = !creatingBooking.email; validateEmail()"/>
                            <p v-if="showWarning.isEmail" class="text-sm text-red-400 absolute mt-1">* Enter your email.</p>
                            <p v-else-if="showWarning.email" class="text-sm text-red-400 absolute mt-1">* Email must be a valid email address.</p>
                            <div v-if="creatingBooking.email" class="flex justify-end">
                                <p :class="{'text-red-400': !validation.validateLength(creatingBooking.email,50)}" class="text-sm text-gray-500 absolute mt-1">{{creatingBooking.email.length}}/50</p>    
                            </div>
                        </div>
                    
                        <div>
                            <label for="category" class="block mb-3 text-sm font-medium text-neutral-300">Choose Event Category</label>
                            <div class="flex">
                                <select @change="validateDateTime();showWarning.isCategory = !creatingBooking.category" v-model="creatingBooking.category"
                                    class="text-white bg-neutral-700 border border-neutral-700 hover:bg-neutral-800 focus:outline-none focus:ring-violet-300 focus:border-violet-500 rounded-lg text-sm text-left inline-flex items-center">
                                    <option value="" selected disabled hidden></option>
                                    <option :value="eventCategory" v-for="(eventCategory, index) in eventCategories"
                                        :key="index">
                                        {{ eventCategory.categoryName }}
                                    </option>
                                </select>
                                <div
                                    class="ml-3 border text-sm rounded-lg block w-3/4 p-2.5 bg-neutral-700 border border-neutral-700 text-white">
                                    <p v-if="!creatingBooking.category" class="text-neutral-400">duration</p>
                                    <p v-else class="select-none">{{ creatingBooking.category.categoryDuration }} minutes
                                    </p>
                                </div>
                                
                            </div>
                            <p v-if="showWarning.isCategory" class="text-sm text-red-400 absolute mt-1">* Enter your event category.</p>
                        </div>
                        <div>
                            <label class="block mb-3 text-sm font-medium text-neutral-300">Start Time</label>
                            <!-- <input v-model="creatingBooking.startTime" type="datetime-local" name="email" id="email"
                                class="border text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 bg-neutral-600 border-neutral-500 placeholder-neutral-400 text-white"
                                required="" min="2022-05-14T20:30"> -->

<!-- :minTime="{ hours: new Date().getHours(), minutes: new Date().getMinutes()+1 }" -->
                            <Datepicker v-model="creatingBooking.startTime" :minDate="new Date()" 
                            @blur="validateDateTime();  showWarning.isStartTime = !creatingBooking.startTime" class="dp__theme_light" placeholder="Select Date" position="center" required/>    
                            <p v-if="showWarning.isStartTime" class="text-sm text-red-400 absolute mt-1">* Enter your event start time.</p>
                            <p v-else-if="showWarning.dateTimePast" class="text-sm text-red-400 absolute mt-1">* Please choose future dates.</p>
                            <p v-else-if="showWarning.dateTimeOverlap" class="text-sm text-red-400 absolute mt-1">* Please choose another time.</p>
                        </div>
                        <div>
                            <label for="note" class="block mb-3 text-sm font-medium text-neutral-300">Note</label>
                            <textarea v-model="creatingBooking.note" name="text" id="text"
                                  :class="[validation.validateLength(creatingBooking.note,500) ? decorator.normalFormBorder : decorator.redFormBorder]"
                                class="text-sm rounded-lg block w-full p-2.5 bg-neutral-700 border placeholder-neutral-400 text-white"
                                placeholder="detail..."> </textarea>
                            <div v-if="creatingBooking.note" class="flex justify-end">
                                <p :class="{'text-red-400': !validation.validateLength(creatingBooking.note,500)}" class="text-sm text-gray-500 absolute mt-1">{{creatingBooking.note.length}}/500</p>    
                            </div>
                        </div>
                    
                        <button type="button" 
                            class="w-full text-white bg-violet-600 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
                              @click="createBooking($event); !showWarning.create ? $emit('closeCreateModal') : ''">Create</button>
                     <!-- ; clearCreatingBooking() -->
                     <!-- validateBooking() ? $emit('createBooking', creatingBooking, $event) : '' -->
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

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
#popupCreate {
    background-color: #292B2E;
}

#inputeiei {
    background-color: #3c6eb9;
}
</style>