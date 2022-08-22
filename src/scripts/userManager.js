import { reactive } from "vue";
import { roles } from "./roles.js";

export const userManager = reactive({
  userList: [],
  getUsers: async function () {
    const res = await fetch(`${import.meta.env.VITE_API}/api/users`);
    if (res.status === 200) {
      this.userList = await res.json();
      this.userList.forEach((user) => {
        user.role = roles[user.role];
      });
    } else {
      console.log("ไม่พบข้อมูล");
    }
  },
  getUserById: async function (userId) {
    const res = await fetch(`${import.meta.env.VITE_API}/api/users/${userId}`);
    if (res.status === 200) {
      let user = await res.json();
      return { userId: userId, ...user };
    } else {
      console.log(`ไม่พบข้อมูล event Id: ${userId}`);
    }
  },
  createUser: async function (user) {
    const res = await fetch(`${import.meta.env.VITE_API}/api/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        role: user.role,
      })
  })
  const info = await res.json()
  const info2 = await res.text()
    if(res.status === 200) {
      this.getUsers();
      console.log("create")
     }else{
      console.log(res)
      console.log(info)
      console.log(info2)
     }

    // console.log(res.json)
  },
  deleteUser: async function (userId) {
    const res = await fetch(`${import.meta.env.VITE_API}/api/users/${userId}`, {
      method: "DELETE",
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
    console.log(user);
    const res = await fetch(
      `${import.meta.env.VITE_API}/api/users/${user.userId}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          role: user.role,
        }),
      }
    );

    if (res.status === 200) {
      this.getUsers();
    } else {
      console.log("ไม่สามารถแก้ไขข้อมูลได้");
    }
  },
});
