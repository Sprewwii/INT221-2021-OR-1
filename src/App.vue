<script setup>
import { onBeforeMount } from "vue"
import { eventManager } from "./scripts/eventManager.js"

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
  </div>
</template>
 
<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&display=swap');

body {
  font-family: 'IBM Plex Sans Thai', sans-serif;
  background-color: #E3CFCD;
  /* background-image:
    radial-gradient(at 55% 54%, hsla(348, 0%, 11%, 1) 0px, transparent 50%),
    radial-gradient(at 72% 0%, rgba(81, 143, 154, 0.38) 0px, transparent 50%),
    radial-gradient(at 0% 90%, rgba(243, 43, 153, 0.234) 0px, transparent 50%),
    radial-gradient(at 100% 95%, rgba(207, 57, 249, 0.183) 0px, transparent 50%);
    background-attachment: fixed;
} */
}
</style>
