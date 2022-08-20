<script setup>
import { ref } from "vue"
import IconCalendar from './icons/IconCalendar.vue';
import IconCategory from './icons/IconCategory.vue';
import IconPlus from './icons/IconPlus.vue';
import IconAboutUs from './icons/IconAboutUs.vue';

defineEmits(['toggleCreateModal'])
const selectedPage = ref(1)
</script>
 
<template>
   <div>
      <div>
         <div id="nav" class="h-screen fixed top-0 w-72 rounded-r-2xl shadow-2xl overflow-hidden">
            <div class="flex flex-col items-center overflow-hidden py-4 mt-3">
               <div class="flex items-center">
                  <IconCalendar width="5em" height="5em" fill="#7c3aed" />
                  <div class="ml-2 mt-3">
                     <span
                        class="self-center text-3xl font-medium whitespace-nowrap text-white select-none">MANA</span><br />
                     <span class="self-center text-2xl font-black text-violet-600 select-none">CLINIC</span>
                  </div>
               </div>
               <div class="relative">
                  <div class="z-40 absolute top-0 right-0 mr-1 mt-16 w-7 h-7 rounded-full bg-violet-600 animate-ping">
                  </div>
                  <div class="z-40 absolute top-0 right-0 mr-1 mt-16 w-7 h-7 rounded-full bg-violet-600"></div>
                  <img src="../images/profile.jpg" class="rounded-full h-32 mt-16 shadow-xl opacity-90"
                     draggable="false">
               </div>
               <p class="self-center text-base font-medium whitespace-nowrap text-gray-500 mt-3 mb-8 select-none">ADMIN 01</p>
               <div class="flex flex-col space-y-0">
                  <router-link :to="{ name: 'Home' }" class="mr-8">
                     <div class="flex items-center p-4 text-lg font-normal rounded-lg text-white w-full">
                        <IconCalendar width="1.5em" height="1.5em" fill="#ffffff" class="opacity-50 ml-8" />
                        <span class="ml-3">Scheduled Event</span>
                     </div>
                  </router-link>
                  <router-link :to="{ name: 'CategoryList' }" class="mr-8">
                     <div class="flex w-full items-center p-4 text-lg font-normal rounded-lg text-white">
                        <IconCategory width="1.5em" height="1.5em" fill="#ffffff" class="opacity-50 ml-8" />
                        <span class="ml-3">Event Categories</span>
                     </div>
                  </router-link>
                  <router-link :to="{ name: 'UserList' }" class="mr-8">
                     <div class="flex w-full items-center p-4 text-lg font-normal rounded-lg text-white">
                        <IconAboutUs width="1.5em" height="1.5em" fill="#ffffff" class="opacity-50 ml-8" />
                        <span class="ml-3">Users</span>
                     </div>
                  </router-link>
                  <router-link :to="{ name: 'AboutUs' }" class="mr-8">
                     <div class="flex w-full items-center p-4 text-lg font-normal rounded-lg text-white">
                        <IconAboutUs width="1.5em" height="1.5em" fill="#ffffff" class="opacity-50 ml-8" />
                        <span class="ml-3">About Us</span>
                     </div>
                  </router-link>
                
               </div>
               <button
                  class="flex absolute bottom-16 w-2/3 items-center justify-center p-3 text-lg font-normal rounded-full text-white mx-10 transition ease-in-out delay-150 bg-purple-600 hover:-translate-y-1 hover:scale-110 hover:bg-purple-700 duration-300"
                  @click="$emit('toggleCreateModal')">
                  <IconPlus width="1.5em" height="1.5em" fill="#ffffff" />
                  <span class="ml-3">Add Booking</span>
               </button>
            </div>
         </div>
      </div>
   </div>
</template>
 
<style>
#nav{
  background-color: #292B2E;
}

.router-link-active {
  background-color: #1b1c1e58;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
</style>