import {reactive} from 'vue'
export const eventManager = reactive({
  eventList: [],
  eventCategories: [],
  getEvents: async function () {
    const res = await fetch("http://intproj21.sit.kmutt.ac.th/or1/api/events") 
    if (res.status === 200) {
      this.eventList = await res.json()
    } else {
      console.log("ไม่พบข้อมูล")
    }
  },
  getEventById: async function (eventId) {
    const res = await fetch(`http://intproj21.sit.kmutt.ac.th/or1/api/events/${eventId}`)
    if (res.status === 200) {
      return await res.json()
    } else {
      console.log(`ไม่พบข้อมูล event Id: ${eventId}`)
    }
  },
  getEventCategories: async function () {
    const res = await fetch("http://intproj21.sit.kmutt.ac.th/or1/api/eventCategories") 
    if (res.status === 200) {
      this.eventCategories = await res.json()
    } else {
      console.log("ไม่พบข้อมูล Event Category")
    }
  },
  getEventCategoryById: function (id) {
      return this.eventCategories.find((eventCategory) => eventCategory.categoryId === id)
  },

  createEvent: async function (booking) {
    const res = await fetch('http://intproj21.sit.kmutt.ac.th/or1/api/events', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: booking.name,
        email: booking.email,
        startTime: new Date(booking.startTime).toISOString(),
        categoryId: booking.category.categoryId,
        duration: booking.category.categoryDuration,
        note: booking.note,
      })
    });
  
    if (res.status === 200) {
      const addedBooking = await res.json()
      const eventCategory = this.getEventCategoryById(booking.category.categoryId)
      addedBooking.categoryName = eventCategory.categoryName
      this.eventList.push(addedBooking);
      
    } else {
      console.log("ไม่สามารถเพิ่มข้อมูลได้")
    }
  },


  deleteEvent: async function (eventId) {
    const res = await fetch(`http://intproj21.sit.kmutt.ac.th/or1/api/events/${eventId}`, {
      method: "DELETE",
    });
  
    if (res.status === 200) {
      // const deletedBooking = await res.json()
      this.eventList = this.eventList.filter((event) => event.id != eventId)

    } else {
      console.log(`ไม่พบข้อมูล event Id: ${eventId}`)
    }
  },
})

// name: booking.name,
// email: booking.email,
// startTime: booking.startTime,
// categoryId: booking.categoryId,
// duration: booking.duration,
// note: booking.note,
