<script setup>
import { ref, computed } from "vue";
import { userManager } from "../scripts/userManager.js";
import { validation } from "../scripts/validation.js";
import { deviceManager } from "../scripts/deviceManager.js";
import BaseUserList from "../components/usersPage/BaseUserList.vue";
import BaseUserListSmall from "../components/usersPage/BaseUserListSmall.vue";
import BasePopupEditUser from "../components/usersPage/BasePopupEditUser.vue";
import BasePopupConfirm from "../components/BasePopupConfirm.vue";
import BasePopup from "../components/BasePopup.vue";
import BasePopupCreateUser from "../components/usersPage/BasePopupCreateUser.vue";
import BaseMatchPassword from "../components/BaseMatchPassword.vue";
import IconPlus from "../components/icons/IconPlus.vue"
// import BaseLogin from "../components/HomePage/BaseLogin.vue"
import { useRouter } from "vue-router"
const router = useRouter();

const userList = computed(() => userManager.userList);
const selectedUserId = ref(0);
const editingUser = ref({});
const showingModal = ref("");

// const isShowDeleteBookingConfirm = ref(false);
const popupMessage = ref({})

const selectUser = (id) => {
  if (selectedUserId.value === id) {
    selectedUserId.value = 0;
  } else {
    selectedUserId.value = id;
  }
};

const createUser = () => {
  showingModal.value = "create"
}

const editUser = async () => {
  showingModal.value = "edit"
  // editingUser.value = await userManager.getUserById(selectedUserId.value);
  // editingUser.value = { ...editingUser.value, currentName: editingUser.value.name, currentEmail: editingUser.value.email, currentRole: editingUser.value.role }
  userManager.selectedUser = await userManager.getUserById(selectedUserId.value);
  userManager.selectedUser = { ...userManager.selectedUser, currentName: userManager.selectedUser.name, currentEmail: userManager.selectedUser.email, currentRole: userManager.selectedUser.role }
};

const updateEditingUser = async (user, e) => {
  e.preventDefault();
  if (user) {
    const response = await userManager.editUser(user);
    if (response === true) {
      editingUser.value = {};
      selectUser(0);
      toggleModal("")
      popupMessage.value = { text: "Edit User Success !", type: "success" }
    }else {
      popupMessage.value = { text: response, type: "error" , header:"Edit"}
    }
  }
};

const toggleModal = (modal) => {
  if (showingModal.value === "") showingModal.value = modal
  else showingModal.value = ""
};


const deleteUser = () => {
  userManager.deleteUser(selectedUserId.value);
  toggleModal('delete')
  selectUser(0)
}

const showPopup = (newPopup) => {
  console.log("pop " + newPopup) 
  if (newPopup && newPopup.type === 'success'){ 
    
    if (showingModal.value === 'create')toggleModal('create')
    if (showingModal.value === 'login')toggleModal('login')
}
  
  popupMessage.value = newPopup
}

const backToPrevious = () => {
    router.go(-1)
}

const matching = async (user, e) => {
    e.preventDefault();
    const response = await userManager.matchingPassword(user)
    if (response === true) {
    // showingPopup.value = 'login'
    showPopup({ text: "Password Match !", type: "success", header: "Match" });
  } else {
    showPopup({ text: response, type: "error", header: "Match" });
  }
}
// showPopup({text:"Login Success !",type:"success",header:"Login"})

// const setNoEventMessage = (message) => {
//   noEventMessage.value = message
// }
</script>

<template>
  <div class="lg:ml-64 w-full lg:pr-80 mb-64 pt-32">
    <div class="flex justify-between items-center mt-2">
      <h1 class="w-full text-gray-300 font-medium text-2xl mr-8 ml-4 lg:ml-28 font-[400] select-none inline-block align-middle tracking-normal">
        User List
      </h1>
      <button
        class="flex w-48 items-center justify-center p-3 text-lg font-normal rounded-full text-white mx-10 transition ease-in-out delay-150 bg-purple-600 hover:-translate-y-1 hover:scale-110 hover:bg-purple-700 duration-300"
        @click="createUser()">
        <IconPlus width="1.5em" height="1.5em" fill="#ffffff" />
        <span class="ml-3">Create User</span>
      </button>
      <button
        class="flex w-48 items-center justify-center p-3 text-lg font-normal rounded-full text-white mx-10 transition ease-in-out delay-150 bg-purple-600 hover:-translate-y-1 hover:scale-110 hover:bg-purple-700 duration-300"
        @click="toggleModal('match')">
        <span class="ml-3">Match Password</span>
      </button>
      <button
        class="flex w-48 items-center justify-center p-3 text-lg font-normal rounded-full text-white mx-10 transition ease-in-out delay-150 bg-purple-600 hover:-translate-y-1 hover:scale-110 hover:bg-purple-700 duration-300"
        @click="userManager.refreshToken()">
        <span class="ml-3">refresh</span>
      </button>
    </div>
    <BaseUserList v-if="deviceManager.deviceWidth >= 1024" :userList="userList" :selectedUserId="selectedUserId" @selectUser="selectUser" @editUser="editUser"
      @deleteUser="toggleModal('delete')" class="pr-12" />
      <BaseUserListSmall v-else :userList="userList" :selectedUserId="selectedUserId" @selectUser="selectUser" @editUser="editUser"
      @deleteUser="toggleModal('delete')" class="pr-12" />

    <BasePopup v-show="Object.keys(popupMessage).length !== 0" :popupText="popupMessage.text" :popupType="popupMessage.type"
      :popupHeader="popupMessage.header" @closePopup="popupMessage = {}" />

    <BasePopupCreateUser v-show="showingModal === 'create'" @showPopup="showPopup"
      @closeCreateModal="toggleModal('create');" />

    <BasePopupConfirm v-show="showingModal === 'delete'" @closeConfirmModal="toggleModal('delete')"
      @deleteBooking="deleteUser" />

    <BasePopupEditUser v-show="showingModal === 'edit'" @closeEditModal="toggleModal('edit'); userManager.selectedUser = {}"
      :editingUser="editingUser" @editUser="updateEditingUser" />

    <!-- <BaseLogin v-show="showingModal === 'login'" @closeEditModal="toggleModal('login'); backToPrevious()" @loginUser="loginUser"
      @showPopup="showPopup" /> -->

    <BaseMatchPassword v-show="showingModal === 'match'" @closeEditModal="toggleModal('match')" @matching="matching"/>
  </div>

</template>

<style>
</style>