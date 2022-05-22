<script setup>
import {ref, computed} from "vue"
import { eventManager } from "../scripts/eventManager.js";

const showInsertDate = ref(false)
const filterDate = (date) => eventManager.getEventDate(date)

const filterFetch = ref();
const date = ref();

const onChange = () => {
  switch (filterFetch.value) {
    case "0": {
      eventManager.getEvents()
      showInsertDate.value = false
    }
      break;
    case "1": {
      eventManager.getEventPast()
      showInsertDate.value = false
    }
      break;
    case "2": {
      eventManager.getEventFuture()  
      showInsertDate.value = false
    }
      break;
    case "3": {
      eventManager.getEvents()
      showInsertDate.value = true
      console.log(date.value)
      
      // eventManager.getEventDate()
      }
      break;
  }

};
</script>
 
<template>
<div class="">
      <select name="filterFetch" @v-model="filter" @change="onChange" v-model="filterFetch">
        <option value="0">EventAll</option>
        <option value="1">EventPast</option>
        <option value="2">EventFuture</option>
        <option value="3">EventDate</option>
      </select>
    

      <input type="date" v-model="date" v-show="showInsertDate" @change="filterDate(date)">

    </div>
</template>
 
<style>

</style>