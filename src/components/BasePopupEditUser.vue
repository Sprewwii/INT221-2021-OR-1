<script setup>
import { ref, computed } from "vue"
import IconClose from "./icons/IconClose.vue"
import { eventManager } from "../scripts/eventManager.js"
import { validation } from "../scripts/validation.js"
import { decorator } from "../scripts/decorator.js"
import {roles} from "../scripts/roles.js"

const props = defineProps({
    editingUser: {
        type: Object,
        default: {}
    }
})

defineEmits(['editingUser', 'closeEditModal'])

const editingUser = computed(() => props.editingUser)
// const showWarning = ref({dateTimePast:false,dateTimeOverlap:false})
const userName = editingUser.value.name
// const validateDateTime = () => { 
// showWarning.value.dateTimePast = validation.isPast(editingUser.value.startTime) 
// showWarning.value.dateTimeOverlap = validation.isOverlap(editingUser.value)
// }
// const username = ref("")
// const clearEditingUser = () => { 
// showWarning.value.dateTimePast = false 
// showWarning.value.dateTimeOverlap = false 
// }

</script>
<template>
    <div
        class="bg-black/30 z-40 h-screen w-full overflow-y-auto overflow-x-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 justify-center items-center">
        <div
            class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  relative p-4 w-full max-w-md h-full md:h-auto">
            <div class="relative rounded-lg shadow" id="popupEdit">
                <button type="button" @click="$emit('closeEditModal')"
                    class="absolute top-3 right-2.5 text-gray-400 mt-2 mr-4 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                    <IconClose />
                </button>

                <div class="py-6 px-6 lg:px-8">
                    <h3 class="mb-4 text-2xl font-medium text-white">Edit User</h3>
                    <form class="space-y-6">
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-300">Name</label>
                            <input v-model="editingUser.name"
                                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 text-white" >
                                <!-- <p v-show="editingUser.name == userName">ควย</p> -->
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-300">Email</label>
                            <input class="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 text-white"  v-model="editingUser.email">  
                        </div>
                        <div>
                            <label for="role" class="block mb-3 text-sm font-medium text-neutral-300">Role</label>
                            <div class="flex">
                                <select 
                                    v-model="editingUser.role"
                                    class="text-white bg-neutral-700 border border-neutral-700 hover:bg-neutral-800 focus:outline-none focus:ring-violet-300 focus:border-violet-500 rounded-lg text-sm text-left inline-flex items-center">
                                    <option value="" selected disabled hidden></option>
                                    <option :value="role" v-for="(role, index) in roles"
                                        :key="index">
                                        {{ role }}
                                    </option>
                                </select>
                            </div>

                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-300">Inserted On</label>
                        <div class="flex">
                            <div
                                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 text-gray-400">
                                {{editingUser.createdOn}}
                            </div>
                        </div>
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-300">Updated On</label>
                        <div class="flex">
                            <div
                                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 text-gray-400">
                                {{editingUser.createdOn}}
                            </div>
                        </div>
                        </div>
                        
                        <button @click="$emit('editingUser', {userId:editingUser.userId, name: editingUser.name, email: editingUser.email, role: editingUser.role}, $event)"
                            class="w-full text-white bg-violet-600 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-violet-600">Update</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
 