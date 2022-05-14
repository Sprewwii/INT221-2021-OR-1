<script setup>
import iconClose from "./icons/IconClose.vue"
import { eventManager } from "../scripts/eventManager.js"
import { ref, computed } from "vue"
const props = defineProps({
    editingBooking: {
        type: Object,
        default: {}
    }
})

defineEmits(['editBooking', 'closeEditModal'])

const editingBooking = computed(() => {
    return {...props.editingBooking,startTime: String(props.editingBooking.startTime).substring(0, 16)}
})

// const formatDate = () => {
//     return String(editingBooking.value.startTime).substring(0, 16)
// }

// const startTime = computed(() => String(editingBooking.value.startTime).substring(0, 16))

</script>
 
<template>
    <div
        class="bg-black/30 z-40 h-screen w-full overflow-y-auto overflow-x-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 justify-center items-center">
        <div
            class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  relative p-4 w-full max-w-md h-full md:h-auto">
            <div class="relative rounded-lg shadow bg-gray-800">
                <button type="button" @click="$emit('closeEditModal')"
                    class="absolute top-3 right-2.5 text-gray-400 mt-2 mr-4 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                    <iconClose />
                </button>

                <div class="py-6 px-6 lg:px-8">
                    <h3 class="mb-4 text-2xl font-medium text-white">Edit Schedule Event</h3>
                    <form class="space-y-6">
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
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-300">Start Time</label>
                            <input v-model="editingBooking.startTime" type="datetime-local" name="email" id="email"
                                class="border text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                required="">
                        </div>
                        <div>
                            <label for="note" class="block mb-2 text-sm font-medium text-gray-300">Note</label>
                            <textarea v-model="editingBooking.note" maxlength="500" name="text" id="text"
                                class="border text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                placeholder="detail..."> </textarea>
                        </div>
                        <button @click="$emit('editBooking', {id:editingBooking.id,startTime: editingBooking.startTime,note: editingBooking.note}, $event)"
                            class="w-full text-white bg-pink-600 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">Update</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
 
<style>
</style>