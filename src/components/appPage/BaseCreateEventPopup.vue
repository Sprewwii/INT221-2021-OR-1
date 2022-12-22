<script setup>
import { ref, computed } from "vue"
import IconClose from "../icons/IconClose.vue"
import { eventManager } from "../../scripts/eventManager.js"
import { userManager } from "../../scripts/userManager.js"
import { validation } from "../../scripts/validation.js"
import { decorator } from "../../scripts/decorator.js"

const emit = defineEmits(["closeCreateEventPopup", "showPopup", "setLoading"])
// const imgInput = ref(null);
const eventCategories = computed(() => eventManager.eventCategories)
const creatingBooking = ref({})
const showWarning = ref({
  isName: false,
  isEmail: false,
  isCategory: false,
  isStartTime: false,
  create: false,
  email: false,
  dateTimePast: false,
  dateTimeOverlap: false,
  fileSize: false,
})

const validateEmail = () => {
  showWarning.value.email = !validation.isEmail(creatingBooking.value.email)
}

const validateDateTime = () => {
  if (!creatingBooking.value.startTime) return
  showWarning.value.dateTimePast = validation.isPast(
    creatingBooking.value.startTime
  )
  showWarning.value.dateTimeOverlap = validation.isOverlap(
    creatingBooking.value
  )
}

const previewFile = (e) => {
  if (!e.target.files[0]) { // If has file
    deleteFile()
  } else if (e.target.files[0] && e.target.files[0].size <= 10485760) { //If file size is ok
    creatingBooking.value.previewFile = URL.createObjectURL(e.target.files[0])
    creatingBooking.value.file = e.target.files[0]
    showWarning.value.fileSize = false
  } else { //If file size is larger than 10 mb
    showWarning.value.fileSize = true
  }
}

const createBooking = async (e) => {
  console.log(creatingBooking.value.file)
  if (userManager.userInfo.email && userManager.userInfo.role != "admin")
    creatingBooking.value.email = userManager.userInfo.email
  validateDateTime()
  e.preventDefault()
  showWarning.value.create = false
  showWarning.value.fileSize = false
  if (!creatingBooking.value.name) showWarning.value.isName = true
  if (!creatingBooking.value.email) showWarning.value.isEmail = true
  if (!creatingBooking.value.category) showWarning.value.isCategory = true
  if (!creatingBooking.value.startTime) showWarning.value.isStartTime = true
  if (!creatingBooking.value.file) creatingBooking.value.file = null

  for (let warning in showWarning.value) {
    if (warning != "create" && showWarning.value[warning] === true) {
      showWarning.value.create = true
    }
  }

  if (
    !showWarning.value.create &&
    (creatingBooking.value.name.length > 100 ||
      creatingBooking.value.email.length > 50 ||
      (creatingBooking.value.note && creatingBooking.value.note.length > 500))
  ) {
    showWarning.value.create = true
  }

  if (!showWarning.value.create) {
    emit('setLoading', true)
    const response = await eventManager.createEvent(creatingBooking.value)
    if(response === true){emit('showPopup',{
  text: 'Create Event Successful !',
  type: 'success',
  header: 'Create',
})}else{
  emit('showPopup',{
  text: 'This DateTime has been booked by someone',
  type: 'error',
  header: 'Create',
})
}
    clearCreatingBooking()

  }
}

function clearCreatingBooking() {
  showWarning.value = {
    isName: false,
    isEmail: false,
    isCategory: false,
    isStartTime: false,
    create: false,
    email: false,
    dateTimePast: false,
    dateTimeOverlap: false,
    fileSize: false,
  }
  creatingBooking.value = {}
  //   imgInput.value.target.value = null;
};

const deleteFile = () => {
  showWarning.value.fileSize = false
  creatingBooking.value.previewFile = null
  creatingBooking.value.file = null
  console.log("delete file")
}

function closeCreateEventPopup() {
  emit('closeCreateEventPopup')
  clearCreatingBooking()
}

</script>

