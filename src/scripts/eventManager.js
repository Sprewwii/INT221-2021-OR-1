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
      return true;
    } else if (
      res.status === 401 &&
      (await userManager.refreshToken()) == true
    ) {
      // refresh token if access token is expired and fetch again
      this.getEvents();
    } else {
      return false;
    }
  },
  getEventFileById: async function (eventId) {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch(
      `${import.meta.env.VITE_API}/api/events/files/${eventId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      return res.blob();
    } else if (
      res.status === 401 &&
      (await userManager.refreshToken()) == true
    ) {
      // refresh token if access token is expired and fetch again
      this.getEventFileById();
    } else {
      return false;
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
      // refresh token if access token is expired and fetch again
      this.getEventById(eventId);
      return true;
    } else {
      return false;
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
      // refresh token if access token is expired and fetch again
      this.getEventsPast();
    } else {
      return false;
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
            // refresh token if access token is expired and fetch again
      this.getEventsFuture();
    } else {
      return false;
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
      // refresh token if access token is expired and fetch again
      this.getEventsByDate(date);
    } else {
      return false;
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
      // refresh token if access token is expired and fetch again
      this.getEventsByCategory(categoryId);
    } else {
      return false;
    }
  },
  getEventCategories: async function () {
    const res = await fetch(`${import.meta.env.VITE_API}/api/eventCategories`);
    if (res.status === 200) {
      this.eventCategories = await res.json();
    } else {
      return false;
    }
  },
  getEventCategoryById: function (id) {
    return this.eventCategories.find(
      (eventCategory) => eventCategory.categoryId === id
    );
  },
  createEvent: async function (booking) {
    const bookingJson = JSON.stringify({
      name: booking.name,
      email: booking.email,
      categoryId: booking.category.categoryId,
      startTime: booking.startTime,
      note: booking.note,
    });

    // create formData to collect file and json object
    const dataBlob = new Blob([bookingJson], { type: "application/json" });
    const formData = new FormData();

    formData.append("file", booking.file);
    formData.append("data", dataBlob);

    const res = await fetch(`${import.meta.env.VITE_API}/api/events`, {
      method: "POST",
      body: formData,
    });

    if (res.status === 200) {
      this.getEvents();
      return true;
    } else {
      console.log(res.data)
      return false;
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
      return false;
    }
  },
  editEvent: async function (booking) {
    const token = localStorage.getItem("token");
    if (!token) return;

    // create formData to collect file and json object, In json has isChangeFile to tell if file was changed.
    const file = booking.file && booking.file.type ? booking.file : null;
    const bookingJson = JSON.stringify({
      startTime: booking.startTime,
      note: booking.note,
      isChangeFile: booking.isChangeFile,
    });

    const dataBlob = new Blob([bookingJson], { type: "application/json" });
    const formData = new FormData();

    formData.append("file", file);
    formData.append("changeData", dataBlob);

    const res = await fetch(
      `${import.meta.env.VITE_API}/api/events/${booking.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (res.status === 200) {
      this.getEvents();
    } else if (
      res.status === 401 &&
      (await userManager.refreshToken()) == true
    ) {
      this.editEvent(booking);
    } else {
      return false;
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
