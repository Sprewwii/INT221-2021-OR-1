<script setup>
import { ref, onBeforeMount } from "vue"
import { eventManager } from "../scripts/eventManager.js"
import { useRoute, useRouter } from "vue-router"
import BaseHeader from "../components/appPage/BaseHeader.vue";
import BaseEventDetail from "../components/eventDetailPage/BaseEventDetail.vue"
import LoadingPopup from "../components/global/LoadingPopup.vue"
import IconArrowLeft from "../components/icons/IconArrowLeft.vue"
import IconHome from "../components/icons/IconHome.vue"

const router = useRouter()
let { params } = useRoute()

const eventDetail = ref({})

// const getFileNameFromPath = (path) => path.replace(/^.*[\\\/]/, '')

onBeforeMount(async () => {
  // const showLoading = setTimeout(() => {
  //   console.log("load")
  //   if(Object.keys(eventDetail.value).length === 0){

  //   }
  // },1000)
  eventDetail.value = await eventManager.getEventById(params.id)
  console.log("booking detail " + eventDetail.value)
  if (eventDetail.value === false) router.push("/")
})

// const downloadFile = async () => {
//   const file = await eventManager.getEventFileById(params.id)

//   const url = window.URL.createObjectURL(file)
//   const a = document.createElement('a')
//   a.style.display = 'none'
//   a.href = url

//   // dowmload file
//   a.download = getFileNameFromPath(bookingDetails.value.pathFile)
//   document.body.appendChild(a)
//   a.click()
//   document.body.removeChild(a)
//   window.URL.revokeObjectURL(url)
// }
</script>

<template>
  <div class="w-full h-full">
    <!-- <BaseHeader /> -->
    <div class="ml-64 pt-24">
      
      <span class="text-gray-300 flex flex-row items-center gap-x-3 text-2xl pt-10 mb-3 mr-8 ml-28 font-[400] font-medium select-none">
        <router-link :to="{ name: 'EventList' }" class="hover:opacity-60">
                 <IconHome class="text-4xl"/> </router-link><p>></p><p> Events Detail ({{ eventDetail.name }})</p>
      </span>
      <BaseEventDetail :eventDetail="eventDetail"/>
    </div>
    <!-- <LoadingPopup v-if="Object.keys(eventDetail).length === 0"/> -->
  </div>
</template>

<style>

</style>