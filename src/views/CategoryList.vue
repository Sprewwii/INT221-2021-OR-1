<script setup>
import { ref, computed } from "vue";
import BaseEventCategoryList from "../components/eventCategoriesPage/BaseEventCategoryList.vue"
import BasePopupEditCategory from "../components/BasePopupEditCategory.vue";
import BasePopup from "../components/BasePopup.vue";
import IconPlus from "../components/icons/IconPlus.vue";
import { eventManager } from "../scripts/eventManager.js"

const eventCategories = computed(() => eventManager.eventCategories);
const editingCategory = ref({})
const selectedCategoryId = ref(0);
const popupText = ref(null)

const selectCategory = (id) => {
  if (selectedCategoryId.value === id) {
    selectedCategoryId.value = 0
  } else {
    selectedCategoryId.value = id
  }
}

const editCategory = (eventCategory) => {
  editingCategory.value = { ...eventCategory, currentCategoryName: eventCategory.categoryName }
}

const updateEditCategory = (eventCategory, e) => {
  console.log("sds")
  e.preventDefault();
  eventManager.editEventCategory(eventCategory)
  cleanEditingCategory()
  popupText.value='Edit Event Category';
}

const cleanEditingCategory = () => {
  editingCategory.value = {}
  selectedCategoryId.value = 0
}
// popupSuccessText='Edit Event Category'
</script>

<template>
  <div class="lg:ml-64 pt-24">
    <div class="flex flex-col mt-4 lg:mt-12 gap-y-8 lg:gap-y-0">
      <h1 class="text-gray-300 font-medium text-2xl mr-8 lg:ml-28 font-[400] select-none inline-block ">
        Event Categories
      </h1>
      <BaseEventCategoryList :categoryList="eventCategories" :selectedCategoryId="selectedCategoryId"
        @selectCategory="selectCategory" @editCategory="editCategory" />
    </div>
    <BasePopupEditCategory v-show="Object.keys(editingCategory).length > 0" :editingCategory="editingCategory"
      @editCategory="updateEditCategory" @closeEditModal="cleanEditingCategory" />
             <BasePopup v-show="popupText" :popupText="popupText" :popupType="'success'"
      @closePopup="popupText = null" />
  </div>
</template>

<style>
</style>