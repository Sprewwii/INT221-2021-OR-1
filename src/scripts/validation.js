
import { eventManager } from "./eventManager.js"

export const validation = {
    isEmail: function(email){
    return email && email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    },
    isPast : function(startTime){
     return startTime < new Date()
   },
    isOverlap : function(currentBooking){
        if(currentBooking.category){
            currentBooking.categoryName = currentBooking.category.categoryName
            currentBooking.duration = currentBooking.category.categoryDuration
        }
        currentBooking.endTime = new Date(new Date(currentBooking.startTime).getTime() + (currentBooking.duration -1 )* 60000) 
        
        const bookingList = eventManager.eventList
        
        return bookingList.some((booking) => {
           booking.startTime = new Date(booking.startTime)
            booking.endTime = new Date(new Date(booking.startTime).getTime() + (booking.duration - 1 ) * 60000)
            return booking.id !== currentBooking.id && booking.categoryName === currentBooking.categoryName && currentBooking.startTime <= booking.endTime && booking.startTime <= currentBooking.endTime
        })
   },
    validateEditCategory :function(category){
        return this.validateLengthAndNotNull(category.categoryName,100) && this.validateCategoryDuration(category.categoryDuration) && this.validateLength(category.categoryDescription,500)
   },
   validateCategoryDuration :function(duration){
        return duration >= 1 && duration <= 480
   },
   validateLengthAndNotNull :function(value,maxLength){
    return value && value.length <= maxLength
},
validateLength :function(value,maxLength){
    return value == null || value == '' || (value && value.length <= maxLength)
},
isNotNull:function(value){
    return value != null && value != ''
},
validateUniqueCategoryName: function(editingCategory){
    for(let category of eventManager.eventCategories){
        if(editingCategory.categoryName === category.categoryName && editingCategory.categoryId != category.categoryId) return false
    }
    return true
}
}