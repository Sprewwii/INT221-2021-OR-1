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

<div :class="`${!props.isShowNavbar ? 'bg-managray-100/10 backdrop-blur-lg':''} z-50 fixed top-0 w-full h-16 flex justify-end items-center px-4`">
   <IconMenu @click="$emit('toggleNavbar')" class="text-5xl text-white"/>
</div>

</template>
 