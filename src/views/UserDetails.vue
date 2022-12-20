<script setup>
import { ref, onBeforeMount } from "vue"
import { userManager } from "../scripts/userManager.js"
import { useRoute } from "vue-router"
import IconArrowLeft from "../components/icons/IconArrowLeft.vue"

let { params } = useRoute()

const userDetails = ref({})

onBeforeMount(async () => {
  userDetails.value = await userManager.getUserById(params.id)
})
</script>

<template>
  <div class="lg:ml-56 pt-24">
    <h1 class="text-gray-300 text-2xl pt-10 mb-3 mx-8 md:mx-16 lg:mx-32 font-medium select-none">
      User Details
    </h1>
    <div class="relative overflow-x-auto shadow-2xl rounded-lg ml-8 sm:ml-16 lg:ml-32 mr-8 lg:mr-16">
      <div class="text-white rounded-lg bg-managray-100/10 backdrop-blur-md">


        <div v-if="userDetails" class=" flex flex-col items-center">
          <div class="mt-16 flex flex-row items-center h-12">
            <p
              class="text-manapink-100 border px-8 h-full border-manapink-100 rounded-l-lg text-base lg:text-lg text-center break-words flex justify-center items-center">
              {{ userDetails.name }}
            </p>
            <div class="bg-manapink-100 text-managray-400 px-8 h-full rounded-r-lg flex justify-center items-center">
              <div class="text-gray-900 rounded-3xl text-base lg:text-lg">{{ userDetails.role }}</div>
            </div>

          </div>


          <div class="flex flex-col items-center">
            <p class="text-lg text-center mt-3 mb-10">{{ userDetails.email }}</p>

            <div>
              <p class="text-gray-500 text-base">Create on</p>
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
              {{ new Date().toLocaleTimeString('en-CA', { timeZoneName: 'short' }).split(' ')[2] +
                  " time (" + new Date().toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2].substring(3, 5) +
                  ":00)"
              }}

            </div>

            <div>
              <p class="text-gray-500 text-base mt-2">Update on</p>
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
              {{ new Date().toLocaleTimeString('en-CA', { timeZoneName: 'short' }).split(' ')[2] +
                  " time (" + new Date().toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2].substring(3, 5) +
                  ":00)"
              }}
            </div>

          </div>
        </div>
        <div class="w-36 mt-12">
          <router-link :to="{ name: 'UserList' }" class="flex items-center hover:opacity-80 pb-6 pl-10">
            <IconArrowLeft class="text-manapink-100 text-3xl" />
            <p class="text-base font-[300]">Back</p>
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<style>

</style>