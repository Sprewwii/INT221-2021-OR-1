<script setup>
import { ref, computed } from "vue"
import IconClose from "./icons/IconClose.vue"
import { userManager } from "../scripts/userManager.js"
import { validation } from "../scripts/validation.js"
import { decorator } from "../scripts/decorator.js"
import {roles} from "../scripts/roles.js"

const emit = defineEmits(['closeCreateModal', 'showPopupSuccess'])

const creatingBooking = ref({})
const showWarning = ref({ isName: false, isEmail: false, isRole: false, isStartTime: false, create: false, email: false, dateTimePast: false, dateTimeOverlap: false })

const validateEmail = () => {
    showWarning.value.email = !validation.isEmail(creatingBooking.value.email)
}

const validateDateTime = () => {
    if (!creatingBooking.value.startTime) return;
    showWarning.value.dateTimePast = validation.isPast(creatingBooking.value.startTime)
    showWarning.value.dateTimeOverlap = validation.isOverlap(creatingBooking.value)
}

const createBooking = (e) => {
    validateDateTime();
    e.preventDefault();
    showWarning.value.create = false
    if (!creatingBooking.value.name) showWarning.value.isName = true
    if (!creatingBooking.value.email) showWarning.value.isEmail = true
    if (!creatingBooking.value.role) showWarning.value.isRole = true


    for (let warning in showWarning.value) {
        if (warning != "create" && showWarning.value[warning] === true) {
            showWarning.value.create = true
        }
    }

    if (!showWarning.value.create && (creatingBooking.value.name.length > 100 || creatingBooking.value.email.length > 50)) {
        showWarning.value.create = true
    }

    if (!showWarning.value.create) {
        userManager.createUser(creatingBooking.value)
            clearCreatingBooking()
        
        
    }
};

const clearCreatingBooking = () => {
    showWarning.value = { isName: false, isEmail: false, isRole: false, create: false, email: false}
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
                    class="absolute top-3 right-2.5 text-neutral-400 mt-2 mr-4 bg-transparent hover:bg-neutral-200 hover:text-neutral-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                    <IconClose />
                </button>

                <div class="py-6 px-6 lg:px-8 ">
                    <h3 class="mb-4 text-2xl font-medium text-white">Create New User</h3>
                    <form class="space-y-8">
                        <div>
                            <label for="name" class="block mb-3 text-sm font-medium text-neutral-300">Name</label>
                            <input v-model="creatingBooking.name" type="text" name="name" id="name"
                                :class="[validation.validateLength(creatingBooking.name, 100) && !showWarning.isName ? decorator.normalFormBorder : decorator.redFormBorder]"
                                class="text-sm rounded-lg block w-full p-2.5 bg-neutral-700 border placeholder-neutral-400 text-white"
                                placeholder="Example OR-1" @blur="showWarning.isName = !creatingBooking.name" />
                            <p v-show="showWarning.isName" class="text-sm text-red-400 absolute mt-1">* Enter your name.
                            </p>
                            <div v-if="creatingBooking.name" class="flex justify-end">
                                <p :class="{ 'text-red-400': !validation.validateLength(creatingBooking.name, 100) }"
                                    class="text-sm text-gray-500 absolute mt-1">{{ creatingBooking.name.length }}/100</p>
                            </div>
                        </div>
                        <div>
                            <label for="email" class="block mb-3 text-sm font-medium text-neutral-300">Email</label>
                            <input v-model="creatingBooking.email" name="email" id="email" type="text"
                                :class="[validation.validateLength(creatingBooking.email, 100) && !showWarning.isEmail && !showWarning.email ? decorator.normalFormBorder : decorator.redFormBorder]"
                                class="text-sm rounded-lg block w-full p-2.5 bg-neutral-700 border placeholder-neutral-400 text-white"
                                placeholder="Example@mail.kmutt.ac.th"
                                @blur="showWarning.isEmail = !creatingBooking.email; validateEmail()" />
                            <p v-if="showWarning.isEmail" class="text-sm text-red-400 absolute mt-1">* Enter your email.
                            </p>
                            <p v-else-if="showWarning.email" class="text-sm text-red-400 absolute mt-1">* Email must be
                                a valid email address.</p>
                            <div v-if="creatingBooking.email" class="flex justify-end">
                                <p :class="{ 'text-red-400': !validation.validateLength(creatingBooking.email, 100) }"
                                    class="text-sm text-gray-500 absolute mt-1">{{ creatingBooking.email.length }}/100</p>
                            </div>
                        </div>
                        <div>
                            <label for="role" class="block mb-3 text-sm font-medium text-neutral-300">Role</label>
                            <div class="flex">
                                <select @change="showWarning.isRole = !creatingBooking.role"
                                    v-model="creatingBooking.role"
                                    class="text-white bg-neutral-700 border border-neutral-700 hover:bg-neutral-800 focus:outline-none focus:ring-violet-300 focus:border-violet-500 rounded-lg text-sm text-left inline-flex items-center">
                                    <option value="" selected disabled hidden></option>
                                    <option :value="role" v-for="(role, index) in roles"
                                        :key="index">
                                        {{ role }}
                                    </option>
                                </select>
                            </div>
                            <p v-if="showWarning.isRole" class="text-sm text-red-400 absolute mt-1">* Choose your role.</p>
                        </div>
                
                        <button type="button"
                            class="w-full text-white bg-violet-600 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            @click="createBooking($event); !showWarning.create ? $emit('showPopupSuccess') : ''">Create</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
#popupCreate {
    background-color: #292B2E;
}

#inputeiei {
    background-color: #3c6eb9;
}
</style>