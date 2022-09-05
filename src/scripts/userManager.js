import { reactive } from "vue";
import { roles } from "./roles.js";

export const userManager = reactive({
  userList: [],
  getUsers: async function () {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const res = await fetch(`${import.meta.env.VITE_API}/api/users`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      this.userList = await res.json();
      this.userList.forEach((user) => {
        user.role = roles[user.role];
      });
    } 
    else if (res.status === 401) {
      console.log("กรุณาเข้าสู่ระบบ");

    } 
    else {
      console.log("ไม่พบข้อมูล");
    }
  },
  getUserById: async function (userId) {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const res = await fetch(`${import.meta.env.VITE_API}/api/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      let user = await res.json();
      return { userId: userId, ...user };
    } else {
      console.log(`ไม่พบข้อมูล event Id: ${userId}`);
    }
  },
  createUser: async function (user) {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const res = await fetch(`${import.meta.env.VITE_API}/api/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        role: user.role,
        password: user.password,
      }),
    });
    const info = await res.json();
    // const info2 = await res.text()
    let a = res.status;
    console.log(a);
    if (res.status === 200) {
      this.getUsers();
      console.log("create");
      return true;
    } else {
      console.log("create error");
      // console.log("ไม่สามารถสร้าง User ได้")
      // return false
      let error = "";
      for (let i = 0; i < info.details.length; i++) {
        console.log(info.details[i].errorMessage);
        error += info.details[i].errorMessage + " \n";
      }
      console.log(error);
      return error;
    }

    // console.log(res.json)
  },
  deleteUser: async function (userId) {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const res = await fetch(`${import.meta.env.VITE_API}/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const info = await res.text();
    if (res.status === 200) {
      this.getUsers();
      console.log(info);
    } else {
      console.log(`ไม่พบข้อมูล user Id: ${userId}`);
    }
  },

  editUser: async function (user) {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const res = await fetch(
      `${import.meta.env.VITE_API}/api/users/${user.userId}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      }
    );
    const info = await res.json();
    if (res.status === 200) {
      this.getUsers();
      return true;
    } else {
      console.log("ไม่สามารถแก้ไขข้อมูลได้");
      let error = "";
      for (let i = 0; i < info.details.length; i++) {
        console.log(info.details[i].errorMessage);
        error += info.details[i].errorMessage + " \n";
      }
      console.log(error);
      return error;
    }
  },

  login: async function (userLogin) {
    console.log(userLogin);
    const res = await fetch(`${import.meta.env.VITE_API}/api/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: userLogin.email,
        password: userLogin.password,
      }),
    });
    // const info = await res.json()
    const info = await res.json();
    if (res.status === 200) {
      sessionStorage.setItem("token", info.token);
      console.log(info);
      this.getUsers();
      return true;
    } else {
      let error = "";
      for (let i = 0; i < info.details.length; i++) {
        console.log(info.details[i].errorMessage);
        error += info.details[i].errorMessage + " \n";
      }
      console.log(error);
      return error;
    }
  },
});
