<script setup>
import iconCalendar from './icons/IconCalendar.vue';
import iconCategory from './icons/IconCategory.vue';
import iconPlus from './icons/IconPlus.vue';

defineEmits(['toggleCreateModal'])
</script>
 
<template>
   <div>
      <div>
         <aside class="h-screen fixed top-0 w-72 rounded-r-2xl shadow-2xl" aria-label="Sidebar">
            <div class="flex flex-col items-center overflow-y-auto py-4  bg-black-800 mt-3">
               <div class="flex items-center">
                  <iconCalendar width="5em" height="5em" fill="#7c3aed"/>
                  <div class="ml-2 mt-3">
                     <span class="self-center text-3xl font-medium whitespace-nowrap text-white select-none">MANA</span><br />
                     <span class="self-center text-2xl font-black text-violet-600 select-none">CLINIC</span>
                  </div>
               </div>


  <div class="relative">
                  <div class="z-40 absolute top-0 right-0 mr-1 mt-16 w-7 h-7 rounded-full bg-violet-600 animate-ping"></div>
    <div class="z-40 absolute top-0 right-0 mr-1 mt-16 w-7 h-7 rounded-full bg-violet-600"></div>
                  <!-- <img src="../images/profile.jpg" class="rounded-full h-32 mt-16 shadow-xl opacity-90 outline outline-offset-8 outline-violet-600 outline-4" draggable="false"> -->
                  <img src="../images/profile.jpg" class="rounded-full h-32 mt-16 shadow-xl opacity-90" draggable="false">
</div>
                  <p class="self-center text-base font-medium whitespace-nowrap text-gray-500 mt-3 mb-16 select-none">ADMIN 01</p>
               <ul class="space-y-12 w-full">
                  <li class="flex items-center w-full">
                     <router-link :to="{ name: 'Home'}">
                     <div
                        class="flex items-center p-2 text-lg font-normal rounded-lg text-white w-full">
                        <iconCalendar width="1.5em" height="1.5em" fill="#ffffff" class="opacity-50 ml-8"/>
                        <span class="ml-3">Scheduled Event</span>
                     </div>
                     </router-link>
                  </li>
                  <li class="flex items-center w-full ">
                     <router-link :to="{ name: 'CategoryList'}">
                     <div
                        class="flex w-full  items-center p-2 text-lg font-normal rounded-lg text-white">
                        <iconCategory width="1.5em" height="1.5em" fill="#ffffff" class="opacity-50 ml-8"/>
                        <span class="ml-3">Event Categories</span>
                     </div>
                     </router-link>
                  </li>
                  <li class="flex items-center w-full pt-24">
                     <button
                        class="flex w-full items-center justify-center p-3 text-lg font-normal rounded-full text-white mx-10 transition ease-in-out delay-150 bg-purple-600 hover:-translate-y-1 hover:scale-110 hover:bg-purple-700 duration-300" 
                        @click="$emit('toggleCreateModal')">
                        <iconPlus width="1.5em" height="1.5em" fill="#ffffff"/>
                        <span class="ml-3" >Add Booking</span>
                     </button>
                  </li>
               </ul>
            </div>
         </aside>
      </div>
   </div>
</template>
 
<style>
.router-link-active {
  background-color: #1b1c1e58;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  padding: 1rem;
  /* padding-left: 2rem; */
  /* width: 100vw; */
}
</style>