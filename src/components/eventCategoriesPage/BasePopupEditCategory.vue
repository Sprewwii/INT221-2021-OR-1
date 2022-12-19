<script setup>
import { ref, computed } from "vue"
import IconClose from "../icons/IconClose.vue"
import { eventManager } from "../../scripts/eventManager.js"
import { validation } from "../../scripts/validation.js"
import { decorator } from "../../scripts/decorator.js"


const props = defineProps({
    editingCategory: {
        type: Object,
        default: {}
    }

})

function a() {
}

defineEmits(['editCategory', 'closeEditModal'])

const editingCategory = computed(() => props.editingCategory)
editingCategory.currentCategoryName = props.editingCategory.categoryName
const isCategoryNameUnique = ref(true)
</script>
<template>
    <div
        class="bg-black/60 z-50 h-screen w-full overflow-y-auto overflow-x-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 justify-center items-center">
        <div
            class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 relative p-4 w-full max-w-md h-auto">
            <div class="relative rounded-lg shadow bg-managray-100/10 backdrop-blur-xl" id="popupEdit">
                <button type="button" @click="$emit('closeEditModal'); isCategoryNameUnique = true"
                    class="absolute top-3 right-2.5 text-gray-400 mt-2 mr-4 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                    <IconClose />
                </button>

                <div class="py-6 px-6 lg:px-8">
                    <h3 class="mb-4 text-2xl font-medium text-white">Edit Event Category</h3>
                    <form class="space-y-8">

                        <div>
                            <label for="name" class="block mb-3 text-sm font-medium text-neutral-300">Name</label>
                            <input v-model="editingCategory.categoryName" name="name" id="name" type="text"
                                @blur="editingCategory.categoryName = editingCategory.categoryName.trim();"
                                :class="[validation.validateLengthAndNotNull(editingCategory.categoryName, 1, 100) && isCategoryNameUnique ? decorator.normalFormBorder : decorator.redFormBorder]"
                                class="text-sm rounded-lg block w-full p-2.5 bg-managray-100/20 border placeholder-neutral-400 text-white"
                                placeholder="Example OR-1" required>
                            <p v-if="editingCategory.categoryName === ''" class="text-sm text-red-400 absolute mt-1">*
                                Enter category name.</p>
                            <p v-else-if="!isCategoryNameUnique" class="text-sm text-red-400 absolute mt-1">* This
                                category name has been used </p>
                            <div v-if="editingCategory.categoryName" class="flex justify-end">
                                <p :class="{ 'text-red-400': editingCategory.categoryName.length > 100 }"
                                    class="text-sm text-gray-500 absolute mt-1">
                                    {{ editingCategory.categoryName.length }}/100</p>
                            </div>
                        </div>
                        <div>
                            <label for="duration"
                                class="block mb-3 text-sm font-medium text-neutral-300">Duration</label>
                            <div class="flex flex-row items-center">
                                <input v-model="editingCategory.categoryDuration" name="duration" id="duration"
                                    type="number" min="1" max="480"
                                    :class="[validation.validateCategoryDuration(editingCategory.categoryDuration) ? decorator.normalFormBorder : decorator.redFormBorder]"
                                    class="w-1/2 text-sm rounded-lg block w-full p-2.5 bg-managray-100/20 border placeholder-neutral-400 text-white"
                                    required>
                                <p class="text-neutral-400 ml-4">minutes</p>

                            </div>
                            <p v-if="!validation.validateCategoryDuration(editingCategory.categoryDuration)"
                                class="text-sm text-red-400 absolute mt-1">* Duration must between 1 to 480 minutes.</p>
                        </div>
                        <div>
                            <label for="description"
                                class="block mb-3 text-sm font-medium text-neutral-300">Description</label>
                            <textarea v-model="editingCategory.categoryDescription" name="description" id="description"
                                type="text"
                                :class="[validation.validateLength(editingCategory.categoryDescription, 500) ? decorator.normalFormBorder : decorator.redFormBorder]"
                                class="text-sm rounded-lg block w-full p-2.5 bg-managray-100/20 border placeholder-neutral-400 text-white"
                                placeholder="description..." required rows="5"></textarea>
                            <div v-if="editingCategory.categoryDescription" class="flex justify-end">
                                <p :class="{ 'text-red-400': editingCategory.categoryDescription.length > 500 }"
                                    class="text-sm text-gray-500 absolute mt-1">
                                    {{ editingCategory.categoryDescription.length }}/500</p>
                            </div>
                        </div>

                        <button
                            @click="$event.preventDefault(); isCategoryNameUnique = validation.validateUniqueCategoryName(editingCategory); validation.validateEditCategory(editingCategory) && isCategoryNameUnique ? $emit('editCategory', editingCategory.categoryName !== editingCategory.currentCategoryName ? editingCategory : { categoryId: editingCategory.categoryId, categoryDuration: editingCategory.categoryDuration, categoryDescription: editingCategory.categoryDescription }, $event) : ''"
                            class="w-full text-white bg-manapurple-100 tracking-wider transition-colors group-hover:text-white focus:ring-4 focus:outline-none focus:bg-manapurple-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-manapurple-100 dark:hover:bg-manapurple-100 dark:focus:bg-manapurple-100">Update</button>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>
 
<style>

</style>