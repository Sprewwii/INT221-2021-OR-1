<script setup>
import { ref, onBeforeMount, computed } from "vue"
import BaseScheduleList from "../components/BaseScheduleList.vue"
import BasePopup from "../components/BasePopup.vue"
import { eventManager } from "../scripts/eventManager.js"


//อาจจะเป็น computed ถ้าตอน update/delete แล้ว table ไม่เปลี่ยน
const bookingList = computed(() => eventManager.eventList)
const eventCategories = computed(() => eventManager.eventCategories)
function createEvent(booking){

}
</script>

<template>
  <div>
    <BasePopup :eventCategories="eventCategories"/>
    <BaseScheduleList :bookingList="bookingList" />
      
  </div>
</template>

<style></style>