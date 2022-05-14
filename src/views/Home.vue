<script setup>
import { ref, computed } from "vue";
import { eventManager } from "../scripts/eventManager.js";
import BaseScheduleList from "../components/BaseScheduleList.vue";
// import BasePopupCreate from "../components/BasePopupCreate.vue";
import BasePopupEdit from "../components/BasePopupEdit.vue";
// import iconPlus from "../components/icons/IconPlus.vue";
import BasePopupConfirm from "../components/BasePopupConfirm.vue";


const bookingList = computed(() => eventManager.eventList);
// const eventCategories = computed(() => eventManager.eventCategories);
// const isShowCreateModal = ref(false);
const isShowDeleteBookingConfirm = ref(false)
const selectedBookingId = ref(0);
const editingBooking = ref({})

const selectBooking = (id) => {
  if (selectedBookingId.value === id) {
    selectedBookingId.value = 0
  } else {
    selectedBookingId.value = id
  }
}

// const toggleCreateModal = () => {
//   isShowCreateModal.value = !isShowCreateModal.value;
// }

const toggleDeleteConfirm = () => {
  isShowDeleteBookingConfirm.value = !isShowDeleteBookingConfirm.value
}

// const createBooking = (booking,e) => {
//   e.preventDefault();
//   eventManager.createEvent(booking);
//  toggleCreateModal();
// };

const editBooking = async () => {
  editingBooking.value = await eventManager.getEventById(selectedBookingId.value);
} 

const updateEditingBooking = (booking,e) => {
  e.preventDefault();
  eventManager.editEvent(booking)
  editingBooking.value = {}
  selectBooking(0)
}

const deleteBooking = () => {
  eventManager.deleteEvent(selectedBookingId.value)
  toggleDeleteConfirm()
  selectBooking(0)
}


</script>

<template>
  <div class="pb-64">
   
    <BaseScheduleList :bookingList="bookingList" :selectedBookingId="selectedBookingId" @selectBooking="selectBooking" @editBooking="editBooking" @deleteBooking="toggleDeleteConfirm"/>
    <!-- :selectedBookingId="selectedBookingId" @selectBooking="selectBooking" -->
     <!-- <BasePopupCreate
      v-show="isShowCreateModal"
      :eventCategories="eventCategories"
      @closeCreateModal="toggleCreateModal"
    /> -->
    <BasePopupConfirm v-show="isShowDeleteBookingConfirm" @closeConfirmModal="toggleDeleteConfirm"
      @deleteBooking="deleteBooking" />
    <BasePopupEdit v-show="Object.keys(editingBooking).length > 0" @closeEditModal="editingBooking = {}" :editingBooking="editingBooking"
      @editBooking="updateEditingBooking" />
  </div>
</template>

<style>
</style>