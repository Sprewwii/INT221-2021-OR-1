<script setup>
import IconSuccess from "./icons/IconSuccess.vue"
import IconClose from "./icons/IconClose.vue"

const props = defineProps({
    popupText: {
        type: String,
        default: ""
    },
    popupType: {
        type: String,
        default: "success"
    }
})

defineEmits(['closePopup'])
</script>
 
<template>
    <div class="bg-black/70 z-40 h-screen w-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div
            class="overflow-y-auto overflow-x-hidden z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <div class="relative p-4 max-w-md h-full">
                <div class="relative w-96 rounded-lg shadow" id="popupConfirm">
                    <button type="button" @click="$emit('closePopup')"
                        class="absolute top-3 right-2.5 text-gray-400 mt-2 mr-2 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                        <IconClose/>
                    </button>
                    <div class="py-6 px-6 lg:px-8 text-white text-center flex flex-col justify-center items-center">
                        <IconSuccess v-if="popupType === 'success'"/>
                        <h3 class="text-3xl font-bold text-white mt-5">{{ popupText }}</h3>
                        <button @click="$emit('closePopup')"
                            class="w-2/6 mt-6 bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Ok</button>
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