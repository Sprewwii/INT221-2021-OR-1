<script setup>
import { ref, computed } from "vue";
import { userManager } from "../scripts/userManager.js";
import { validation } from "../scripts/validation.js";
import BaseUserList from "../components/BaseUserList.vue";
import BasePopupEdit from "../components/BasePopupEdit.vue";
import BasePopupConfirm from "../components/BasePopupConfirm.vue";
import BasePopupSuccess from "../components/BasePopupSuccess.vue";

const userList = computed(() => userManager.userList);
const selectedUserId = ref(0);
const editingBooking = ref({});

// const noUsersMessage = ref("");
const isShowDeleteBookingConfirm = ref(false);
// const popupSuccessText = ref(null)

const selectUser = (id) => {
  console.log("dsad")
  if (selectedUserId.value === id) {
    selectedUserId.value = 0;
  } else {
    selectedUserId.value = id;
  }
};

// const editBooking = async () => {
//   editingBooking.value = await eventManager.getEventById(
//     selectedBookingId.value
//   );
//   editingBooking.value.currentStartTime = editingBooking.value.startTime;
// };

// const updateEditingBooking = (booking, e) => {
//   e.preventDefault();
//   eventManager.editEvent(booking);
//   editingBooking.value = {};
//   selectBooking(0);
//   popupSuccessText.value = "Edit Booking"
// };

const toggleDeleteConfirm = () => {
  isShowDeleteBookingConfirm.value = !isShowDeleteBookingConfirm.value;
};

const toggleSuccessText

const deleteUser = () => {
  userManager.deleteUser(selectedUserId.value);
  toggleDeleteConfirm();
  selectUser(0);
};

// const setNoEventMessage = (message) => {
//   noEventMessage.value = message
// }
</script>

<template>
  <div class="ml-64 mt-14 w-full pr-80 mb-24">
    <div class="flex justify-between items-center">
      <h1 class="text-gray-300 text-2xl mr-8 ml-32 md:mx-16 lg:mx-32 font-medium select-none inline-block align-middle">
        User List  
      </h1>

    </div>
    <BaseUserList :userList="userList" :selectedUserId="selectedUserId" @selectUser="selectUser" @editUser="editUser"
      @deleteUser="toggleDeleteConfirm" class="pr-12" />

    <!-- <BaseUserList :userList="userList" :selectedUserId="selectedUserId"
      :noUsersWarning="noUsersMessage" @selectBooking="selectBooking" @editBooking="editBooking"
      @deleteBooking="toggleDeleteConfirm" class="pr-12" /> -->

    <!-- <BasePopupSuccess v-show="popupSuccessText" :popupSuccessText="popupSuccessText"
      @closeSuccessModal="popupSuccessText = null" /> -->
    <BasePopupConfirm v-show="isShowDeleteBookingConfirm" @closeConfirmModal="toggleDeleteConfirm"
      @deleteBooking="deleteUser" />
    <!-- <BasePopupEdit v-show="Object.keys(editingBooking).length > 0" @closeEditModal="editingBooking = {}"
      :editingBooking="editingBooking" @editBooking="updateEditingBooking" />  -->
  </div>

</template>

<style>
</style>