<template>
  <div class="bg-black/60 h-screen w-full overflow-y-hidden overflow-x-hidden fixed z-50 justify-center items-center">
    <div
      class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 relative p-4 pt-8 w-full max-w-md md:max-w-none lg:w-[760px] h-full md:h-auto">
      <div class="relative rounded-lg bg-managray-300/20 backdrop-blur-md shadow-2xl w-full">
        <button type="button" @click="
          closeCreateEventPopup
        "
          class="absolute top-3 right-2.5 text-neutral-400 mt-2 mr-4 bg-transparent hover:bg-neutral-200 hover:text-neutral-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
          <IconClose />
        </button>

        <div class="pt-6 pb-32 md:pb-8 px-6 sm:pr-14 lg:pl-8 lg:pr-16 h-full max-h-screen overflow-y-auto ">
          <h3 class="mb-4 text-2xl font-medium text-white">
            Create Schedule Event
          </h3>

          <form class="grid grid-cols-1 md:grid-cols-2 w-full space-y-8 md:space-y-0 md:space-x-8 justify-center">
            <div class="space-y-8">
              <div>
                <label for="name" class="block mb-3 text-sm font-medium text-neutral-300">Name</label>
                <input v-model="creatingBooking.name" type="text" name="name" id="name" :class="[
                  validation.validateLength(creatingBooking.name, 100) &&
                    !showWarning.isName
                    ? decorator.normalFormBorder
                    : decorator.redFormBorder,
                ]"
                  class="text-sm rounded-lg block w-full p-2.5 bg-managray-100/20 border placeholder-neutral-400 text-white"
                  placeholder="Example OR-1" @blur="showWarning.isName = !creatingBooking.name" />
                <p v-show="showWarning.isName" class="text-sm text-red-400 absolute mt-1">
                  * Enter your name.
                </p>
                <div v-if="creatingBooking.name" class="flex justify-end">
                  <p :class="{
                    'text-red-400': !validation.validateLength(
                      creatingBooking.name,
                      100
                    ),
                  }" class="text-sm text-gray-500 absolute mt-1">
                    {{ creatingBooking.name.length }}/100
                  </p>
                </div>
              </div>
              <div v-if="(userManager.userInfo.role === 'guest' && !userManager.userInfo.email) || userManager.userInfo.role === 'admin'">
                <label for="email" class="block mb-3 text-sm font-medium text-neutral-300">Email</label>
                <input v-model="creatingBooking.email" name="email" id="email" type="text" :class="[
                  validation.validateLength(creatingBooking.email, 100) &&
                    !showWarning.isEmail &&
                    !showWarning.email
                    ? decorator.normalFormBorder
                    : decorator.redFormBorder,
                ]"
                  class="text-sm rounded-lg block w-full p-2.5 bg-managray-100/20 border placeholder-neutral-400 text-white"
                  placeholder="Example@mail.kmutt.ac.th" @blur="
  showWarning.isEmail = !creatingBooking.email;
validateEmail();
                  " />
                <p v-if="showWarning.isEmail" class="text-sm text-red-400 absolute mt-1">
                  * Enter your email.
                </p>
                <p v-else-if="showWarning.email" class="text-sm text-red-400 absolute mt-1">
                  * Email must be a valid email address.
                </p>
                <div v-if="creatingBooking.email" class="flex justify-end">
                  <p :class="{
                    'text-red-400': !validation.validateLength(
                      creatingBooking.email,
                      100
                    ),
                  }" class="text-sm text-gray-500 absolute mt-1">
                    {{ creatingBooking.email.length }}/100
                  </p>
                </div>
              </div>
              <div v-else>
                <label for="email" class="block mb-3 text-sm font-medium text-neutral-300">Email</label>
                <div
                  class="border text-sm rounded-lg block w-full p-2.5 bg-managray-100/10 border-gray-500 text-gray-400">
                  {{ userManager.userInfo.email }}
                </div>
              </div>
              <div>
                <label for="category" class="block mb-3 text-sm font-medium text-neutral-300">Choose Event
                  Category</label>
                <div class="flex">
                  <select @change="
  validateDateTime();
showWarning.isCategory = !creatingBooking.category;
                  " v-model="creatingBooking.category"
                    class="text-white bg-managray-100/10 border border-neutral-700 hover:bg-neutral-800 focus:outline-none focus:ring-violet-300 focus:border-violet-500 rounded-lg text-sm text-left inline-flex items-center">
                    <option value="" selected disabled hidden></option>
                    <option :value="eventCategory" v-for="(eventCategory, index) in eventCategories" :key="index">
                      {{ eventCategory.categoryName }}
                    </option>
                  </select>
                  <div
                    class="ml-3 border text-sm rounded-lg block w-3/4 p-2.5 bg-managray-100/10 border border-neutral-700 text-white">
                    <p v-if="!creatingBooking.category" class="text-neutral-400">
                      duration
                    </p>
                    <p v-else class="select-none">
                      {{ creatingBooking.category.categoryDuration }}
                      minutes
                    </p>
                  </div>
                </div>
                <p v-if="showWarning.isCategory" class="text-sm text-red-400 absolute mt-1">
                  * Enter your event category.
                </p>
              </div>
              <div>
                <label class="block mb-3 text-sm font-medium text-neutral-300">Start Time</label>
                <Datepicker v-model="creatingBooking.startTime" :minDate="new Date()" dark @blur="
  validateDateTime();
