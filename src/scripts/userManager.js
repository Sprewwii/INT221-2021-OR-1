import { reactive } from "vue";
import { roles } from "./roles.js";
import { eventManager } from "./eventManager.js";

export const userManager = reactive({
  userInfo: {role: localStorage.getItem("role") || "guest",email: localStorage.getItem("email") || null},
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
   
    const token = localStorage.getItem("token");
    
    if (!token) return;
    console.log("get "+userId + " " + token)
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
      localStorage.setItem("email", userLogin.email);
      this.userInfo.role = info.role[0]
      this.userInfo.email = userLogin.email;
      console.log(info.role[0]);
      this.getUsers();
      eventManager.getEvents();
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
    localStorage.removeItem("email");
    localStorage.setItem("role", "guest");
    this.userInfo = {role:"guest"}
    eventManager.eventList = [];
  },
  refreshToken: async function(){
    console.log("refresh token")
    const currentToken = localStorage.getItem("token");
    const currentRefreshToken = localStorage.getItem("refreshToken");
    if (!currentToken) return;

    const res = await fetch(`${import.meta.env.VITE_API}/api/refresh`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        // "Authorization": `Bearer ${refreshToken}`,
      body: JSON.stringify({
        refreshToken: currentRefreshToken
      }),
      },
    });
    console.log("refresh "+currentRefreshToken )
    if (res.status === 200) {
      let info = await res.json()
      console.log("token "+info.token )
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
    const res = await fetch(`${import.meta.env.VITE_API}/api/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password
      })
  })
    if(res.status === 200) {
      console.log("Password Matched")
      return true
     }
     else{
      console.log("Password NOT Matched")
        return false
     }
  },
});
