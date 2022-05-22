<script setup>
import { ref, computed } from "vue";
import { eventManager } from "../scripts/eventManager.js";
import BaseScheduleList from "../components/BaseScheduleList.vue";
// import BasePopupCreate from "../components/BasePopupCreate.vue";
import BasePopupEdit from "../components/BasePopupEdit.vue";
// import iconPlus from "../components/icons/IconPlus.vue";
import BasePopupConfirm from "../components/BasePopupConfirm.vue";
import BaseButtonFilter from "../components/BaseButtonFilter.vue";
import { validation } from "../scripts/validation.js";
import BaseClock from "../components/BaseClock.vue"

const eventCategories = computed(() => eventManager.eventCategories);
const bookingList = computed(() => eventManager.eventList);

const noEventsWarning = ref("No Scheduled Event");
const isShowDeleteBookingConfirm = ref(false);
const selectedBookingId = ref(0);
const editingBooking = ref({});

const selectBooking = (id) => {
  if (selectedBookingId.value === id) {
    selectedBookingId.value = 0;
  } else {
    selectedBookingId.value = id;
  }
};

// const toggleCreateModal = () => {
//   isShowCreateModal.value = !isShowCreateModal.value;
// }

const toggleDeleteConfirm = () => {
  isShowDeleteBookingConfirm.value = !isShowDeleteBookingConfirm.value;
};

// const createBooking = (booking,e) => {
//   e.preventDefault();
//   eventManager.createEvent(booking);
//  toggleCreateModal();
// };

const editBooking = async () => {
  editingBooking.value = await eventManager.getEventById(
    selectedBookingId.value
  );
};

const updateEditingBooking = (booking, e) => {
  e.preventDefault();
  eventManager.editEvent(booking);
  editingBooking.value = {};
  selectBooking(0);
};

const deleteBooking = () => {
  eventManager.deleteEvent(selectedBookingId.value);
  toggleDeleteConfirm();
  selectBooking(0);
};

const changeFilterCategory = (categoryNumber) => {
  
  if(categoryNumber === "0" || categoryNumber === "3" || categoryNumber === "4") noEventsWarning.value = "No Scheduled Events"
  else if(categoryNumber === "1") noEventsWarning.value = "No Past Events"
    else if(categoryNumber === "2") noEventsWarning.value = "No On-Going or Upcoming Events"
    console.log(noEventsWarning.value + typeof categoryNumber)
}

// const filterBookingsPast = computed(() => bookingList.value.filter((booking) => validation.isPast(new Date(booking.startTime))))

// <div class="ml-64 mt-16 w-full">

</script>

<template>
  <div class="ml-64 mt-16 w-full pr-80">
    <!-- <button @click="date = '04/25/2023'">click</button> -->
    <!-- <div class="ml-32" inline-datepicker :data-date="date"><input inline-datepicker v-model="date"></div> -->
    <!-- <input class="ml-32" inline-datepicker data-date="04/11/2023"> -->


    <div class="flex justify-between items-center">
      <h1 class="text-gray-300 text-2xl mr-8 ml-32 md:mx-16 lg:mx-32 font-medium select-none inline-block align-middle">
        Scheduled Events
      </h1>
      <BaseClock/>
      <BaseButtonFilter :eventCategories="eventCategories" @changeFilterCategory="changeFilterCategory"/>

    </div>
    <BaseScheduleList :bookingList="bookingList" :selectedBookingId="selectedBookingId" :noEventsWarning="noEventsWarning" @selectBooking="selectBooking"
      @editBooking="editBooking" @deleteBooking="toggleDeleteConfirm" class="pr-12"/>
    <!-- :selectedBookingId="selectedBookingId" @selectBooking="selectBooking" -->
    <!-- <BasePopupCreate
      v-show="isShowCreateModal"
      :eventCategories="eventCategories"
      @closeCreateModal="toggleCreateModal"
    /> -->
    <BasePopupConfirm v-show="isShowDeleteBookingConfirm" @closeConfirmModal="toggleDeleteConfirm"
      @deleteBooking="deleteBooking" />
    <BasePopupEdit v-show="Object.keys(editingBooking).length > 0" @closeEditModal="editingBooking = {}"
      :editingBooking="editingBooking" @editBooking="updateEditingBooking" />
  </div>

</template>

<style>
</style>