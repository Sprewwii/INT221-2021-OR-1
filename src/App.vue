<script setup>
import { onBeforeMount } from "vue"
import { ref, computed } from "vue";
import { eventManager } from "./scripts/eventManager.js"
import { userManager } from "./scripts/userManager.js"
import Navbar from "./components/BaseNavBar.vue"
import BasePopupCreate from "./components/BasePopupCreate.vue";
import BasePopup from "./components/BasePopup.vue";
import BaseLogin from "./components/BaseLogin.vue"
import { useRouter } from "vue-router"
const router = useRouter();


onBeforeMount(async () => {
  console.log("get")
  isLogin.value = ref(!!localStorage.getItem("token"))
  if (!isLogin.value) {
    localStorage.setItem("role", "guest");
  }

  await eventManager.getEvents();
  await eventManager.getEventCategories();
  // await userManager.getUsers();
});
const popupMessage = ref({})
const popupText = ref(null)
const isShowCreateModal = ref(false);
const isShowLoginModal = ref(false);
const showingModal = ref("");
const isLogin = ref(!!localStorage.getItem("token"))

console.log("login " + isLogin.value + "  " + localStorage.getItem("token") )

const toggleCreateModal = () => {
  isShowCreateModal.value = !isShowCreateModal.value;
}

const showLoginModal = () => {
  if (isShowLoginModal.value === false && !localStorage.getItem("token")) isShowLoginModal.value = true
  else {
    isShowLoginModal.value = false
  }
  console.log(isShowLoginModal.value + " " + localStorage.getItem('token'))
}

const loginUser = async (userLogin, e) => {
  e.preventDefault();

  let response = await userManager.login(userLogin)

  if (response === true) {
    // showingPopup.value = 'login'
    toggleModal('login')
    showPopup({ text: "Login Successful !", type: "success", header: "Login" })
    isLogin.value = true
  } else {
    showPopup({ text: response, type: "error", header: "Login" })
  }
}

const logoutUser = () => {
  userManager.userList = []
  router.push({ name: 'Home' })
  console.log("home")
  userManager.logout();
  isLogin.value = false;
}
const showPopup = (newPopup) => {
  console.log("pop " + newPopup)
  if (newPopup && newPopup.type === 'success') {

    if (isShowLoginModal.value) showLoginModal()
  }
  popupMessage.value = newPopup
}

const toggleModal = (modal) => {
  if (showingModal.value === "") showingModal.value = modal
  else showingModal.value = ""
};

</script>
 
<template>
  <div class="h-screen w-screen overflow-x-hidden">

    <button v-if="isLogin" @click="toggleModal('login')"
      class="flex fixed bottom-16 z-20 right-10 w-36 items-center justify-center p-3 text-lg font-normal rounded-full text-white mx-10 transition ease-in-out delay-150 bg-purple-600 hover:-translate-y-1 hover:scale-110 hover:bg-purple-700 duration-300">
      <IconPlus width="1.5em" height="1.5em" fill="#ffffff" />
      <span class="ml-3">Login {{isLogin}}</span>
    </button>
    <!-- <button v-if="isLogin" @click="logoutUser()"
      class="flex fixed bottom-16 z-20 right-10 w-36 items-center justify-center p-3 text-lg font-normal rounded-full text-white mx-10 transition ease-in-out delay-150 bg-purple-600 hover:-translate-y-1 hover:scale-110 hover:bg-purple-700 duration-300">
      <IconPlus width="1.5em" height="1.5em" fill="#ffffff" />
      <span class="ml-3">Logout</span>
    </button> -->
    <Navbar @toggleCreateModal="toggleModal('create')" :isLogin="isLogin" />
    <BaseLogin  v-show="showingModal==='login'" @closeLoginModal="toggleModal('login')" @loginUser="loginUser" />
    <BasePopupCreate v-show="showingModal==='create'" @closeCreateModal="toggleModal('create')"
      @showPopupSuccess="toggleModal('create');showPopup({text: 'Create Event Successful !', type: 'success', header: 'Create' })" />
    <!-- <BasePopup v-show="popupText" :popupText="popupText" :popupType="'success'"
      @closePopup="popupText = null" /> -->
    <BasePopup v-show="Object.keys(popupMessage).length !== 0" :popupText="popupMessage.text" :popupType="popupMessage.type"
      :popupHeader="popupMessage.header" @closePopup="popupMessage = {}" />
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

#cards,
#popupCreate,
#cardMember,
.background-gray,
#popupEdit {
  background-color: #292B2E;
}
</style>
