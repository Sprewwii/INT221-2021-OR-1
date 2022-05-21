<script setup>
import BaseCategoryList from "../components/BaseCategoryList.vue"
import BasePopupEditCategory from "../components/BasePopupEditCategory.vue";
import iconPlus from "../components/icons/IconPlus.vue";
import { ref, computed } from "vue";
import { eventManager } from "../scripts/eventManager.js"


const eventCategories = computed(() => eventManager.eventCategories);
const editingCategory = ref({})
const selectedCategoryId = ref(0);

const selectCategory = (id) => {
  if (selectedCategoryId.value === id) {
    selectedCategoryId.value = 0
  } else {
    selectedCategoryId.value = id
  }
}

const editCategory = (eventCategory) => {
  editingCategory.value = {...eventCategory,currentCategoryName:eventCategory.categoryName}
  console.log(editingCategory.value)
}

const updateEditCategory = (eventCategory,e) => {
   e.preventDefault();
     eventManager.editEventCategory(eventCategory)
     cleanEditingCategory()
}

const cleanEditingCategory = () => {
  editingCategory.value = {}
  selectedCategoryId.value = 0
}

</script>

<template>
    <div class="ml-64">
        <div class="flex flex-col">
            <h1 class="text-gray-300 text-2xl pt-16 mb-3 mr-8 ml-32 md:mx-16 lg:mx-32 font-medium select-none">
            Event Categories
             </h1>
            <BaseCategoryList :categoryList="eventCategories" :selectedCategoryId="selectedCategoryId" @selectCategory="selectCategory" @editCategory="editCategory"/>
        </div>

    <BasePopupEditCategory v-show="Object.keys(editingCategory).length > 0" :editingCategory="editingCategory" @editCategory="updateEditCategory" @closeEditModal="cleanEditingCategory"/>
    </div>
</template>

<style>
</style>