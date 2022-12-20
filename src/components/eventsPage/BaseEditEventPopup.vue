<script setup>
import { ref, computed } from "vue"
import IconClose from "../icons/IconClose.vue"
import { eventManager } from "../../scripts/eventManager.js"
import { validation } from "../../scripts/validation.js"
import { decorator } from "../../scripts/decorator.js"

const props = defineProps({
  editingBooking: {
    type: Object,
    default: {},
  },
})

const emit = defineEmits(["editBooking", "closeEditEventPopup"])

const editingBooking = computed(() => props.editingBooking)

const showWarning = ref({
  dateTimePast: false,
  dateTimeOverlap: false,
  fileSize: false,
})

const validateDateTime = () => {
  showWarning.value.dateTimePast = validation.isPast(
    editingBooking.value.startTime
  )
  showWarning.value.dateTimeOverlap = validation.isOverlap(
    editingBooking.value
  )
}

const clearEditingBooking = () => {
  showWarning.value = {
    dateTimePast: false,
    dateTimeOverlap: false,
    fileSize: false,
  }
}

const previewFile = (e) => {
  if (!e.target.files[0]) {
    //ถ้าไม่มีไฟล์
    showWarning.value.fileSize = false
    editingBooking.value.previewFile = ""
    editingBooking.value.file = null
  } else if (e.target.files[0] && e.target.files[0].size <= 10485760) {
    //ถ้ามีไฟล์ และขนาดไม่เกิน
    editingBooking.value.previewFile = URL.createObjectURL(e.target.files[0])
    editingBooking.value.file = e.target.files[0]
    editingBooking.value.isChangeFile = true
    showWarning.value.fileSize = false
  } else {
    //ถ้าขนาดเกิน
    showWarning.value.fileSize = true
  }
}

const deleteFile = () => {
  showWarning.value.fileSize = false
  editingBooking.value.previewFile = null
  editingBooking.value.file = null
  editingBooking.value.isChangeFile = true
}

const editBooking = (e) => {
  console.log("edit")
  if(showWarning.value.dateTimePast || showWarning.value.dateTimeOverlap || showWarning.value.fileSize) return;
  emit('editBooking',{
      id: editingBooking.value.id,
      startTime:
        editingBooking.value.currentStartTime ==
          editingBooking.value.startTime
          ? null
          : new Date(editingBooking.value.startTime).toISOString(),
      note: editingBooking.value.note,
      isChangeFile: editingBooking.value.isChangeFile,
      file: editingBooking.value.file,
    },
    e
  )
  clearEditingBooking()
}

const getFileNameFromPath = (path) => path.replace(/^.*[\\\/]/, "")
</script>
<template>
  <div
    class="bg-black/60 z-50 h-screen w-full overflow-y-auto overflow-x-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 justify-center items-center">
    <div
      class="fixed bg-managray-300/20 backdrop-blur-md z-50 rounded-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 relative p-4 w-full max-w-md md:max-w-none sm:w-[760px] h-full md:h-auto">
      <div class="relative rounded-lg shadow" id="popupEdit">
        <button type="button" @click="
  $emit('closeEditEventPopup');
