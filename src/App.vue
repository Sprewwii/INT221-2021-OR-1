<script setup>
import { onBeforeMount } from "vue"
import { eventManager } from "./scripts/eventManager.js"
import Navbar from "./components/BaseNavBar.vue"

onBeforeMount(async () => {
  await eventManager.getEvents();
  await eventManager.getEventCategories();
  // bookingList.value = eventManager.eventList;

  // eventManager.getEventTest();
});

</script>
 
<template>
  <div class="h-screen w-screen">
    <router-view></router-view>
    <Navbar />
  </div>
</template>
 
<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&display=swap');

body {
  font-family: 'IBM Plex Sans Thai', sans-serif;
  background-color: #191B1E;
  /* background: linear-gradient(#191B1E, #2c2f34); */
  background-attachment: fixed;
}
thead {
  background-color: #292B2E;
}

tbody {
  background-color: #292B2E;
}
aside {
    background-color: #292B2E;
    /* background: linear-gradient(#292B2E, #1e1d1f); */
}
</style>
