<script setup>
import iconCalendar from './icons/IconCalendar.vue';
</script>
 
<template>
   <div>
      <div>



         <aside class="h-screen fixed top-0 w-72 rounded-r-2xl shadow-2xl" aria-label="Sidebar">
            <div class="flex flex-col items-center overflow-y-auto py-4 px-3  bg-black-800 mt-3">
               <div class="flex items-center">
                  <iconCalendar width="5em" height="5em" fill="#7c3aed"/>
                  <div class="ml-2 mt-3">
                     <span class="self-center text-3xl font-medium whitespace-nowrap text-white">MANA</span><br />
                     <span class="self-center text-2xl font-black text-violet-600">CLINIC</span>
                  </div>
               </div>

                  <img src="../images/profile.jpg" class="rounded-full h-32 mt-16 shadow-xl opacity-90 outline outline-offset-8 outline-violet-600 outline-4" draggable="false">
                  <p class="self-center text-base font-medium whitespace-nowrap text-gray-500 mt-8">ADMIN 01</p>
               <ul class="space-y-10 mt-16">
                  <li class="flex items-center">
                     <router-link :to="{ name: 'Home'}">
                     <div
                        class="flex items-center p-2 text-lg font-normal rounded-lg text-white hover:bg-gray-700">
                        <iconCalendar width="1.5em" height="1.5em" fill="#ffffff" class="opacity-50"/>
                        <span class="ml-3">Scheduled Events</span>
                     </div>
                     </router-link>
                  </li>
                  <li class="flex items-center">
                     <router-link :to="{ name: 'CategoryListPage'}">
                     <div
                        class="flex items-center p-2 text-lg font-normal rounded-lg text-white hover:bg-gray-700">
                        <span class="ml-3">Event Categories</span>
                     </div>
                     </router-link>
                  </li>
               </ul>
            </div>
         </aside>
      </div>
   </div>
</template>
 
<style>
</style>