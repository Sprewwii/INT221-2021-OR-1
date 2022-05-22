import {reactive} from 'vue'
export const eventManager = reactive({
  eventList: [],
  eventCategories: [],
  getEvents: async function () {
    const res = await fetch(`${import.meta.env.VITE_API}/events`) 
    if (res.status === 200) {
      this.eventList = await res.json()
    } else {
      console.log("ไม่พบข้อมูล")
    }
  },
  getEventById: async function (eventId) {
    const res = await fetch(`${import.meta.env.VITE_API}/events/${eventId}`)
    if (res.status === 200) {
      return await res.json()
    } else {
      console.log(`ไม่พบข้อมูล event Id: ${eventId}`)
    }
  },

  // filterfetch
  getEventPast: async function () {
    const res = await fetch(`${import.meta.env.VITE_API}/events/past`) 
    if (res.status === 200) {
      this.eventList = await res.json()
    } else {
      console.log("ไม่พบข้อมูล")
    }
  },
  getEventFuture: async function () {
    const res = await fetch(`${import.meta.env.VITE_API}/events/future`) 
    if (res.status === 200) {
      this.eventList = await res.json()
    } else {
      console.log("ไม่พบข้อมูล")
    }
  },
  getEventByDate: async function (date) {
    const res = await fetch(`${import.meta.env.VITE_API}/events/date/${date}`) 
    if (res.status === 200) {
      this.eventList = await res.json()
    } else {
      console.log("ไม่พบข้อมูล")
    }
  },
  getEventByCategory: async function (categoryId) {
    const res = await fetch(`${import.meta.env.VITE_API}/events/categories/${categoryId}`) 
    if (res.status === 200) {
      this.eventList = await res.json()
    } else {
      console.log("ไม่พบข้อมูล")
    }
  },
  getEventCategories: async function () {
    const res = await fetch(`${import.meta.env.VITE_API}/eventCategories`) 
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
    console.log({...booking,startTime:new Date(booking.startTime).toISOString()})
    const res = await fetch(`${import.meta.env.VITE_API}/events`, {
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
      const addedBooking = await res.json();
      const eventCategory = this.getEventCategoryById(booking.category.categoryId)
      addedBooking.categoryName = eventCategory.categoryName
      this.eventList.push(addedBooking);
      this.sortByDateDesc();
      // this.getEvents()
    } else {
      console.log("ไม่สามารถเพิ่มข้อมูลได้")
    }
  },
  deleteEvent: async function (eventId) {
    const res = await fetch(`${import.meta.env.VITE_API}/events/${eventId}`, {
      method: "DELETE",
    });
  
    if (res.status === 200) {
      // const deletedBooking = await res.json()
      // console.log("del "+deletedBooking)
      this.eventList = this.eventList.filter((event) => event.id != eventId)

    } else {
      console.log(`ไม่พบข้อมูล event Id: ${eventId}`)
    }
  },
  editEvent: async function (booking) {
    const res = await fetch(`${import.meta.env.VITE_API}/events/${booking.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        startTime: new Date(booking.startTime).toISOString(),
        note: booking.note ? booking.note : null,
      })
    });
  
    if (res.status === 200) {
      const editedBooking = await res.json();
      const foundBooking = this.eventList.find((event) => 
 event.id === editedBooking.id
     )
      console.log("foud " + foundBooking)
      foundBooking.note = editedBooking.note
      foundBooking.startTime = editedBooking.startTime
      this.sortByDateDesc();
    } else {
      console.log("ไม่สามารถแก้ไขข้อมูลได้")
    }
  },
  sortByDateDesc: function(){
    this.eventList = this.eventList.sort((a,b) => new Date(b.startTime) - new Date(a.startTime))
  },
  editEventCategory: async function (category) {
    console.log("edit" + category.categoryDescription)
    const res = await fetch(`${import.meta.env.VITE_API}/eventCategories/${category.categoryId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(category)
    });
  
    if (res.status === 200) {
      const editedCategory = await res.json();
      const foundCategory = this.eventCategories.find((eventCategory) => 
eventCategory.categoryId === category.categoryId
  )
      foundCategory.categoryName = editedCategory.categoryName
      foundCategory.categoryDuration = editedCategory.categoryDuration
      foundCategory.categoryDescription = editedCategory.categoryDescription
      this.getEvents()
      console.log("แก้ไขข้อมูลได้")
    } else {
      console.log("ไม่สามารถแก้ไขข้อมูลได้")
    }
  },
})

// console.log({  name: booking.name,
//   email: booking.email,
//   startTime: new Date(booking.startTime).toISOString(), 
//   categoryId: booking.category.categoryId,
//   duration: booking.duration,
//   note: booking.note,})