<script setup>
import IconWarning from "../icons/IconWarning.vue"
import IconClose from "../icons/IconClose.vue"

const props = defineProps({
    popupMessage: {
        type: Object,
        default: {}
    },
})

defineEmits(['closeConfirmModal', 'deleteBooking'])
</script>
 
<template>
    <div class="bg-black/70 z-40 h-screen w-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div
            class=" overflow-y-auto overflow-x-hidden z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <div class="relative p-4 w-full max-w-md h-full">
                <div class="relative rounded-lg shadow" id="popupConfirm">
                    <button type="button" @click="$emit('closeConfirmModal')"
                        class="absolute top-3 right-2.5 text-gray-400 mt-2 mr-2 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                        <IconClose />
                    </button>
                    <div class="py-6 px-6 lg:px-8 text-white text-center flex flex-col justify-center items-center">
                        <IconWarning />
                        <h3 class="text-3xl font-bold text-white mt-5">{{ popupMessage.header }}</h3>
                        <p class="text-gray-400">{{popupMessage.text}}</p>

                        <div class="flex mt-5 justify-evenly w-full">
                            <button @click="$emit('closeConfirmModal')"
                                class="w-2/6 bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Cancel</button>
                            <button @click="$emit('deleteBooking')"
                                class="w-2/6 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Confirm</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
 
<style>
#popupConfirm {
    background-color: #292B2E;
}
</style>