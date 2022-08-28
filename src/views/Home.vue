<script setup>
import { ref, computed } from "vue";
import { eventManager } from "../scripts/eventManager.js";
import { validation } from "../scripts/validation.js";
import BaseScheduleList from "../components/BaseScheduleList.vue";
import BasePopupEdit from "../components/BasePopupEdit.vue";
import BasePopupConfirm from "../components/BasePopupConfirm.vue";
import BasePopup from "../components/BasePopup.vue";
import BaseButtonFilter from "../components/BaseButtonFilter.vue";

const bookingList = computed(() => eventManager.eventList);
const eventCategories = computed(() => eventManager.eventCategories);
const selectedBookingId = ref(0);
const editingBooking = ref({});

const noEventMessage = ref("");
const isShowDeleteBookingConfirm = ref(false);
const popupSuccessText = ref(null)

const selectBooking = (id) => {
  if (selectedBookingId.value === id) {
    selectedBookingId.value = 0;
  } else {
    selectedBookingId.value = id;
  }
};

const editBooking = async () => {
  editingBooking.value = await eventManager.getEventById(
    selectedBookingId.value
  );
  editingBooking.value.currentStartTime = editingBooking.value.startTime;
};

const updateEditingBooking = (booking, e) => {
  e.preventDefault();
  eventManager.editEvent(booking);
  editingBooking.value = {};
  selectBooking(0);
  popupSuccessText.value = "Edit Booking"
};

const toggleDeleteConfirm = () => {
  isShowDeleteBookingConfirm.value = !isShowDeleteBookingConfirm.value;
};

const deleteBooking = () => {
  eventManager.deleteEvent(selectedBookingId.value);
  toggleDeleteConfirm();
  selectBooking(0);
};

const setNoEventMessage = (message) => {
  noEventMessage.value = message
}
</script>

<template>
  <div class="ml-64 mt-14 w-full pr-80 mb-24">
    <div class="flex justify-between items-center">
      <h1 class="text-gray-300 text-2xl mr-8 ml-32 md:mx-16 lg:mx-32 font-medium select-none inline-block align-middle">
        Scheduled Events
      </h1>
      <BaseButtonFilter :eventCategories="eventCategories" @noEventMessage="setNoEventMessage" />
    </div>
    <BaseScheduleList :bookingList="bookingList" :selectedBookingId="selectedBookingId"
      :noEventsWarning="noEventMessage" @selectBooking="selectBooking" @editBooking="editBooking"
      @deleteBooking="toggleDeleteConfirm" class="pr-12" />
        <BasePopup v-show="popupText" :popupText="popupText" :popupType="'success'"
      @closePopup="popupText = null" />
    <BasePopupConfirm v-show="isShowDeleteBookingConfirm" @closeConfirmModal="toggleDeleteConfirm"
      @deleteBooking="deleteBooking" />
    <BasePopupEdit v-show="Object.keys(editingBooking).length > 0" @closeEditModal="editingBooking = {}"
      :editingBooking="editingBooking" @editBooking="updateEditingBooking" />
  </div>

</template>

<style>
</style>