clearEditingBooking();
        "
          class="absolute top-3 right-2.5 text-gray-400 mt-2 mr-4 bg-transparent hover:bg-managray-200 hover:text-managray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
          <IconClose />
        </button>

        <div class="py-16 md:py-6 px-0 lg:px-8 h-full max-h-screen overflow-y-auto">
          <h3 class="mb-4 ml-8 text-2xl font-medium text-white">
            Edit Schedule Event
          </h3>
          <div class="flex flex-col items-center">
            <form class="w-full px-8 md:space-x-8 grid grid-cols-1 md:grid-cols-2">
              <div class="flex flex-col w-full space-y-8">
                <div>
                  <label for="name" class="block mb-2 text-sm font-medium text-gray-300">Name</label>
                  <div class="text-sm rounded-lg block w-full p-2.5 bg-managray-100/20 text-gray-400">
                    {{ editingBooking.name }}
                  </div>
                </div>
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-300">Email</label>
                  <div class="text-sm rounded-lg block w-full p-2.5 bg-managray-100/20 text-gray-400">
                    {{ editingBooking.email }}
                  </div>
                </div>
                <div>
                  <label for="category" class="block mb-2 text-sm font-medium text-gray-300">Choose Event
                    Category</label>
                  <div class="flex">
                    <div class="text-sm rounded-lg block w-7/12 p-2.5 bg-managray-100/20 text-gray-400">
                      {{ editingBooking.categoryName }}
                    </div>
                    <div class="ml-3 text-sm rounded-lg block w-5/12 p-2.5 bg-managray-100/20 text-gray-400">
                      {{ editingBooking.duration }} minutes
                    </div>
                  </div>
                </div>
                <div>
                  <label class="block mb-2 text-sm font-medium text-gray-300">Start Time</label>

                  <Datepicker v-model="editingBooking.startTime" :minDate="new Date()" dark @blur="validateDateTime()"
                    class="dp__theme_light" placeholder="Select Date" position="center" required />
                  <p v-if="showWarning.dateTimePast" class="text-sm text-red-400 absolute mt-1">
                    * Please choose future dates.
                  </p>
                  <p v-else-if="showWarning.dateTimeOverlap" class="text-sm text-red-400 absolute mt-1">
                    * Please choose another time.
                  </p>
                </div>
              </div>
              <div class="flex flex-col w-full space-y-8">
                <div class="mt-8">
                  <label for="note" class="block mb-2 text-sm font-medium text-gray-300">Note</label>
                  <textarea v-model="editingBooking.note" name="text" id="text" :class="[
                    validation.validateLength(editingBooking.note, 500)
                      ? decorator.normalFormBorder
                      : decorator.redFormBorder,
                  ]"
                    class="border text-sm rounded-lg block w-full p-2.5 bg-managray-100/10 placeholder-managray-400 text-white"
                    placeholder="detail...">
                  </textarea>
                  <div v-if="editingBooking.note" class="flex justify-end">
                    <p :class="{
                      'text-red-400': !validation.validateLength(
                        editingBooking.note,
                        500
                      ),
                    }" class="text-sm text-managray-500 relatives mt-1">
                      {{ editingBooking.note.length }}/500
                    </p>
                  </div>

                  <div>
                    <label for="file" class="block mb-3 text-sm mt-4 font-medium text-neutral-300">File</label>
                    <div className="h-[40px] flex items-center text-sm">
                      <input id="file" type="file" @change="previewFile($event)"
                        @click="(event) => (event.target.value = null)"
                        class="opacity-100 md:opacity-0 text-sm text-neutral-400 rounded-lg border border-managray-300 cursor-pointer" />
                      <span
                        className="pointer-events-none hidden absolute md:block text-manapurple-100 border border-manapurple-100 p-2 rounded-lg">Choose
                        File</span>
                      <span v-if="editingBooking.file" className="text-white p-2 rounded-lg">{{ editingBooking.file.name
                      }}</span>
                    </div>
                    <p v-if="showWarning.fileSize" class="text-sm text-red-400 absolute mt-1">
                      * The file size cannot be larger than 10 MB.
                    </p>
                    <img v-show="
                      editingBooking.file &&
                      editingBooking.file.type &&
                      editingBooking.file.type.match('image.*')
                    " :src="editingBooking.previewFile" alt="file"
                      class="w-[200px] max-h-[100px] object-scale-down mt-8 object-cover mx-auto" />
                    <div v-if="editingBooking.file" @click="deleteFile"
                      className="cursor-pointer text-xs w-20 z-40 text-white bg-red-500 hover:bg-violet-800 p-2 rounded-lg">
                      Delete File
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <button @click="
  editBooking
             
            "
              class="mt-12 w-[150px] text-white bg-manapurple-100 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-violet-600">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
