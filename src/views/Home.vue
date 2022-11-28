<script setup>
import { ref, computed,onBeforeMount } from "vue";
import { useRouter } from "vue-router"
import { eventManager } from "../scripts/eventManager.js";
import { userManager } from "../scripts/userManager.js";
import { validation } from "../scripts/validation.js";
import BaseLogin from "../components/homePage/BaseLogin.vue";
import BasePopup from "../components/BasePopup.vue";
import aad from "../services/aad.js";

const router = useRouter();

// popup message in form { text: "", type: "", header: "" }
const popupMessage = ref({});

const isLogin = ref(localStorage.getItem("token") ? true : false);
if (!isLogin.value) {
  localStorage.setItem("role", "guest");
}
console.log("login " + isLogin.value + "  " + localStorage.getItem("token"));


async function login(user){
  console.log(user)
  let response = await userManager.login(user);

  if (response === true) {
    showPopup({ text: "Login Successful !", type: "success", header: "Login" });
    // isLogin.value = true;

    // close success popup in 2 seconds 
    setTimeout(()=>{
      showPopup({})
    }, 2000)
    router.push({ path: '/events' })
  } else {
    showPopup({ text: response, type: "error", header: "Login" });
  }
};

function loginAsGuest(){
  router.push({ path: '/events' })
}

function loginAsMS(){
  console.log("ms login")
  aad.login().then((account)=>{
    console.log(account)
    router.push({ path: '/events' })
    // localStorage.setItem("token",)    
  })
}


const logout = () => {
  userManager.userList = [];
  router.push({ name: "Home" });
  console.log("home");
  userManager.logout();
  isLogin.value = false;
};

function showPopup(popup){
  // if (newPopup && newPopup.type === "success") {
  //   if (isShowLoginModal.value) showLoginModal();
  // }
  console.log(popup)
  popupMessage.value = popup;
};


</script>

<template>
  <div class="ml-64 mt-14 w-full pr-80 mb-64 bg-red-500">
    <BaseLogin @login="login" @loginAsGuest="loginAsGuest" @loginAsMS="loginAsMS"/>
    <BasePopup
      v-show="Object.keys(popupMessage).length !== 0"
      :popupMessage="popupMessage"
      @closePopup="showPopup({})"
    />
  </div>

</template>

<style>
</style>