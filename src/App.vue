<script setup>
import { onBeforeMount } from "vue"
import { ref } from "vue";
import { eventManager } from "./scripts/eventManager.js"
import { userManager } from "./scripts/userManager.js"
import Navbar from "./components/BaseNavBar.vue"
import BasePopupCreate from "./components/BasePopupCreate.vue";
import BasePopup from "./components/BasePopup.vue";

onBeforeMount(async () => {
  await eventManager.getEvents();
  await eventManager.getEventCategories();
  // await userManager.getUsers();
});

const popupText = ref(null)
const isShowCreateModal = ref(false);

const toggleCreateModal = () => {
  isShowCreateModal.value = !isShowCreateModal.value;
}

</script>
 
<template>
  <div class="h-screen w-screen overflow-x-hidden">
    <Navbar @toggleCreateModal="toggleCreateModal" />
    <BasePopupCreate v-show="isShowCreateModal" @closeCreateModal="toggleCreateModal()" @showPopupSuccess="toggleCreateModal();popupText = 'Add Booking Success !'" />
   <BasePopup v-show="popupText" :popupText="popupText" :popupType="'success'"
      @closePopup="popupText = null" />
    <router-view></router-view>
  </div>
</template>
 
<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&display=swap');

body {
  font-family: 'IBM Plex Sans Thai', sans-serif;
  background-color: #191B1E;
  background-attachment: fixed;
}

table {
  background-color: #292B2E;
  border-radius: 1rem;
}

#cards, #popupCreate, #cardMember, .background-gray, #popupEdit{
    background-color: #292B2E;
}

</style>
