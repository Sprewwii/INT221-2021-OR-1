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


const eventCategories = computed(() => eventManager.eventCategories);
const showInsertDate = ref(false)
const filterDate = (date) => eventManager.getEventDate(date)

const filterFetch = ref();

const bookingList = computed(() => eventManager.eventList);

// const eventCategories = computed(() => eventManager.eventCategories);
// const isShowCreateModal = ref(false);
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

// const filterBookingsPast = computed(() => bookingList.value.filter((booking) => validation.isPast(new Date(booking.startTime))))

// <div class="ml-64 mt-16 w-full">
const date = ref("04/11/2023");
const a = () => {
  console.log("abc")
}


</script>

<template>
  <div class="ml-64 mt-16 w-3/4">

    <!-- <button @click="date = '04/25/2023'">click</button> -->
    <!-- <div class="ml-32" inline-datepicker :data-date="date"><input inline-datepicker v-model="date"></div> -->
    <!-- <input class="ml-32" inline-datepicker data-date="04/11/2023"> -->
  <p class="ml-32">ควยเอ้ยยย</p>


    <div class="flex justify-between">
      <h1 class="text-gray-300 text-2xl mb-3 mr-8 ml-32 md:mx-16 lg:mx-32 font-medium select-none">
        Scheduled Events
      </h1>
      <BaseButtonFilter :eventCategories="eventCategories" />

    </div>
    <BaseScheduleList :bookingList="bookingList" :selectedBookingId="selectedBookingId" @selectBooking="selectBooking"
      @editBooking="editBooking" @deleteBooking="toggleDeleteConfirm" />
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