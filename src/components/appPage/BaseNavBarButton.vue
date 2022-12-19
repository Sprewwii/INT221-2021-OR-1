<script setup>
import { ref, computed } from "vue"
import IconMenu from '../icons/IconMenu.vue'

const props = defineProps({
  isShowNavbar: {
    type: Boolean,
    default: false
  },
})

defineEmits(['toggleNavbar'])

</script>
 
<template>
<div class="z-[42] fixed right-0 top-1.5 w-20 h-16 flex justify-end items-center px-4 pr-8">
   <IconMenu @click="$emit('toggleNavbar')" class="text-5xl text-white"/>
</div>

</template>
 