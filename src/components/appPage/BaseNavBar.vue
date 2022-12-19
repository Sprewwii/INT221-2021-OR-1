<script setup>
import { ref, computed } from "vue"
import IconCalendar from '../icons/IconCalendar.vue'
import IconCategory from '../icons/IconCategory.vue'
import IconPlus from '../icons/IconPlus.vue'
import IconAboutUs from '../icons/IconAboutUs.vue'
import IconUsername from '../icons/IconUsername.vue'
import { userManager } from '../../scripts/userManager.js'

defineEmits(['hideNavbar', 'logout', 'goLogin'])

</script>
 
<template>


   <div
      class="right-0 lg:left-0 z-[41] h-screen fixed top-0 w-72 bg-managray-300/20 sm:bg-managray-300/10 backdrop-blur-xl overflow-hidden flex flex-col items-center justify-between pb-12 border-r border-managray-300/40">

      <div class="flex flex-col items-center overflow-hidden py-4 mt-3">

         <div class="relative">
            <div class="z-40 absolute top-0 right-0 mr-1 mt-16 w-7 h-7 rounded-full bg-manapurple-100 animate-ping">
            </div>
            <div class="z-40 absolute top-0 right-0 mr-1 mt-16 w-7 h-7 rounded-full bg-manapurple-100"></div>
            <img src="../../images/profile.jpg" class="rounded-full h-32 mt-16 shadow-xl opacity-90" draggable="false">
         </div>
         <div class="flex flex-col mt-4 h-16">
            <p v-if="userManager.userInfo.email"
               class="self-center text-lg font-medium whitespace-nowrap text-white select-none ">
               {{ userManager.userInfo.email }}</p>
            <p class="self-center text-base font-medium whitespace-nowrap select-none capitalize">{{
                  userManager.userInfo.role
            }}
            </p>
         </div>

         <div @click="$emit('hideNavbar')" class="flex flex-col space-y-3 w-full px-6 font-[400] text-lg mt-6">
            <router-link :to="{ name: 'EventList' }">
               <div class="flex items-center p-3 px-6 rounded-xl w-full">
                  <IconCalendar width="1.5em" height="1.5em" />
                  <span class="ml-3">Scheduled Events</span>
               </div>
            </router-link>
            <router-link :to="{ name: 'CategoryList' }">
               <div class="flex w-full items-center p-3 px-6 rounded-lg">
                  <IconCategory width="1.5em" height="1.5em" />
                  <span class="ml-3">Event Categories</span>
               </div>
            </router-link>

            <router-link v-if="userManager.userInfo.role === 'admin'" :to="{ name: 'UserList' }">
               <div class="flex w-full items-center p-3 px-6 rounded-lg">
                  <IconUsername width="1.5em" height="1.5em" />
                  <span class="ml-3">Users</span>
               </div>
            </router-link>
            <router-link :to="{ name: 'AboutUs' }">
               <div class="flex w-full items-center p-3 px-6 rounded-lg">
                  <IconAboutUs width="1.5em" height="1.5em" />
                  <span class="ml-3">About Us</span>
               </div>
            </router-link>

         </div>


      </div>
      <div class="px-8 w-full pb-8">
         <button v-if="userManager.userInfo.role !== 'guest'" @click="$emit('logout');$emit('hideNavbar')"
            class="w-full h-[50px] text-manapink-100 group relative inline-block overflow-hidden border border-manapink-100 rounded-xl focus:outline-none">
            <span
               class="absolute inset-y-0 left-0 w-[0px] bg-manapink-100 transition-all group-hover:w-full group-active:bg-manapink-500"></span>

            <span
               class="relative font-[300] tracking-wider sm:text-lg transition-colors group-hover:text-white flex gap-x-2 justify-center">
               <IconGuest class="text-xl" />Logout
            </span>
         </button>
         <button v-else @click="$emit('goLogin');$emit('hideNavbar')"
            class="w-full h-[50px] text-manapurple-100 group relative inline-block overflow-hidden border border-manapurple-100 rounded-xl focus:outline-none">
            <span
               class="absolute inset-y-0 left-0 w-[0px] bg-manapurple-100 transition-all group-hover:w-full group-active:bg-manapurple-100"></span>

            <span
               class="relative font-[300] tracking-wider sm:text-lg transition-colors group-hover:text-white flex gap-x-2 justify-center">
               <IconGuest class="text-xl" />Login
            </span>
         </button>
      </div>
   </div>




</template>
 
<style>
.router-link-active {
   background-color: rgba(169, 170, 174, 0.15);
   border-radius: 0.8rem;
   color: #fff;
}
</style>