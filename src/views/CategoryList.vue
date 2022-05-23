<script setup>
import { ref, computed } from "vue";
import BaseCategoryList from "../components/BaseCategoryList.vue"
import BasePopupEditCategory from "../components/BasePopupEditCategory.vue";
import BasePopupSuccess from "../components/BasePopupSuccess.vue";
import IconPlus from "../components/icons/IconPlus.vue";
import { eventManager } from "../scripts/eventManager.js"

const eventCategories = computed(() => eventManager.eventCategories);
const editingCategory = ref({})
const selectedCategoryId = ref(0);
const popupSuccessText = ref(null)

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
  popupSuccessText.value='Edit Event Category';
}

const cleanEditingCategory = () => {
  editingCategory.value = {}
  selectedCategoryId.value = 0
}
// popupSuccessText='Edit Event Category'
</script>

<template>
  <div class="ml-64">
    <div class="flex flex-col">
      <h1 class="text-gray-300 text-2xl pt-16 mb-3 mr-8 ml-32 md:mx-16 lg:mx-32 font-medium select-none">
        Event Categories
      </h1>
      <BaseCategoryList :categoryList="eventCategories" :selectedCategoryId="selectedCategoryId"
        @selectCategory="selectCategory" @editCategory="editCategory" />
    </div>
    <BasePopupEditCategory v-show="Object.keys(editingCategory).length > 0" :editingCategory="editingCategory"
      @editCategory="updateEditCategory" @closeEditModal="cleanEditingCategory" />
         <BasePopupSuccess v-show="popupSuccessText" :popupSuccessText="popupSuccessText"
      @closeSuccessModal="popupSuccessText = null" />
  </div>
</template>

<style>
</style>