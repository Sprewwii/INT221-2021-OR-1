<script setup>
import { ref, computed } from "vue"
import IconClose from "./icons/IconClose.vue"
import { eventManager } from "../scripts/eventManager.js"
import { userManager } from "../scripts/userManager.js"
import { validation } from "../scripts/validation.js"
import { decorator } from "../scripts/decorator.js"
import {roles} from "../scripts/roles.js"

const props = defineProps({
    editingUser: {
        type: Object,
        default: {}
    }
})

defineEmits(['editUser', 'closeEditModal'])
const showWarning = ref({ isName: false, isEmail: false, edit: false, email: false, isNameNotUnique: false, isEmailNotUnique: false })
const editingUser = computed(() => userManager.selectedUser)
// const editingUser = computed(() => props.editingUser)

const userName = editingUser.value.name


const validateEmail = () => {
    showWarning.value.email = !validation.isEmail(editingUser.value.email)
}

const validateUniqueName = () => {
    showWarning.value.isNameNotUnique = !validation.validateUniqueName(editingUser.value) && editingUser.value.name != editingUser.value.currentName
}

const validateUniqueEmail = () => {
    showWarning.value.isEmailNotUnique = !validation.validateUniqueEmail(editingUser.value) && editingUser.value.email != editingUser.value.currentEmail
}

const saveEditingUser = () => {

    showWarning.value.edit = false
 if (!editingUser.value.name) showWarning.value.isName = true
    if (!editingUser.value.email) showWarning.value.isEmail = true

for (let warning in showWarning.value) {
        if (warning != "edit" && showWarning.value[warning] === true) {
            showWarning.value.edit = true
        }
    }

     if (!showWarning.value.edit && (editingUser.value.name.length > 100 || editingUser.value.email.length > 50)) {
        showWarning.value.edit = true
    }

    if (!showWarning.value.edit) {
        const user = {userId:editingUser.value.userId,...(editingUser.value.name !== editingUser.value.currentName&&{name: editingUser.value.name}),...(editingUser.value.email !== editingUser.value.currentEmail&&{email: editingUser.value.email}),...(editingUser.value.role !== editingUser.value.currentRole&&{role: editingUser.value.role})}
        return Object.keys(user).length > 1 ? user : null
    }

    
}

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
                            <input v-model="editingUser.name" @blur="editingUser.name = editingUser.name.trim(); showWarning.isName = !editingUser.name;validateUniqueName(); "
                                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 text-white" >
                            <div v-if="editingUser.name" class="flex justify-end">
                                 
                                <p :class="{ 'text-red-400': !validation.validateLength(editingUser.name, 100) }"
                                    class="text-sm text-gray-500 absolute mt-1">{{ editingUser.name.length }}/100</p>
                            </div>
                            <p v-show="showWarning.isName" class="text-sm text-red-400 absolute mt-1">* Enter your name.
                            </p>
                               <p v-show="showWarning.isNameNotUnique" class="text-sm text-red-400 absolute mt-1">* Name
                                must be unique.
                            </p>
                        </div>
                               
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-300">Email</label>
                            <input class="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 text-white" v-model="editingUser.email" @blur="editingUser.email = editingUser.email.trim(); showWarning.isEmail = !editingUser.email;validateEmail();validateUniqueEmail();">  
                           <div v-if="editingUser.email" class="flex justify-end">
                                 
                                <p :class="{ 'text-red-400': !validation.validateLength(editingUser.email, 50) }"
                                    class="text-sm text-gray-500 absolute mt-1">{{ editingUser.email.length }}/50</p>

                                
                            </div>
                            <p v-if="showWarning.isEmail" class="text-sm text-red-400 absolute mt-1">* Enter your Email.
                            </p>
                            <p v-else-if="showWarning.email" class="text-sm text-red-400 absolute mt-1">* Email must be
                                a valid email address.</p>
                                 <p v-else-if="showWarning.isEmailNotUnique" class="text-sm text-red-400 absolute mt-1">*
                                Email must be
                                unique.</p>
                        </div>
                      

                         <div>
                            <label for="role" class="block text-sm font-medium text-neutral-300">
                                <span>Role</span></label>
                            <span class="text-gray-500 text-xs">If you didn't select any role. Your role will be a student.</span>

                            <div class="grid grid-cols-3 gap-8 mt-3">
                                <div @click="editingUser.role = role" v-for="(role, index) in roles" :key="index">
                                    
                                    <label
                                    :class="editingUser.role == role ? 'border-violet-400 ring-1 ring-violet-400 bg-violet-400 text-gray-800' : ''"
                                        class="hover:bg-violet-500  bg-neutral-700 block p-4 text-sm font-medium text-white text-center transition-colors border border-gray-500 rounded-lg shadow-sm cursor-pointer"
                                        for="standard_alt">
                                        <span> {{role}} </span>

                                    </label>

                                </div>

                        
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
                        <!-- -->
                        <button @click="$emit('editUser', saveEditingUser(), $event)"
                            class="w-full text-white bg-violet-600 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-violet-600">Update</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
 