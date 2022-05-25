import { reactive } from "vue";
import { eventManager } from "./eventManager.js";
export const eventFilter = reactive({
    selectedFilter: { id: 0, name: "Filter by", getEvents: "" },
    filterList : [
        { id: 1, name: "All Events", getEvents: () => { eventManager.getEvents() } , noEventMessage:"No Scheduled Events"},
        { id: 2, name: "Past Events", getEvents: () => eventManager.getEventsPast() , noEventMessage:"No Past Events" },
        { id: 3, name: "Upcoming Events", getEvents: () => eventManager.getEventsFuture() , noEventMessage:"No On-Going or Upcoming Events" },
        { id: 4, name: "Category", selectedCategory: null  , noEventMessage:"No Scheduled Events"},
        { id: 5, name: "Date" , noEventMessage:"No Scheduled Events" },
      ],
})