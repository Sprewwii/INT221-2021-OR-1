<script setup>
import { onBeforeMount } from "vue"
import { ref, computed } from "vue";
import { eventManager } from "./scripts/eventManager.js"
import Navbar from "./components/BaseNavBar.vue"
import BasePopupCreate from "./components/BasePopupCreate.vue";

onBeforeMount(async () => {
  await eventManager.getEvents();
  await eventManager.getEventCategories();
  // bookingList.value = eventManager.eventList;

  // eventManager.getEventTest();
});

const isShowCreateModal = ref(false);

const toggleCreateModal = () => {
  isShowCreateModal.value = !isShowCreateModal.value;
}

</script>
 
<template>
  <div class="h-screen w-screen">
    <router-view></router-view>
    <Navbar @toggleCreateModal="toggleCreateModal"/>
        <BasePopupCreate
      v-show="isShowCreateModal"
      @closeCreateModal="toggleCreateModal"
    />
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
table {
  background-color: #292B2E;
  border-radius: 1rem;
}


aside, #cards, #popupCreate {
    background-color: #292B2E;
}

.router-link-active {
  background-color: #1b1c1e58;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  padding: 1rem;
  /* padding-left: 2rem; */
  /* width: 100vw; */
}
/* 
li:hover {
    background-color: #1b1c1e58;
} */
</style>
