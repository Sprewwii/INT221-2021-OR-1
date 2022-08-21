import { reactive } from "vue";
import { role } from "./role.js";

export const userManager = reactive({
    userList: [],
    getUsers: async function () {
        const res = await fetch(`${import.meta.env.VITE_API}/api/users`);
        if (res.status === 200) {
          this.userList = await res.json();
          this.userList.forEach((user) => {
            user.role = role[user.role]
        
          })
        } else {
          console.log("ไม่พบข้อมูล");
        }
      },
      getUserById: async function (userId) {
        const res = await fetch(`${import.meta.env.VITE_API}/api/users/${userId}`);
        if (res.status === 200) {
          return await res.json();
        } else {
          console.log(`ไม่พบข้อมูล event Id: ${userId}`);
        }
      },
      deleteUser: async function (userId) {
        const res = await fetch(`${import.meta.env.VITE_API}/api/users/${userId}`, {
          method: "DELETE",
        });
    
        if (res.status === 200) {
          this.getUsers();
        } else {
          console.log(`ไม่พบข้อมูล user Id: ${userId}`);
        }
      }
})