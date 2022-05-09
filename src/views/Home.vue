<script setup>
import { ref, onBeforeMount, computed } from "vue"
import BaseScheduleList from "../components/BaseScheduleList.vue"
import BasePopupCreate from "../components/BasePopupCreate.vue"
import { eventManager } from "../scripts/eventManager.js"
import iconPlus from "../components/icons/IconPlus.vue"
import BasePopupConfirm from "../components/BasePopupConfirm.vue"
//อาจจะเป็น computed ถ้าตอน update/delete แล้ว table ไม่เปลี่ยน
const bookingList = computed(() => eventManager.eventList)
const eventCategories = computed(() => eventManager.eventCategories)
const isShowCreateModal = ref(false)

const createBooking = (booking, e) => {
  e.preventDefault();
  eventManager.createEvent(booking)
  toggleCreateModal();
}

const toggleCreateModal = () => {
  isShowCreateModal.value = !isShowCreateModal.value
}

</script>

<template>
  <div class="mt-16 pb-64">
    <button @click="toggleCreateModal" class="mr-32 mb-32 fixed bottom-0 right-0 z-40">
      <iconPlus class="opacity-80 shadow-2xl hover:opacity-100" />
    </button>
    <BasePopupCreate v-show="isShowCreateModal" :eventCategories="eventCategories" @closeCreateModal="toggleCreateModal"
      @createEvent="createBooking" />
    <BaseScheduleList :bookingList="bookingList" />
  </div>
</template>

<style>
</style>