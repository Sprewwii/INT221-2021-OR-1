<script setup>
import { ref, computed } from "vue"
import IconClose from "./icons/IconClose.vue"
import { eventManager } from "../scripts/eventManager.js"
import { validation } from "../scripts/validation.js"
import { decorator } from "../scripts/decorator.js"

const props = defineProps({
    editingBooking: {
        type: Object,
        default: {}
    }
})

defineEmits(['editBooking', 'closeEditModal'])

const editingBooking = computed(() => props.editingBooking)
const showWarning = ref({dateTimePast:false,dateTimeOverlap:false})

const validateDateTime = () => { 
showWarning.value.dateTimePast = validation.isPast(editingBooking.value.startTime) 
showWarning.value.dateTimeOverlap = validation.isOverlap(editingBooking.value)
}

const clearEditingBooking = () => { 
showWarning.value.dateTimePast = false 
showWarning.value.dateTimeOverlap = false 
}

</script>
<template>
    <div
        class="bg-black/30 z-40 h-screen w-full overflow-y-auto overflow-x-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 justify-center items-center">
        <div
            class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  relative p-4 w-full max-w-md sm:max-w-none sm:w-[760px] h-full md:h-auto">
            <div class="relative rounded-lg shadow" id="popupEdit">
                <button type="button" @click="$emit('closeEditModal')"
                    class="absolute top-3 right-2.5 text-gray-400 mt-2 mr-4 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                    <IconClose />
                </button>

                <div class="py-6 px-6 lg:px-8">
                    <h3 class="mb-4 text-2xl font-medium text-white">Edit Schedule Event</h3>
                    <div class="flex flex-col items-center">
                    <form class="w-full px-8 space-x-8 grid grid-cols-2 items-center">
                        <div class="flex flex-col w-full space-y-8">
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-300">Name</label>
                            <div
                                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 text-gray-400">
                                {{editingBooking.name}}
                            </div>
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-300">Email</label>
                            <div
                                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 text-gray-400">
                                {{editingBooking.email}}
                            </div>
                        </div>
                        <div>
                            <label for="category" class="block mb-2 text-sm font-medium text-gray-300">Choose Event
                                Category</label>
                            <div class="flex">
                                <div
                                    class="border text-sm rounded-lg block w-7/12 p-2.5 bg-gray-600 border-gray-500 text-gray-400">
                                    {{editingBooking.categoryName}}
                                </div>
                                <div
                                    class="ml-3 border text-sm rounded-lg block w-5/12 p-2.5 bg-gray-600 border-gray-500 text-gray-400">
                                    {{editingBooking.duration}} minutes
                                </div>
                            </div>
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-300">Start Time</label>
                        
                                <Datepicker v-model="editingBooking.startTime" :minDate="new Date()" dark
                            @blur="validateDateTime()" class="dp__theme_light" placeholder="Select Date" position="center" required/>    
                            <p v-if="showWarning.dateTimePast" class="text-sm text-red-400 absolute mt-1">* Please choose future dates.</p>
                            <p v-else-if="showWarning.dateTimeOverlap" class="text-sm text-red-400 absolute mt-1">* Please choose another time.</p>
            
                        </div>
                    </div>
                    <div class="flex flex-col w-full space-y-8">
                        <div>
                            <label for="note" class="block mb-2 text-sm font-medium text-gray-300">Note</label>
                            <textarea v-model="editingBooking.note" name="text" id="text"
                             :class="[validation.validateLength(editingBooking.note,500) ? decorator.normalFormBorder : decorator.redFormBorder]"
                                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 placeholder-gray-400 text-white"
                                placeholder="detail..."> </textarea>
                                   <div v-if="editingBooking.note" class="flex justify-end">
                                <p :class="{'text-red-400': !validation.validateLength(editingBooking.note,500)}" class="text-sm text-gray-500 absolute mt-1">{{editingBooking.note.length}}/500</p>    
                            </div>
                        </div>
                        </div>
                       
                    </form>
                    <button @click="$emit('editBooking', {id:editingBooking.id,startTime: editingBooking.currentStartTime == editingBooking.startTime ? null :  new Date(editingBooking.startTime).toISOString() ,note: editingBooking.note}, $event)"
                            class="w-[150px] text-white bg-violet-600 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-violet-600">Update</button>
                </div></div>
            </div>
        </div>
    </div>
</template>
 