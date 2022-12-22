<script setup>
import { ref, computed } from "vue"
import IconCalendar from '../icons/IconCalendar.vue'
import { userManager } from '../../scripts/userManager.js'

const props = defineProps({
  role: {
    type: String,
    default: ""
  },
})

defineEmits(['showCreateEventPopup'])
</script>

<template>
  <div
    class="fixed pl-8 lg:pl-12 pr-8 lg:pr-[350px] lg:ml-72 z-40 bg-managray-300/10 backdrop-blur-md py-4 lg:py-8 flex space-x-2 justify-between items-center lg:fixed w-full">

    <div class="hidden lg:flex gap-2 justify-center items-center">
      <IconCalendar class="w-5 h-5" />
      <div class="flex flex-col lg:flex-row lg:justify-start lg:items-center lg:gap-x-2">
        <span class="text-managray-200">Hello, Today is</span><span class=" text-managray-100">{{ new
            Date().toLocaleString("en-US", { year: "numeric", month: "long", day: "2-digit", weekday: 'long' })
        }}</span>
      </div>
    </div>
    <button v-if="props.role !== 'lecturer' && !(userManager.userInfo.role === 'guest' && !userManager.userInfo.email)"
      class="w-44 h-[45px] text-white bg-gradient-to-l from-manapink-100 to-manapurple-100 group relative inline-block rounded-xl"
      @click="$emit('showCreateEventPopup')">
      <span
        class="rounded-xl absolute w-full opacity-0 group-hover:opacity-100 inset-y-0 left-0 text-white bg-gradient-to-r from-manapink-100 to-manapurple-100 transition-all duration-500"></span>

      <span
        class="relative text-sm font-medium transition-colors tracking-widest transition-all duration-300 flex gap-x-2 justify-center">
        Booking Event
      </span>
    </button>

  </div>
</template>