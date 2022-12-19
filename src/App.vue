<script setup>
import { onBeforeMount,ref, computed,watchEffect,watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { eventManager } from "./scripts/eventManager.js";
import { userManager } from "./scripts/userManager.js";
import { deviceManager } from "./scripts/deviceManager.js";
import BaseNavbarButton from "./components/appPage/BaseNavBarButton.vue";
import BaseNavbar from "./components/appPage/BaseNavBar.vue";
import BaseHeader from "./components/appPage/BaseHeader.vue";
import BaseCreateEventPopup from "./components/appPage/BaseCreateEventPopup.vue";
import BasePopup from "./components/BasePopup.vue";
import BaseTest from "./components/BaseTest.vue";
import aad from "./services/aad.js";
// import BaseLogin from "./components/HomePage/BaseLogin.vue";

const router = useRouter();
const route = useRoute()
const showingPopup = ref("");
const popupMessage = ref({});
// const isMobile = ref(false);
const isShowNavbar = ref(false);

// Collect current path
const path = ref("");
watchEffect(() => {path.value = route.path})

// Check if login is already then redirect to the events page.
onBeforeMount(async () => {
  console.log("เช็ค")
  await eventManager.getEventCategories();
  if(await eventManager.getEvents()){ console.log("ดัน")
    router.push({ path: '/events' })
  }else{
    router.push({ path: '/' })
  }
});

async function logout () {
  console.log("home");
  await aad.logout();
  router.push({ name: "Home" });
  userManager.logout();
};

function goLogin(){
  router.push({ path: '/' })
}

function togglePopup(popup) {
  if (showingPopup.value === "") showingPopup.value = popup;
  else showingPopup.value = "";
  console.log(showingPopup.value)
};

function showPopup(popup){
  popupMessage.value = popup;
};

function toggleNavbar(){
  isShowNavbar.value = !isShowNavbar.value;
}

window.addEventListener('resize', handleResize)
function  handleResize() {
    deviceManager.deviceWidth = window.innerWidth
}

handleResize()
// เก่า
// const popupMessage = ref({});
// const popupText = ref(null);
// const isShowCreateModal = ref(false);
// const isShowLoginModal = ref(false);
// const showingModal = ref("");



// console.log("yessss")
// const toggleCreateModal = () => {
//   isShowCreateModal.value = !isShowCreateModal.value;
// };

// const showLoginModal = () => {
//   if (isShowLoginModal.value === false && !localStorage.getItem("token"))
//     isShowLoginModal.value = true;
//   else {
//     isShowLoginModal.value = false;
//   }
//   console.log(isShowLoginModal.value + " " + localStorage.getItem("token"));
// };

// const loginUser = async (userLogin, e) => {
//   e.preventDefault();
 
//   let response = await userManager.login(userLogin);

//   if (response === true) {
//     // showingPopup.value = 'login'
//     toggleModal("login");
//     showPopup({ text: "Login Successful !", type: "success", header: "Login" });
//     isLogin.value = true;
//   } else {
//     showPopup({ text: response, type: "error", header: "Login" });
//   }
// };

// const logoutUser = () => {
//   userManager.userList = [];
//   router.push({ name: "Home" });
//   console.log("home");
//   userManager.logout();
//   isLogin.value = false;
// };

// const showPopup = (newPopup) => {
//   console.log("pop " + newPopup);
//   if (newPopup && newPopup.type === "success") {
//     if (isShowLoginModal.value) showLoginModal();
//   }
//   popupMessage.value = newPopup;
// };

// const toggleModal = (modal) => {
//   if (showingModal.value === "") showingModal.value = modal;
//   else showingModal.value = "";
// };
// console.log("user ",userManager.userInfo.email)
</script>

<template>
  <div :class="`h-screen w-screen text-managray-100`">
    <!-- <button
      v-if="!isLogin"
      @click="toggleModal('login')"
      class="flex fixed bottom-16 z-20 right-10 w-36 items-center justify-center p-3 text-lg font-normal rounded-full text-white mx-10 transition ease-in-out delay-150 bg-purple-600 hover:-translate-y-1 hover:scale-110 hover:bg-purple-700 duration-300"
    >
      <IconPlus width="1.5em" height="1.5em" fill="#ffffff" />
      <span class="ml-3">Login</span>
    </button>
    <button
      v-else
      @click="logoutUser"
      class="flex fixed bottom-16 z-20 right-10 w-36 items-center justify-center p-3 text-lg font-normal rounded-full text-white mx-10 transition ease-in-out delay-150 bg-purple-600 hover:-translate-y-1 hover:scale-110 hover:bg-purple-700 duration-300"
    >
      <IconPlus width="1.5em" height="1.5em" fill="#ffffff" />
      <span class="ml-3">Logout</span>
    </button>
    <Navbar @toggleCreateModal="toggleModal('create')" :isLogin="isLogin" />
    <BaseLogin
      v-show="showingModal === 'login'"
      @closeLoginModal="toggleModal('login')"
      @loginUser="loginUser"
    />
    <BasePopupCreate
      v-show="showingModal === 'create'"
      @closeCreateModal="toggleModal('create')"
      @showPopupSuccess="
        toggleModal('create');
        showPopup({
          text: 'Create Event Successful !',
          type: 'success',
          header: 'Create',
        });
      "
    />

    <BasePopup
      v-show="Object.keys(popupMessage).length !== 0"
      :popupText="popupMessage.text"
      :popupType="popupMessage.type"
      :popupHeader="popupMessage.header"
      @closePopup="popupMessage = {}"
    /> -->
    <BaseNavbarButton class="visible lg:invisible" :isShowNavbar="isShowNavbar" @toggleNavbar="toggleNavbar"/>
    <BaseNavbar v-if="(deviceManager.deviceWidth >= 1024 && path != '/') || (deviceManager.deviceWidth < 1024 && isShowNavbar)" @logout="logout" @goLogin="goLogin" @hideNavbar="toggleNavbar()"/> 
    <BaseHeader v-if="path != '/'" :role="userManager.userInfo.role" @showCreateEventPopup="togglePopup('createEvent')"/>
    <BaseCreateEventPopup
      v-show="showingPopup == 'createEvent'"
      @closeCreateEventPopup="togglePopup('createEvent')"
      @showPopupSuccess="
        toggleModal('create');
        showPopup({
          text: 'Create Event Successful !',
          type: 'success',
          header: 'Create',
        });
      "
    />
    
    <BasePopup
      v-show="Object.keys(popupMessage).length !== 0"
      :popupMessage="popupMessage"
      @closePopup="showPopup({})"
    />
    <!-- <BaseHeader class="bg-red-500"/> -->
    <router-view>
    </router-view>

  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100&display=swap');

body {
  font-family: 'Kanit', sans-serif;
  /* background-color: red; */
  background: radial-gradient(50.96% 90.94% at 105.02% 97.86%, rgba(255, 174, 174, 0.6) 0%, rgba(26, 26, 26, 0) 100%) , radial-gradient(53.51% 126.85% at 4.6% 7.69%, rgba(165, 173, 240, 0.6) 0%, rgba(87, 90, 120, 0.351149) 54.22%, rgba(26, 26, 26, 0) 100%) , #323438;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

body:after {
  content: "";
  position: fixed;
  top: 0; bottom: 0; left: 0; right: 0; 
  background: rgba(0,0,0,0.2);
  pointer-events: none;
  z-index: -99;
}

</style>
