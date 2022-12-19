<script setup>
import { ref, onBeforeMount } from "vue"
import { eventManager } from "../scripts/eventManager.js"
import { useRoute, useRouter } from "vue-router"
import BaseHeader from "../components/appPage/BaseHeader.vue"
import BaseEventDetail from "../components/eventDetailPage/BaseEventDetail.vue"
import IconArrowLeft from "../components/icons/IconArrowLeft.vue"
import IconHome from "../components/icons/IconHome.vue"

const router = useRouter()
let { params } = useRoute()

const eventDetail = ref({})

onBeforeMount(async () => {
  eventDetail.value = await eventManager.getEventById(params.id)
  if (eventDetail.value === false) router.push("/")
})

</script>

<template>
  <div class="w-full h-full">
    <div class="lg:ml-64 pt-24 ">
      <span
        class="lg:ml-24 text-gray-300 flex flex-row items-center gap-x-3 text-lg lg:text-2xl pt-10 mb-3 mr-8 ml-8  font-[400] font-medium select-none">
        <router-link :to="{ name: 'EventList' }" class="hover:opacity-60">
          <IconHome class="text-xl lg:text-4xl" />
        </router-link>
        <p>></p>
        <p> Events Detail ({{ eventDetail.name }})</p>
      </span>
      <BaseEventDetail :eventDetail="eventDetail" />
    </div>
    <!-- <LoadingPopup v-if="Object.keys(eventDetail).length === 0"/> -->
  </div>
</template>

<style>

</style>