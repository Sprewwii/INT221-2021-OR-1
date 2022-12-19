<script setup>
import { ref, computed,watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { eventManager} from "../../scripts/eventManager";
import IconArrowLeft from "../icons/IconArrowLeft.vue"

let { params } = useRoute()

const props = defineProps({
    eventDetail: {
        type: Object,
        default: {}
    },
})


function getFileNameFromPath(path){ return path.replace(/^.*[\\\/]/, '')}

async function downloadFile() {
    const file = await eventManager.getEventFileById(params.id)

    const url = window.URL.createObjectURL(file)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url

    // dowmload file
    a.download = getFileNameFromPath(props.eventDetail.pathFile)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
}
</script>
<template>
    <div class="relative overflow-x-auto shadow-2xl rounded-lg mx-8 lg:ml-24">
        <div class="text-white rounded-lg bg-managray-300/20">
            <div v-if="props.eventDetail" class=" flex flex-col items-center">
                <div class="mt-16 flex flex-col items-center">
        
                    <div
                        class="text-manapink-100 border border-manapink-100 rounded-lg text-base lg:text-lg text-center break-words flex justify-center items-center">
                        <span class="px-6">
                            {{ props.eventDetail.name }}
                        </span>
                        <div class="bg-manapink-100 text-managray-400 px-6 py-3 rounded-r-lg">
                            <button v-if="props.eventDetail.pathFile" @click="downloadFile" class="text-gray-900 rounded-3xl p-2">{{
                                    getFileNameFromPath(props.eventDetail.pathFile)
                            }}</button>
                               <p v-else class="text-sm">No File</p>
                        </div>
                     
                    </div>
                    <p class="font-[200] text-center mt-3">{{ props.eventDetail.email }}</p>
                </div>
                <div class="flex flex-col items-center mt-8 lg:font-[200]">
                    <p class="text-managray-200 text-xs">EVENT</p>
                    <p class="text-manapurple-100 text-lg lg:text-2xl my-3 font-medium tracking-wider">
                        {{ props.eventDetail.categoryName }}
                    </p>
                    <div>
                        {{
                                new Date(props.eventDetail.startTime).toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })
                        }}
                        at
                        {{
                                new Date(props.eventDetail.startTime).toLocaleTimeString("it-IT", {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })
                        }}
                        <span class="text-managray-200">
                            ({{ props.eventDetail.duration }} minutes)</span>
                    </div>
                </div>
                <div class="text-white mt-10 text-center w-4/6">
                    <div v-if="props.eventDetail.note">
                        <p class="text-managray-200">note</p>
                        <p class="font-[200]">{{ props.eventDetail.note }}</p>
                    </div>
                    <p v-else class="text-managray-200 font-[200]">No message</p>
                </div>
                <!-- <div class="text-white mt-10 my-7 text-center w-4/6">
                    <div v-if="props.eventDetail.pathFile">
                        <p class="text-gray-500">File</p>
                        <button @click="downloadFile" class="bg-violet-600 text-white rounded-3xl p-2">{{
                                getFileNameFromPath(props.eventDetail.pathFile)
                        }}</button>
                    </div>
                    <p v-else class="text-gray-500">No File</p>
                </div> -->
            </div>
            <div class="w-36 mt-12">
                <router-link :to="{ name: 'EventList' }" class="flex items-center hover:opacity-80 pb-6 pl-10">
                    <IconArrowLeft class="text-manapink-100 text-3xl"/>
                    <p class="text-base font-[300]">Back</p>
                </router-link>
            </div>
        </div>
    </div>
</template>