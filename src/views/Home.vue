<script setup>
import {ref,onBeforeMount,computed} from "vue"
import BaseScheduleList from "../components/BaseScheduleList.vue"
import {eventManager} from "../scripts/eventManager.js"

//อาจจะเป็น computed ถ้าตอน update/delete แล้ว table ไม่เปลี่ยน
const events = ref([])

onBeforeMount(async () => {
  await eventManager.getEvents();
  events.value = eventManager.eventList;
});


</script>

<template>
  <div>
    <BaseScheduleList :events="events"/>
  </div>
</template>

<style></style>
