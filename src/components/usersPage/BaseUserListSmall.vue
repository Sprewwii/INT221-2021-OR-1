<script setup>
import { computed } from "vue"
import { userManager } from "../../scripts/userManager.js"
import { roles } from "../../scripts/roles.js"
import IconMenuKebabVue from "../icons/IconMenuKebab.vue";
import IconDelete from "../icons/IconDelete.vue";
import IconEdit from "../icons/IconEdit.vue";

const props = defineProps({
  userList: {
    type: Array,
    default: []
  },
  selectedUserId: { 
    type: Number,
    default: 0
  },
})

defineEmits(['selectUser', 'editUser', 'deleteUser'])

const selectedUserId = computed(() => props.selectedUserId)
const noUsersWarning = computed(() => props.noUsersWarning)
</script>

<template>
  <div class="mt-6 lg:mr-20 bg-red-500">
    <div class="relative bg-managray-300/20 rounded-2xl shadow-2xl font-[200]">
      <table class="text-center text-gray-200 select-none divide-y divide-managray-100/30">
        <thead class="text-xs text-gray-300 sm:text-sm tracking-wider">
          <tr>
            <th scope="col" class="px-6 py-3 w-4/12">Namess</th>
            <th colspan="2" class="px-6 py-3">
              <span class="sr-only">Details</span>
            </th>
          </tr>
        </thead>
        <tbody v-if="userList.length === 0">
          <td colspan="7" class="py-64 text-xl">No Users</td>
        </tbody>
        <tbody v-else v-for="user in userList" :key="user.userId">
          <tr class="text-gray-400 hover:bg-managray-300/30 text-center">
            <td scope="row" class="pl-6 py-2 w-full font-[200] text-white text-left">
              <router-link :to="{ name: 'UserDetails', params: { id: user.userId } }" class="hover:underline">
                {{ user.name }}
              </router-link>
              <p class="text-managray-100 text-sm"> {{ user.email }}</p>
              <p class="text-managray-100 text-sm"> {{ user.role }}</p>
            </td>
     
            <td class="pr-3">
              <div class="inline-block relative">
                <button @click="$emit('selectUser', user.userId)" class="p-3 text-white">
                  <IconMenuKebabVue />
                </button>
                <ul class="absolute text-white pt-1 z-10" v-show="selectedUserId === user.userId">
                  <li>
                    <button
                      class="rounded-t bg-gray-500 hover:bg-gray-700 py-2 px-4 block whitespace-no-wrap w-full flex items-center flex"
                      @click="$emit('editUser')">
                      <IconEdit class="mr-2" />Edit
                    </button>
                  </li>
                  <li>
                    <button
                      class="rounded-b bg-gray-500 hover:bg-gray-700 py-2 px-4 block whitespace-no-wrap w-full items-center flex border-t border-l-0 border-r-0 border-b-0 border-gray-600"
                      @click="$emit('deleteUser')">
                      <IconDelete class="mr-2" />Delete
                    </button>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
</style>
