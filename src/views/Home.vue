<script setup>
import { ref, computed,onBeforeMount } from "vue";
import { useRouter } from "vue-router"
import { eventManager } from "../scripts/eventManager.js";
import { userManager } from "../scripts/userManager.js";
import { validation } from "../scripts/validation.js";
import BaseLogin from "../components/homePage/BaseLogin.vue";
import aad from "../services/aad.js";

const router = useRouter();
const popupMessage = ref({});

const isLogin = ref(localStorage.getItem("token") ? true : false);
if (!isLogin.value) {
  localStorage.setItem("role", "guest");
}

async function login(user){
  let response = await userManager.login(user);

  if (response === true) {

    showPopup({ text: "Login Successful !", type: "success", header: "Login" });

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

async function loginAsMS(){
  aad.login().then(async (account)=>{
    // const role =account.idTokenClaims.roles ? account.idTokenClaims.roles[0] : "guest";
    const role = "guest"
    userManager.userInfo.email = account.idTokenClaims.preferred_username;
    // userManager.userInfo.email = account.userName;
 
    userManager.userInfo.role = role;
    localStorage.setItem("role", role)
    console.log(account.idTokenClaims.preferred_username)
    localStorage.setItem("email", account.idTokenClaims.preferred_username)
    console.log("login MS")
    
    // router.push({ path: '/events' })
    eventManager.getEvents();
  })
}

function showPopup(popup){
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