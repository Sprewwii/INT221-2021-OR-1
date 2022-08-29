<script setup>
import { ref, computed } from "vue";
import { userManager } from "../scripts/userManager.js";
import { validation } from "../scripts/validation.js";
import BaseUserList from "../components/BaseUserList.vue";
import BasePopupEditUser from "../components/BasePopupEditUser.vue";
import BasePopupConfirm from "../components/BasePopupConfirm.vue";
import BasePopup from "../components/BasePopup.vue";
import BasePopupCreateUser from "../components/BasePopupCreateUser.vue";
import IconPlus from "../components/icons/IconPlus.vue"
import BaseLogin from "../components/BaseLogin.vue"

const userList = computed(() => userManager.userList);
const selectedUserId = ref(0);
const editingUser = ref({});
const showingPopup = ref({});


// const noUsersMessage = ref("");
const isShowDeleteBookingConfirm = ref(false);
const popup = ref({})

const selectUser = (id) => {
  if (selectedUserId.value === id) {
    selectedUserId.value = 0;
  } else {
    selectedUserId.value = id;
  }
};

const createUser = () => {
  showingPopup.value = "create"
}

const editUser = async () => {
  showingPopup.value = "edit"
  editingUser.value = await userManager.getUserById(selectedUserId.value);
  editingUser.value = { ...editingUser.value, currentName: editingUser.value.name, currentEmail: editingUser.value.email, currentRole: editingUser.value.role}
};

const updateEditingUser = (user, e) => {
  e.preventDefault();
  if(user){
    userManager.editUser(user);
    editingUser.value = {};
    selectUser(0);
    toggleModal("")
    popup.value = "Edit User"
    }
};

const toggleModal = (modal) => {
  if(showingPopup.value === "") showingPopup.value = modal
  else showingPopup.value = ""
};


const deleteUser = () => {
  userManager.deleteUser(selectedUserId.value);
  toggleModal('delete')
  selectUser(0)
}

const popupLogin = () => {
  showingPopup.value = "login"
}

const loginUser = async (userLogin, e) => {
    e.preventDefault();
    let response = await userManager.login(userLogin)
    if(response === true){
      // showingPopup.value = 'login'
      showPopup({text:"Login Success !",type:"success"})
    }else{
      showPopup({text:response,type:"error"})
    }


        
}

const showPopup = (newPopup) => {
  console.log("pop "+newPopup) //มอสสึ แใ่
  if(newPopup && newPopup.type === 'success') toggleModal('create')
  popup.value = newPopup
}

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
            <button @click="popupLogin">Login</button> 
      <button
        class="flex w-48 items-center justify-center p-3 text-lg font-normal rounded-full text-white mx-10 transition ease-in-out delay-150 bg-purple-600 hover:-translate-y-1 hover:scale-110 hover:bg-purple-700 duration-300"
        @click="createUser()">
        <IconPlus width="1.5em" height="1.5em" fill="#ffffff" />
        <span class="ml-3">Create User</span>
      </button>
    </div>
    <BaseUserList :userList="userList" :selectedUserId="selectedUserId" @selectUser="selectUser" @editUser="editUser"
      @deleteUser="toggleModal('delete')" class="pr-12" />

    <BasePopup v-show="Object.keys(popup).length !== 0" :popupText="popup.text" :popupType="popup.type"
      @closePopup="popup = {}" />     
    
    <BasePopupCreateUser v-show="showingPopup === 'create'" @showPopup="showPopup" @closeCreateModal="toggleModal('create');"/> 

    <BasePopupConfirm v-show="showingPopup === 'delete'" @closeConfirmModal="toggleModal('delete')"
      @deleteBooking="deleteUser"/> 

    <BasePopupEditUser v-show="showingPopup === 'edit'" @closeEditModal="toggleModal('edit'); editingUser = {}"
      :editingUser="editingUser" @editingUser="updateEditingUser" /> 
    
    <BaseLogin v-show="showingPopup === 'login'" @closeEditModal="toggleModal('login')" @loginUser="loginUser" @showPopup="showPopup"/>
  </div>

</template>

<style>
</style>