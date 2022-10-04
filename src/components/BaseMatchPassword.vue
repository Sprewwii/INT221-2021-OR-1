<script setup>
    import { ref, computed } from "vue"
    import IconClose from "./icons/IconClose.vue"
    import { eventManager } from "../scripts/eventManager.js"
    import { validation } from "../scripts/validation.js"
    import { decorator } from "../scripts/decorator.js"
    // const props = defineProps({
    //     editingBooking: {
    //         type: Object,
    //         default: {}
    //     }
    // })
    defineEmits(['editBooking', 'closeEditModal'])
    const user = ref({email: "", password: ""})
    // const editingBooking = computed(() => props.editingBooking)
    // const showWarning = ref({ dateTimePast: false, dateTimeOverlap: false })
    //     showWarning.value.dateTimeOverlap = validation.isOverlap(editingBooking.value)
    // }
    // const clearEditingBooking = () => {
    //     showWarning.value.dateTimePast = false
    //     showWarning.value.dateTimeOverlap = false
    // }
    </script>
    <template>
            <div
                class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  relative p-4 w-full max-w-md h-full md:h-auto">
                <div class="relative rounded-lg shadow" id="popupEdit">
                    <button type="button" @click="$emit('closeEditModal')"
                        class="absolute top-3 right-2.5 text-gray-400 mt-2 mr-4 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                        <IconClose />
                    </button>
    
                    <div class="py-6 px-6 lg:px-8">
                        <h3 class="mb-4 text-2xl font-medium text-white">Match Password</h3>
                        <form class="space-y-6">
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-300">Email</label>
                                <input
                                    class="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 text-white"
                                    v-model="user.email">
                            </div>
                            <div>
                                <label for="category" class="block mb-2 text-sm font-medium text-gray-300">Password</label>
                                <input class="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 text-white"
                                    v-model="user.password">
                            </div>
                            <button
                                @click="$emit('matching', user, $event)"
                                class="w-full text-white bg-violet-600 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-violet-600">Matching!</button>
                        </form>
                    </div>
                </div>
            </div>

    </template>