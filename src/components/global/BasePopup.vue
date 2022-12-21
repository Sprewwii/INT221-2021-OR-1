<script setup>
import IconSuccess from "../icons/IconSuccess.vue"
import IconClose from "../icons/IconClose.vue"

const props = defineProps({
    popupMessage: {
        type: Object,
        default: {}
    },
})

defineEmits(['closePopup'])
</script>
 
<template>
    <div class="bg-black/60 z-[51] h-full w-full fixed  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div
            class="overflow-y-hidden overflow-x-hidden z-[51] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <div class="relative p-4 h-full">
                <div class="relative w-[500px] py-6 rounded-lg shadow bg-managray-100/10 backdrop-blur-md">
                    <button type="button" @click="$emit('closePopup')"
                        class="absolute top-3 right-2.5 text-gray-400 mt-2 mr-2 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                        <IconClose />
                    </button>
                    <div class="py-6 px-6 lg:px-8 text-white text-center flex flex-col justify-center items-center">

                        <div v-if="popupMessage.type === 'success'"
                            class="gap-y-2 text-white text-center flex flex-col justify-center items-center">
                            <IconSuccess />
                            <h3 class="text-3xl font-bold text-white mt-5">{{ popupMessage.text }} </h3>
                        </div>
                        <div v-else-if="popupMessage.type === 'error'"
                            class="gap-y-2 text-white text-center flex flex-col justify-center items-center">
                            <h3 class="text-3xl font-bold text-white mt-5">{{ popupMessage.header }} Failed !</h3>
                            <p class="text-xl font-bold text-white mt-5">{{ popupMessage.text }}</p>
                        </div>

                        <button @click="$emit('closePopup')"
                            class="w-2/6 mt-6 bg-manapurple-100 focus:ring-4 focus:outline-none focus:ring-manapurple-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Ok</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
