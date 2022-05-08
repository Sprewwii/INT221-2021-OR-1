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
  createEvent: async function (booking) {
    console.log("dsa")
    const res = await fetch("http://intproj21.sit.kmutt.ac.th/or1/api/events", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: booking.name,
        email: booking.email,
        startTime: booking.startTime,
        categoryId: booking.categoryId,
        duration: booking.duration,
        note: booking.note,
      })
    });
  
    if (res.status === 201) {
      addedBooking = await res.json()
      this.eventList.push(addedBooking);
    } else {
      console.log("ไม่สามารถเพิ่มข้อมูลได้")
    }
  },
})


