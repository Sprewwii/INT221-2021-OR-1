import { reactive } from "vue";
export const eventManager = reactive({
  eventList: [],
  eventCategories: [],
  getEvents: async function () {
    const res = await fetch(`${import.meta.env.VITE_API}/api/events`);
    if (res.status === 200) {
      this.eventList = await res.json();
    } else {
      console.log("ไม่พบข้อมูล");
    }
  },
  getEventById: async function (eventId) {
    const res = await fetch(`${import.meta.env.VITE_API}/api/events/${eventId}`);
    if (res.status === 200) {
      return await res.json();
    } else {
      console.log(`ไม่พบข้อมูล event Id: ${eventId}`);
    }
  },
  getEventsPast: async function () {
    const res = await fetch(`${import.meta.env.VITE_API}/api/events/past`);
    if (res.status === 200) {
      this.eventList = await res.json();
    } else {
      console.log("ไม่พบข้อมูล");
    }
  },
  getEventsFuture: async function () {
    const res = await fetch(`${import.meta.env.VITE_API}/api/events/future`);
    if (res.status === 200) {
      this.eventList = await res.json();
    } else {
      console.log("ไม่พบข้อมูล");
    }
  },
  getEventsByDate: async function (date) {
    const res = await fetch(`${import.meta.env.VITE_API}/api/events/date/${date}`);
    if (res.status === 200) {
      this.eventList = await res.json();
    } else {
      console.log("ไม่พบข้อมูล");
    }
  },
  getEventsByCategory: async function (categoryId) {
    const res = await fetch(
      `${import.meta.env.VITE_API}/events/${categoryId}/api/categories`
    );
    if (res.status === 200) {
      this.eventList = await res.json();
    } else {
      console.log("ไม่พบข้อมูล");
    }
  },
  getEventCategories: async function () {
    const res = await fetch(`${import.meta.env.VITE_API}/api/eventCategories`);
    if (res.status === 200) {
      this.eventCategories = await res.json();
    } else {
      console.log("ไม่พบข้อมูล Event Category");
    }
  },
  getEventCategoryById: function (id) {
    return this.eventCategories.find(
      (eventCategory) => eventCategory.categoryId === id
    );
  },
  createEvent: async function (booking) {
    const res = await fetch(`${import.meta.env.VITE_API}/api/events`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: booking.name,
        email: booking.email,
        startTime: new Date(booking.startTime).toISOString(),
        categoryId: booking.category.categoryId,
        duration: booking.category.categoryDuration,
        note: booking.note,
      }),
    });

    if (res.status === 200) {
      this.getEvents();
    } else {
      console.log("ไม่สามารถเพิ่มข้อมูลได้");
    }
  },
  deleteEvent: async function (eventId) {
    const res = await fetch(`${import.meta.env.VITE_API}/api/events/${eventId}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      this.getEvents();
    } else {
      console.log(`ไม่พบข้อมูล event Id: ${eventId}`);
    }
  },
  editEvent: async function (booking) {
    const res = await fetch(
      `${import.meta.env.VITE_API}/api/events/${booking.id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          startTime: new Date(booking.startTime).toISOString(),
          note: booking.note ? booking.note : null,
        }),
      }
    );

    if (res.status === 200) {
      this.getEvents();
    } else {
      console.log("ไม่สามารถแก้ไขข้อมูลได้");
    }
  },
  editEventCategory: async function (category) {
    const res = await fetch(
      `${import.meta.env.VITE_API}/api/eventCategories/${category.categoryId}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(category),
      }
    );

    if (res.status === 200) {
      const editedCategory = await res.json();
      const foundCategory = this.eventCategories.find(
        (eventCategory) => eventCategory.categoryId === category.categoryId
      );
      foundCategory.categoryName = editedCategory.categoryName;
      foundCategory.categoryDuration = editedCategory.categoryDuration;
      foundCategory.categoryDescription = editedCategory.categoryDescription;
      this.getEvents();
    } else {
      console.log("ไม่สามารถแก้ไขข้อมูลได้");
    }
  },
});
