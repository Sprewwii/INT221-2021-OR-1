<script setup>
import { ref, onBeforeMount } from "vue"
import { userManager } from "../scripts/userManager.js"
import { useRoute, useRouter } from "vue-router"
import IconArrowLeft from "../components/icons/IconArrowLeft.vue"

let { params } = useRoute()

const userDetails = ref({})

onBeforeMount(async () => {
  userDetails.value = await userManager.getUserById(params.id);
})
</script>

<template>
  <div class="ml-64">
    <h1 class="text-gray-300 text-2xl pt-10 mb-3 mx-8 md:mx-16 lg:mx-32 font-medium select-none">
       User Details
    </h1>
    <div class="relative overflow-x-auto shadow-2xl rounded-lg ml-32 mr-16">
      <div class="text-white rounded-lg" id="details">
        <div v-if="userDetails" class=" flex flex-col items-center">
          <div class="mt-16 flex flex-col items-center w-4/6">
            <p class="bg-violet-600 text-white rounded-3xl px-6 py-1 text-2xl text-center break-words w-5/6">
              {{ userDetails.name }}
            </p>
            <p class="text-l text-center mt-3">{{ userDetails.email }}</p>
          </div>
          <div class="flex flex-col items-center mt-8">
            <p class="text-gray-500 text-xs">ROLE</p>
            <p class="text-violet-600 text-3xl my-3 font-medium tracking-wider">
              {{ userDetails.role }}
            </p>
            <div>
              <p class="text-gray-500 text-xs">Create on</p>
              {{
                  new Date(userDetails.createdOn).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric", 
                  })
              }}
              at
              {{
                  new Date(userDetails.createdOn).toLocaleTimeString("it-IT", {
                    hour: "2-digit",
                    minute: "2-digit"
                  })
              }}
              in
              {{new Date().toLocaleTimeString('en-CA',{timeZoneName:'short'}).split(' ')[2] +
               " time ("  + new Date().toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2].substring(3, 5) + ":00)"}} 
              
            </div>

            <div>
              <p class="text-gray-500 text-xs mt-2">Update on</p>
              {{
                  new Date(userDetails.updatedOn).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
              }}
              at
              {{
                  new Date(userDetails.updatedOn).toLocaleTimeString("it-IT", {
                    hour: "2-digit",
                    minute: "2-digit"
                  })
              }}
               in
              {{new Date().toLocaleTimeString('en-CA',{timeZoneName:'short'}).split(' ')[2] +
               " time ("  + new Date().toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2].substring(3, 5) + ":00)"}} 
              
            </div>

          </div>
        </div>
        <div class="w-36">
          <router-link :to="{ name: 'UserList' }" class="flex pb-6 pl-10">
            <div class="flex items-center hover:opacity-80">
              <IconArrowLeft />
              <p class="mt-1">Back</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#details {
  background-color: #292B2E;
}
</style>