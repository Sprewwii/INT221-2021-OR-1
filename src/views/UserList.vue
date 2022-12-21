<script setup>
import { ref, computed } from "vue"
import { userManager } from "../scripts/userManager.js"
import { validation } from "../scripts/validation.js"
import { deviceManager } from "../scripts/deviceManager.js"
import BaseUserList from "../components/usersPage/BaseUserList.vue"
import BaseUserListSmall from "../components/usersPage/BaseUserListSmall.vue"
import BasePopupEditUser from "../components/usersPage/BasePopupEditUser.vue"
import BasePopupConfirm from "../components/global/BasePopupConfirm.vue"
import BasePopup from "../components/global/BasePopup.vue"
import BasePopupCreateUser from "../components/usersPage/BasePopupCreateUser.vue"
import BaseLoadingPopup from "../components/global/BaseLoadingPopup.vue"
import IconPlus from "../components/icons/IconPlus.vue"
import { useRouter } from "vue-router"

const router = useRouter()

const userList = computed(() => userManager.userList)
const selectedUserId = ref(0)
const editingUser = ref({})
const showingModal = ref("")
const isLoading = ref(false)
const popupMessage = ref({})
const popupConfirmMessage = ref({})

const selectUser = (id) => {
  if (selectedUserId.value === id) {
    selectedUserId.value = 0
  } else {
    selectedUserId.value = id
  }
}

const createUser = () => {
  showingModal.value = "create"
}

const editUser = async () => {
  showingModal.value = "edit"
  userManager.selectedUser = await userManager.getUserById(selectedUserId.value)
  userManager.selectedUser = { ...userManager.selectedUser, currentName: userManager.selectedUser.name, currentEmail: userManager.selectedUser.email, currentRole: userManager.selectedUser.role }
}

const updateEditingUser = async (user, e) => {
  console.log("edit")
  e.preventDefault()
  isLoading.value = true
  if (user) {
    const response = await userManager.editUser(user)
    isLoading.value = false
    if (response === true) {
      editingUser.value = {}
      selectUser(0)
      toggleModal("")
      popupMessage.value = { text: "Edit User Success !", type: "success" }
    } else {
      console.log("123")
      popupMessage.value = { text: "Edit User Error !", type: "error", header: "Edit" }
    }
  }
  console.log(isLoading.value)
}

const toggleModal = (modal) => {
  if (showingModal.value === "") showingModal.value = modal
  else showingModal.value = ""
}

const showDeleteUserPopup = async () => {
  const role = userManager.getUserByIdInLocal(selectedUserId.value).role
  if (role === "lecturer") {
    const response = await userManager.checkLecturer(selectedUserId.value)
    console.log("this check response")
    console.dir(response)
    if (response === true) {
      popupConfirmMessage.value = {
        header: 'This User Is Lecturer'
        , text: 'Are you sure to delete this user ?'
      }
    } else {
      showPopup({ text: response, type: "error", header: "Delete" })
}
  } 
  else {
  popupConfirmMessage.value = {
    header: 'Delete User'
    , text: 'Are you sure to delete this user ?'
  }
}
toggleModal('delete')
}

const deleteUser = async () => {
  const response = await userManager.deleteUser(selectedUserId.value)
  console.log("this deleteresponse")
  console.dir(response)

  if (response === true) {
    showPopup({ text: "Delete User Successful !", type: "success", header: "Delete" })
  }
  else {
    showPopup({ text: response, type: "error", header: "Delete" })
    // showPopup({ text: `is the owner of ${response}. You cannot delete this user account since Olarn Rojanapornpun is the only owner of ${response}. Another owner must be added to the event category(s) before this lecturer can be deleted.`, type: "error", header: "Delete" })
  }
  toggleModal('delete')
  selectUser(0)
}

const showPopup = (newPopup) => {
  if (newPopup && newPopup.type === 'success') {

    if (showingModal.value === 'create') toggleModal('create')
    if (showingModal.value === 'login') toggleModal('login')
  }

  popupMessage.value = newPopup
}

const backToPrevious = () => {
  router.go(-1)
}

const matching = async (user, e) => {
  e.preventDefault()
  const response = await userManager.matchingPassword(user)
  if (response === true) {
    // showingPopup.value = 'login'
    showPopup({ text: "Password Match !", type: "success", header: "Match" })
  } else {
    showPopup({ text: response, type: "error", header: "Match" })
  }
}

function setLoading(loading) {
  isLoading.value = loading
}
</script>

<template>
  <div class="pl-8 lg:pl-[255px] w-full pb-16 pt-32 w-full">
    <div class="flex justify-between items-center mt-2 w-full">
      <h1
        class="w-full text-gray-300 font-medium text-2xl lg:ml-28 font-[400] select-none inline-block align-middle tracking-normal">
        User List
      </h1>
      <button
        class="mr-12 w-[250px] h-[50px] text-manapurple-100 group relative inline-block overflow-hidden border border-manapurple-100 rounded-xl focus:outline-none"
        @click="createUser()">
        <span
          class="absolute inset-y-0 left-0 w-[0px] bg-manapurple-100 transition-all group-hover:w-full group-active:bg-manapurple-100"></span>
        <span
          class="relative tracking-wider sm:text-lg transition-colors group-hover:text-white flex gap-x-2 justify-center">
          <IconPlus width="1.5em" height="1.5em" fill="#A5ADF0" /> Create User
        </span>
      </button>
    </div>
    <BaseUserList v-if="deviceManager.deviceWidth >= 1024" :userList="userList" :selectedUserId="selectedUserId"
      @selectUser="selectUser" @editUser="editUser" @deleteUser="showDeleteUserPopup" class="pr-12" />
    <BaseUserListSmall v-else :userList="userList" :selectedUserId="selectedUserId" @selectUser="selectUser"
      @editUser="editUser" @deleteUser="showDeleteUserPopup" class="pr-12" />

    <BasePopup v-show="Object.keys(popupMessage).length !== 0" :popupMessage="popupMessage"
      @closePopup="popupMessage = {}" />

    <BasePopupCreateUser v-show="showingModal === 'create'" @showPopup="showPopup"
      @closeCreateModal="toggleModal('create')" @setLoading="setLoading" />

    <BasePopupConfirm v-show="showingModal === 'delete'" :popupMessage="popupConfirmMessage"
      @closeConfirmModal="toggleModal('delete')" @deleteBooking="deleteUser" />

    <BasePopupEditUser v-show="showingModal === 'edit'" @closeEditModal="
      toggleModal('edit');
    userManager.selectedUser = {};
    " :editingUser="editingUser" @editUser="updateEditingUser" />

    <BaseLoadingPopup v-show="isLoading" />

    <BaseMatchPassword v-show="showingModal === 'match'" @closeEditModal="toggleModal('match')" @matching="matching" />
  </div>
</template>

<style>

</style>
