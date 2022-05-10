<script setup>
import { computed } from "vue"
import iconMenuKebabVue from "./icons/IconMenuKebab.vue";
import iconDelete from "./icons/IconDelete.vue";
import iconEdit from "./icons/IconEdit.vue";

const props = defineProps({
  bookingId: {
    type: Number,
    default: 0
  },
selectedId: {
    type: Number,
    default: 0
}
})

const selectedId = computed(() => props.selectedId)


defineEmits(['selectEventOption','deleteBooking'])

</script>
 
<template>
 <div class="dropdown inline-block relative">
              <button @click="$emit('selectEventOption',bookingId)">
                <iconMenuKebabVue />
              </button>
              <ul 
                class="dropdown-menu absolute text-white pt-1 z-10"
                v-show="selectedId === bookingId"
              >
                <li>
                  <button
                    class="rounded-t bg-gray-500 hover:bg-gray-700 py-2 px-4 block whitespace-no-wrap w-full flex  items-center flex"
                    ><iconEdit class="mr-2"/>Edit
                  </button>
</li>
<li>
                  <button
                    class="rounded-b bg-gray-500 hover:bg-gray-700 py-2 px-4 block whitespace-no-wrap w-full items-center flex border-t border-l-0 border-r-0 border-b-0 border-gray-600"
                     @click="$emit('deleteBooking')" ><iconDelete class="mr-2"/>Delete
                  </button>
</li>


</ul></div>
</template>
 
<style>

</style>