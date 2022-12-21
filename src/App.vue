<script setup>
import { onBeforeMount, ref, computed, watchEffect, watch } from "vue"
import { useRouter, useRoute } from "vue-router"
import { eventManager } from "./scripts/eventManager.js"
import { userManager } from "./scripts/userManager.js"
import { deviceManager } from "./scripts/deviceManager.js"
import BaseNavbarButton from "./components/appPage/BaseNavBarButton.vue"
import BaseNavbar from "./components/appPage/BaseNavBar.vue"
import BaseHeader from "./components/appPage/BaseHeader.vue"
import BaseCreateEventPopup from "./components/appPage/BaseCreateEventPopup.vue"
import BasePopup from "./components/global/BasePopup.vue"
import BaseLoadingPopup from "./components/global/BaseLoadingPopup.vue"
import aad from "./services/aad.js"
// import BaseLogin from "./components/HomePage/BaseLogin.vue";

const router = useRouter()
const route = useRoute()
const showingPopup = ref("")
const popupMessage = ref({})
const isLoading = ref(false)
const isShowNavbar = ref(false)

// Collect current path
const path = ref("")
watchEffect(() => { path.value = route.path })

// Check if login is already then redirect to the events page.
onBeforeMount(async () => { 
  // console.log("new")
  await eventManager.getEventCategories()
  if (await eventManager.getEvents()) {
    // router.push({ path: '/events' })
    console.log("push")
  } 
  else {
    // router.push({ path: '/' })
  }
})

async function logout() {
  await aad.logout()
  router.push({ name: "Home" })
  userManager.logout()
};

function goLogin() {
  router.push({ path: '/' })
}

function togglePopup(popup) {
  if (showingPopup.value === "") showingPopup.value = popup
  else showingPopup.value = ""
};

function showPopup(popup) {
  popupMessage.value = popup
};

function toggleNavbar() {
  isShowNavbar.value = !isShowNavbar.value
}

function setLoading(loading) {
  isLoading.value = loading
}

window.addEventListener('resize', handleResize)
function handleResize() {
  deviceManager.deviceWidth = window.innerWidth
}

handleResize()

</script>

<template>
  <div :class="`h-screen w-screen text-managray-100`">
    <BaseNavbarButton class="visible lg:invisible" :isShowNavbar="isShowNavbar" @toggleNavbar="toggleNavbar" />
    <BaseNavbar
      v-if="(deviceManager.deviceWidth >= 1024 && path != '/') || (deviceManager.deviceWidth < 1024 && isShowNavbar)"
      @logout="logout" @goLogin="goLogin" @hideNavbar="toggleNavbar()" />
    <BaseHeader v-if="path != '/'" :role="userManager.userInfo.role"
      @showCreateEventPopup="togglePopup('createEvent')" />
    <BaseCreateEventPopup v-show="showingPopup == 'createEvent'" @closeCreateEventPopup="togglePopup('createEvent')"
      @setLoading="setLoading" @showPopupSuccess="
  togglePopup('createEvent');
isLoading = false;
showPopup({
  text: 'Create Event Successful !',
  type: 'success',
  header: 'Create',
});
      " />

    <BasePopup v-show="Object.keys(popupMessage).length !== 0" :popupMessage="popupMessage"
      @closePopup="showPopup({})" />

    <BaseLoadingPopup v-show="isLoading" />

    <router-view>
    </router-view>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100&display=swap');

body {
  font-family: 'Kanit', sans-serif;
  background: radial-gradient(50.96% 90.94% at 105.02% 97.86%, rgba(255, 174, 174, 0.6) 0%, rgba(26, 26, 26, 0) 100%), radial-gradient(53.51% 126.85% at 4.6% 7.69%, rgba(165, 173, 240, 0.6) 0%, rgba(87, 90, 120, 0.351149) 54.22%, rgba(26, 26, 26, 0) 100%), #323438;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

body:after {
  content: "";
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  pointer-events: none;
  z-index: -99;
}
</style>
