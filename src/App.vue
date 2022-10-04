<script setup>
import { onBeforeMount } from "vue"
import { ref,computed } from "vue";
import { eventManager } from "./scripts/eventManager.js"
import { userManager } from "./scripts/userManager.js"
import Navbar from "./components/BaseNavBar.vue"
import BasePopupCreate from "./components/BasePopupCreate.vue";
import BasePopup from "./components/BasePopup.vue";
import BaseLogin from "./components/BaseLogin.vue"
import { useRouter } from "vue-router"
const router = useRouter();


onBeforeMount(async () => {
  await eventManager.getEvents();
  await eventManager.getEventCategories();
  // await userManager.getUsers();
});
const popup = ref({})
const popupText = ref(null)
const isShowCreateModal = ref(false);
const isShowLoginModal = ref(false);
const isLogin = ref(!!localStorage.getItem("token"))

const toggleCreateModal = () => {
  isShowCreateModal.value = !isShowCreateModal.value;
}

const showLoginModal = () => {
  if(isShowLoginModal.value === false && !localStorage.getItem("token")) isShowLoginModal.value = true
  else {
    isShowLoginModal.value = false
  }
  console.log(isShowLoginModal.value + " " +localStorage.getItem('token'))
}

const loginUser = async (userLogin, e) => {
  e.preventDefault();

  let response = await userManager.login(userLogin)

  if (response === true) {
    // showingPopup.value = 'login'
    showPopup({ text: "Login Successful !", type: "success", header: "Login" })
    isLogin.value = true
  } else {
    showPopup({ text: response, type: "error", header: "Login" })
  }
}

const logoutUser = () => {
  userManager.userList = []
  router.push({name: 'Home'})
  console.log("home")
  userManager.logout();
  isLogin.value = false;
}
const showPopup = (newPopup) => {
  console.log("pop " + newPopup) 
  if (newPopup && newPopup.type === 'success'){ 
    
    if (isShowLoginModal.value)showLoginModal()
}
popup.value = newPopup
}
</script>
 
<template>
  <div class="h-screen w-screen overflow-x-hidden">
  
    <button v-if="!isLogin" @click="showLoginModal()"
                  class="flex fixed bottom-16 right-10 w-36 items-center justify-center p-3 text-lg font-normal rounded-full text-white mx-10 transition ease-in-out delay-150 bg-purple-600 hover:-translate-y-1 hover:scale-110 hover:bg-purple-700 duration-300"
                  >
                  <IconPlus width="1.5em" height="1.5em" fill="#ffffff" />
                  <span class="ml-3">Login {{isLogin}}</span>
               </button>
               <button v-else @click="logoutUser()"
                  class="flex fixed bottom-16 right-10 w-36 items-center justify-center p-3 text-lg font-normal rounded-full text-white mx-10 transition ease-in-out delay-150 bg-purple-600 hover:-translate-y-1 hover:scale-110 hover:bg-purple-700 duration-300"
                  >
                  <IconPlus width="1.5em" height="1.5em" fill="#ffffff" />
                  <span class="ml-3">Logout {{isLogin}}</span>
               </button>
    <Navbar @toggleCreateModal="toggleCreateModal" />
    <BaseLogin v-show="isShowLoginModal" @closeEditModal="showLoginModal()" @loginUser="loginUser"
      @showPopup="showPopup" />
    <BasePopupCreate v-show="isShowCreateModal" @closeCreateModal="toggleCreateModal()" @showPopupSuccess="toggleCreateModal();popupText = 'Add Booking Success !'" />
   <!-- <BasePopup v-show="popupText" :popupText="popupText" :popupType="'success'"
      @closePopup="popupText = null" /> -->
          <BasePopup v-show="Object.keys(popup).length !== 0" :popupText="popup.text" :popupType="popup.type"
      :popupHeader="popup.header" @closePopup="popup = {}" />
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
