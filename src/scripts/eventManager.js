import { reactive } from "vue";
import { userManager } from "./userManager.js";

export const eventManager = reactive({
  eventList: [],
  eventCategories: [],
  getEvents: async function () {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch(`${import.meta.env.VITE_API}/api/events`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      this.eventList = await res.json();
    } else if (
      res.status === 401 &&
      (await userManager.refreshToken()) == true
    ) {
      console.log("ส่งใหม่จ้า");
      this.getEvents();
    } else {
      console.log("ไม่พบข้อมูล");
    }
  },
  getEventById: async function (eventId) {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch(
      `${import.meta.env.VITE_API}/api/events/${eventId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      return await res.json();
    } else if (
      res.status === 401 &&
      (await userManager.refreshToken()) == true
    ) {
      console.log("ส่งใหม่จ้า");
      this.getEventById(eventId);
    } else {
      console.log(`ไม่พบข้อมูล event Id: ${eventId}`);
    }
  },
  getEventsPast: async function () {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch(`${import.meta.env.VITE_API}/api/events/past`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      this.eventList = await res.json();
    } else if (
      res.status === 401 &&
      (await userManager.refreshToken()) == true
    ) {
      console.log("ส่งใหม่จ้า");
      this.getEventsPast();
    } else {
      console.log("ไม่พบข้อมูล");
    }
  },
  getEventsFuture: async function () {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch(`${import.meta.env.VITE_API}/api/events/future`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      this.eventList = await res.json();
    } else if (
      res.status === 401 &&
      (await userManager.refreshToken()) == true
    ) {
      console.log("ส่งใหม่จ้า");
      this.getEventsFuture();
    } else {
      console.log("ไม่พบข้อมูล");
    }
  },
  getEventsByDate: async function (date) {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch(
      `${import.meta.env.VITE_API}/api/events/date/${date}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      this.eventList = await res.json();
    } else if (
      res.status === 401 &&
      (await userManager.refreshToken()) == true
    ) {
      console.log("ส่งใหม่จ้า");
      this.getEventsByDate(date);
    } else {
      console.log("ไม่พบข้อมูล");
    }
  },
  getEventsByCategory: async function (categoryId) {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch(
      `${import.meta.env.VITE_API}/api/events/${categoryId}/categories`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      this.eventList = await res.json();
    } else if (
      res.status === 401 &&
      (await userManager.refreshToken()) == true
    ) {
      console.log("ส่งใหม่จ้า");
      this.getEventsByCategory(categoryId);
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
    console.log(booking.category.categoryId);
    const bookingJson = JSON.stringify({
      name: booking.name,
      email: booking.email,
      categoryId: booking.category.categoryId,
      startTime: booking.startTime,
      note: booking.note,
    });

    const dataBlob = new Blob([bookingJson], { type: "application/json" });
    const formData = new FormData();

    formData.append("file", booking.file);
    formData.append("data", dataBlob);

    for (const value of formData.values()) {
      console.log(value);
    }

    const res = await fetch(`${import.meta.env.VITE_API}/api/events`, {
      method: "POST",
      body: formData,
    });

    // const res = await fetch(`${import.meta.env.VITE_API}/api/events`, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name: booking.name,
    //     email: booking.email,
    //     startTime: new Date(booking.startTime).toISOString(),
    //     categoryId: booking.category.categoryId,
    //     duration: booking.category.categoryDuration,
    //     note: booking.note,
    //     file: booking.file,
    //   }),
    // });

    if (res.status === 200) {
      this.getEvents();
    } else {
      console.log("ไม่สามารถเพิ่มข้อมูลได้");
    }
  },
  deleteEvent: async function (eventId) {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch(
      `${import.meta.env.VITE_API}/api/events/${eventId}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      this.getEvents();
    } else {
      console.log(`ไม่พบข้อมูล event Id: ${eventId}`);
    }
  },
  editEvent: async function (booking) {
    const token = localStorage.getItem("token");
    if (!token) return;
    console.log(booking);

    const bookingJson = JSON.stringify({
      startTime: booking.startTime,
          note: booking.note,
    });

    const dataBlob = new Blob([bookingJson], { type: "application/json" });
    const formData = new FormData();

    formData.append("file", null);
    formData.append("changeData", dataBlob);

    for (const value of formData.values()) {
      console.log(value);
    }

    const res = await fetch(
      `${import.meta.env.VITE_API}/api/events/${booking.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData
      }
    );

    if (res.status === 200) {
      this.getEvents();
    } else if (
      res.status === 401 &&
      (await userManager.refreshToken()) == true
    ) {
      console.log("ส่งใหม่จ้า");
      this.editEvent(booking);
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
    } else if (
      res.status === 401 &&
      (await userManager.refreshToken()) == true
    ) {
      console.log("ส่งใหม่จ้า");
      this.editEventCategory(category);
    } else {
      console.log("ไม่สามารถแก้ไขข้อมูลได้");
    }
  },
});