showWarning.isStartTime = !creatingBooking.startTime;
                " class="dp__theme_light" placeholder="Select Date" position="center" required />
                <p v-if="showWarning.isStartTime" class="text-sm text-red-400 absolute mt-1">
                  * Enter your event start time.
                </p>
                <p v-else-if="showWarning.dateTimePast" class="text-sm text-red-400 absolute mt-1">
                  * Please choose future dates.
                </p>
                <p v-else-if="showWarning.dateTimeOverlap" class="text-sm text-red-400 absolute mt-1">
                  * This DateTime has been booked by someone.
                </p>
              </div>
            </div>
            <div class="space-y-8 w-full">
              <div>
                <label for="note" class="block mb-3 text-sm font-medium text-neutral-300">Note</label>
                <textarea v-model="creatingBooking.note" name="text" id="text" :class="[
                  validation.validateLength(creatingBooking.note, 500)
                    ? decorator.normalFormBorder
                    : decorator.redFormBorder,
                ]"
                  class="text-sm rounded-lg block w-full p-2.5 bg-managray-100/10 border placeholder-neutral-400 text-white"
                  placeholder="detail...">
                  </textarea>
                <div v-if="creatingBooking.note" class="flex justify-end">
                  <p :class="{
                    'text-red-400': !validation.validateLength(
                      creatingBooking.note,
                      500
                    ),
                  }" class="text-sm text-gray-500 absolute mt-1">
                    {{ creatingBooking.note.length }}/500
                  </p>
                </div>
              </div>
              <div>
                <label for="file" class="block mb-3 text-sm font-medium text-neutral-300">File</label>
                <div className="h-[40px] flex items-start text-sm ">
                  <input id="file" type="file" @change="previewFile($event)" @click="event => event.target.value = null"
                    class="z-0 opacity-100 md:opacity-0 md:w-32 text-sm text-neutral-400 rounded-lg border border-gray-300 cursor-pointer" />
                  <button type="button"
                    class="pointer-events-none w-32 h-10 absolute text-manapurple-100 group hidden md:inline-block border border-manapurple-100  rounded-xl ">
                    Choose File
                  </button>
                  <span v-if="creatingBooking.file" className="hidden md:inline-block text-white p-2 rounded-lg">{{
                      creatingBooking.file.name
                  }}</span>

                </div>
                <p v-if="showWarning.fileSize" class="text-sm text-red-400 absolute mt-1">
                  * The file size cannot be larger than 10 MB.
                </p>
                <img v-if="
                creatingBooking.file && creatingBooking.file.type.match('image.*')"
                  :src="creatingBooking.previewFile" alt="file"
                  class="w-[200px] max-h-[100px] object-scale-down mt-8 object-cover mx-auto" />
                <div v-if="creatingBooking.file" @click="deleteFile"
                  className="mx-auto mt-2 cursor-pointer text-xs w-20 z-40 text-white bg-red-500 hover:bg-violet-800 p-2 rounded-lg">
                  Delete File</div>
              </div>
            </div>
          </form>

          <div class="mt-8 w-full flex justify-center">
            <button @click="createBooking($event)"
              class="w-[150px] h-[45px] text-white bg-gradient-to-l from-manapink-100 to-manapurple-100 group relative inline-block overflow-hidden rounded-xl">
              <span
                class="absolute w-full opacity-0 group-hover:opacity-100 inset-y-0 left-0 text-white bg-gradient-to-r from-manapink-100 to-manapurple-100 transition-all duration-500"></span>

              <span
                class="relative text-sm font-medium transition-colors tracking-widest group-hover:tracking-[0.5em] transition-all duration-300 flex gap-x-2 justify-center">
                CREATE
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style>
#popupCreate {
  background-color: #292b2e;
}

#inputeiei {
  background-color: #3c6eb9;
}
</style>