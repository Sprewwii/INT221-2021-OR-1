import { reactive } from "vue";
import { roles } from "./roles.js";

export const userManager = reactive({
  userInfo: {role: localStorage.getItem("role") || "guest"},
  userList: [],
  selectedUser: {},
  getUsers: async function () {
    const token = localStorage.getItem("token");
    if (!token) return;

    console.log("get : "+token)
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
      return true
    } 
    else if (res.status === 401 && await this.refreshToken() == true) {
      console.log("ส่งใหม่จ้า")
    this.getUsers()
    return false
  }
    else {
      console.log("ไม่พบข้อมูล");
      return false
    }
  },
  getUserById: async function (userId) {
    console.log("gett")
    const token = localStorage.getItem("token");
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
      userManager.selectedUser = user
      return { userId: userId, ...user };
    } else if (res.status === 401 && await this.refreshToken() == true) {
        console.log("ส่งใหม่จ้า")
      this.getUserById(userId)
    }
     else {
      console.log(`ไม่พบข้อมูล event Id: ${userId}`);
    }
    console.log("จบแล้ว : " + userId)
  },
  createUser: async function (user) {
    const token = localStorage.getItem("token");
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
    console.log("info " + info + " " + res);
    if (res.status === 200) {
      this.getUsers();
      console.log("create");
      return true;
    } else if (res.status === 401 && await this.refreshToken() == true) {
      console.log("ส่งใหม่จ้า")
    this.createUser(user)
  }
     else {
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
    console.log("create ไม่ได้เลย");
    // console.log(res.json)
  },
  deleteUser: async function (userId) {
    const token = localStorage.getItem("token");
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
    } else if (res.status === 401 && await this.refreshToken() == true) {
      console.log("ส่งใหม่จ้า")
    this.deleteUser(userId)
  }
    else {
      console.log(`ไม่พบข้อมูล user Id: ${userId}`);
    }
  },

  editUser: async function (user) {
    const token = localStorage.getItem("token");
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
    } else if (res.status === 401 && await this.refreshToken() == true) {
      console.log("ส่งใหม่จ้า")
    this.editUser(user)
  }
    else {
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
      localStorage.setItem("token", info.token);
      localStorage.setItem("refreshToken", info.refreshToken);
      localStorage.setItem("role", info.role[0]);
      this.userInfo.role = info.role[0]
      console.log(info.role[0]);
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
  logout: function(){
    localStorage.removeItem("token");
    this.userInfo.role = "guest"
  },
  refreshToken: async function(){

    console.log("home")
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!token) return;

    const res = await fetch(`${import.meta.env.VITE_API}/api/refresh`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${refreshToken}`,
      },
    });
    if (res.status === 200) {
      let info = await res.json()
      console.log("refresh"+info.token)
      localStorage.setItem("token",info.token);
      return true;
      
    } 
    else if (res.status === 500){
      console.log(`ไม่สามารถ refresh token ได้ กรุณา Logout`);
      localStorage.removeItem("token");
      location.reload();
      return false;
    }
    else {
      console.log(`ไม่สามารถ refresh token ได้`);
      return false;
    }
  },matchingPassword: async function (user) {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch(`${import.meta.env.VITE_API}/api/match`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password
      })
  })
    if(res.status === 200) {
      console.log("Password Matched")
      return true
     }else if (res.status === 401 && await this.refreshToken() == true) {
      console.log("ส่งใหม่จ้า")
      this.matchingPassword(user)
  }
     else{
      console.log("Password NOT Matched")
        return false
     }
  },
});
