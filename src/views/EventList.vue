<script setup>
import { ref, computed } from "vue"
import { eventManager } from "../scripts/eventManager.js"
import { userManager } from "../scripts/userManager.js"
import { deviceManager } from "../scripts/deviceManager.js";
import { validation } from "../scripts/validation.js"
import BaseEventList from "../components/eventsPage/BaseEventList.vue"
import BaseEventListSmall from "../components/eventsPage/BaseEventListSmall.vue"
import BaseHeader from "../components/appPage/BaseHeader.vue";
import BaseEditEventPopup from "../components/eventsPage/BaseEditEventPopup.vue"
import BasePopupConfirm from "../components/global/BasePopupConfirm.vue"
import BasePopup from "../components/BasePopup.vue"
import BaseButtonFilter from "../components/eventsPage/BaseButtonFilter.vue"
import IconCalendar from '../components/icons/IconCalendar.vue'
import BaseTest from "../components/BaseTest.vue"
import BasePopupCreate from "../components/BasePopupCreate.vue"

const eventList = computed(() => eventManager.eventList)
const eventCategories = computed(() => eventManager.eventCategories)
const selectedBookingId = ref(0)
const editingBooking = ref({})

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
  editingBooking.value = await eventManager.getEventById(
    selectedBookingId.value
  )
  editingBooking.value.currentStartTime = editingBooking.value.startTime
  if (editingBooking.value.pathFile) editingBooking.value.file = { name: getFileNameFromPath(editingBooking.value.pathFile) }
  editingBooking.value.isChangeFile = false

}

const updateEditingBooking = async (booking, e) => {
  e.preventDefault()
  let response = await eventManager.editEvent(booking)
  if(response === true){
    popupMessage.value = {text:"Edit Booking",type: 'success'}
  }else{
    popupMessage.value = response
  }

  editingBooking.value = {}
  selectBooking(0)
}

const toggleDeleteConfirm = () => {
  isShowDeleteBookingConfirm.value = !isShowDeleteBookingConfirm.value
}

// const toggleCreateModal = (booking, e) => {
//   e.preventDefault();
//   eventManager.createEvent(booking)
// }

const deleteBooking = () => {
  eventManager.deleteEvent(selectedBookingId.value)
  toggleDeleteConfirm()
  selectBooking(0)
}

const setNoEventMessage = (message) => {
  noEventMessage.value = message
}

const getFileNameFromPath = (path) => { if (path) return path.replace(/^.*[\\\/]/, "") }

</script>

<template>
  <div class="ml-4 pr-8 lg:ml-0 lg:pr-0 h-full top-0 z-0 pt-2 lg:pt-24">
    <!-- <BaseHeader :role="userManager.userInfo.role" @toggleCreateModal="isShowCreateBooking = true"/> -->
    <!-- <div class="px-12 ml-72 bg-managray-300/10  py-8 flex space-x-2 justify-between items-center">
      <div class="flex gap-2 justify-center items-center">
        <IconCalendar class="w-5 h-5" />
        <span class="text-managray-200">Hello, Today is</span><span class=" text-managray-100">{{ new
            Date().toLocaleString("en-US", { year: "numeric", month: "long", day: "2-digit", weekday: 'long' })
        }}</span>
      </div>
      <button v-if="userManager.userInfo.role !== 'lecturer'"
        class="w-1/5 h-[45px] text-white bg-gradient-to-l from-manapink-100 to-manapurple-100 group relative inline-block overflow-hidden rounded-xl"
        @click="$emit('toggleCreateModal')">
        <span
          class="absolute w-full opacity-0 group-hover:opacity-100 inset-y-0 left-0 text-white bg-gradient-to-r from-manapink-100 to-manapurple-100 transition-all duration-500"></span>

        <span
          class="relative text-sm font-medium transition-colors tracking-widest transition-all duration-300 flex gap-x-2 justify-center">
          Booking Event
        </span>
      </button>
    </div> -->

    <div class="ml-4 lg:ml-64 mt-4 lg:mt-10 lg:mr-12 mb-64">
      
      <div class="flex flex-col gap-y-4 sm:gap-y-0 sm:flex-row sm:justify-between sm:items-center mt-[100px] lg:mt-8 ml-4">
        <h1 class="w-full font-medium text-gray-300 text-2xl mr-8 lg:ml-28 font-[400] select-none inline-block align-middle tracking-normal">
          Scheduled Events 
        </h1>
        <BaseButtonFilter :eventCategories="eventCategories" @noEventMessage="setNoEventMessage" class="w-full flex justify-end"/>
      </div>
      <BaseEventList v-if="deviceManager.deviceWidth >= 1024" :bookingList="eventList" :selectedBookingId="selectedBookingId" :noEventsWarning="noEventMessage"
        @selectBooking="selectBooking" @editBooking="editBooking" @deleteBooking="toggleDeleteConfirm" />
        <BaseEventListSmall v-else :bookingList="eventList" :selectedBookingId="selectedBookingId" :noEventsWarning="noEventMessage"
        @selectBooking="selectBooking" @editBooking="editBooking" @deleteBooking="toggleDeleteConfirm" />
      <BasePopup v-show="Object.keys(popupMessage).length !== 0" :popupMessage="popupMessage"
        @closePopup="popupMessage = {}" />
      <BasePopupConfirm v-show="isShowDeleteBookingConfirm" :popupMessage="{header:'Delete Event', text:'Are you sure to delete this scheduled event ?'}" @closeConfirmModal="toggleDeleteConfirm"
        @deleteBooking="deleteBooking" />
      <BaseEditEventPopup v-show="Object.keys(editingBooking).length > 0" @closeEditEventPopup="editingBooking = {}"
        :editingBooking="editingBooking" @editBooking="updateEditingBooking" />
      <BasePopupCreate v-show="isShowCreateBooking"/>
    </div>
  </div>

</template>

<style scoped>



</style>