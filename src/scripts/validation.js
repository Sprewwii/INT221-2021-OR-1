import {reactive} from 'vue'
import { eventManager } from "./eventManager.js"

export const validation = reactive({
    isEmail: function(email){
    return email && email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    },
    isPast : function(startTime){
     return startTime < new Date(new Date().getTime())
   },
    isOverlap : function(currentBooking){
        if(currentBooking.category){
            currentBooking.categoryName = currentBooking.category.categoryName
            currentBooking.duration = currentBooking.category.categoryDuration
        }
        currentBooking.endTime = new Date(new Date(currentBooking.startTime).getTime() + currentBooking.duration * 60000)
        
        const bookingList = eventManager.eventList
        
        return bookingList.some((booking) => {
           booking.startTime = new Date(booking.startTime)
            booking.endTime = new Date(new Date(booking.startTime).getTime() + booking.duration * 60000)
            return booking.name !== currentBooking.name && booking.categoryName === currentBooking.categoryName && currentBooking.startTime <= booking.endTime && booking.startTime <= currentBooking.endTime
        })//booking.name !== currentBooking.name && 
   }
})