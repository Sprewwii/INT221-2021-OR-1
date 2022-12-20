<script setup>
import { ref, computed } from "vue"
import { eventManager } from "../scripts/eventManager.js"
import { userManager } from "../scripts/userManager.js"
import { deviceManager } from "../scripts/deviceManager.js"
import { validation } from "../scripts/validation.js"
import BaseEventList from "../components/eventsPage/BaseEventList.vue"
import BaseEventListSmall from "../components/eventsPage/BaseEventListSmall.vue"
import BaseHeader from "../components/appPage/BaseHeader.vue"
import BaseEditEventPopup from "../components/eventsPage/BaseEditEventPopup.vue"
import BasePopupConfirm from "../components/global/BasePopupConfirm.vue"
import BasePopup from "../components/global/BasePopup.vue"
import BaseLoadingPopup from "../components/global/BaseLoadingPopup.vue"
import BaseButtonFilter from "../components/eventsPage/BaseButtonFilter.vue"
import IconCalendar from '../components/icons/IconCalendar.vue'

const eventList = computed(() => eventManager.eventList)
const eventCategories = computed(() => eventManager.eventCategories)
const selectedBookingId = ref(0)
const editingBooking = ref({})
const isLoading = ref(false)

const noEventMessage = ref("You Don't have Scheduled Events")
const isShowDeleteBookingConfirm = ref(false)
const isShowCreateBooking = ref(false)
const popupMessage = ref({})

const selectBooking = (id) => {
  if (selectedBookingId.value === id) {
    selectedBookingId.value = 0
  } else {
    selectedBookingId.value = id
  }
}

const editBooking = async () => {
  editingBooking.value = await eventManager.getEventById(selectedBookingId.value)
  editingBooking.value.currentStartTime = editingBooking.value.startTime
  if (editingBooking.value.pathFile) editingBooking.value.file = { name: getFileNameFromPath(editingBooking.value.pathFile) }
  editingBooking.value.isChangeFile = false

}

const updateEditingBooking = async (booking, e) => {
  e.preventDefault()
  isLoading.value = true
  let response = await eventManager.editEvent(booking)
  console.log(response)
  if (response === true) {
    popupMessage.value = { text: "Edit Event Successful !", type: 'success' }
  } else {
    popupMessage.value = response
  }
  isLoading.value = false
  editingBooking.value = {}
  selectBooking(0)

  setTimeout(() => {
    if (isLoading.value === true) isLoading.value = false
  }, 5000)
}

const toggleDeleteConfirm = () => {
  isShowDeleteBookingConfirm.value = !isShowDeleteBookingConfirm.value
}

const deleteBooking = () => {
  isLoading.value = true
  eventManager.deleteEvent(selectedBookingId.value)
  toggleDeleteConfirm()
  selectBooking(0)
  isLoading.value = false

  setTimeout(() => {
    if (isLoading.value === true) isLoading.value = false
  }, 5000)
}

const setNoEventMessage = (message) => {
  noEventMessage.value = message
}

const getFileNameFromPath = (path) => { if (path) return path.replace(/^.*[\\\/]/, "") }

</script>

<template>
  <div class="ml-4 pr-8 lg:ml-0 lg:pr-0 h-full top-0 z-0 pt-2 lg:pt-24">
    <div class="ml-4 lg:ml-64 mt-4 lg:mt-10 lg:mr-12 mb-64">
      <div class="flex flex-row gap-y-4 sm:gap-y-0 justify-between items-center mt-[100px] lg:mt-8 ml-4">
        <h1
          class="w-60 font-medium text-gray-300 text-2xl lg:ml-28 font-[400] select-none inline-block align-middle tracking-normal">
          Scheduled Events
        </h1>
        <BaseButtonFilter :eventCategories="eventCategories" @noEventMessage="setNoEventMessage"
          class="w-full flex justify-end" />
      </div>
      <BaseEventList v-if="deviceManager.deviceWidth >= 1024" :bookingList="eventList"
        :selectedBookingId="selectedBookingId" :noEventsWarning="noEventMessage" @selectBooking="selectBooking"
        @editBooking="editBooking" @deleteBooking="toggleDeleteConfirm" />
      <BaseEventListSmall v-else :bookingList="eventList" :selectedBookingId="selectedBookingId"
        :noEventsWarning="noEventMessage" @selectBooking="selectBooking" @editBooking="editBooking"
        @deleteBooking="toggleDeleteConfirm" />
      <BasePopup v-show="Object.keys(popupMessage).length !== 0" :popupMessage="popupMessage"
        @closePopup="popupMessage = {}" />
      <BasePopupConfirm v-show="isShowDeleteBookingConfirm"
        :popupMessage="{ header: 'Delete Event', text: 'Are you sure to delete this scheduled event ?' }"
        @closeConfirmModal="toggleDeleteConfirm" @deleteBooking="deleteBooking" />
      <BaseLoadingPopup v-show="isLoading" />
      <BaseEditEventPopup v-show="Object.keys(editingBooking).length > 0" @closeEditEventPopup="editingBooking = {}"
        :editingBooking="editingBooking" @editBooking="updateEditingBooking" />
      <BasePopupCreate v-show="isShowCreateBooking" />
    </div>
  </div>

</template>

<style scoped>

</style>