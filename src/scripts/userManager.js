import { reactive } from "vue";
import { roles } from "./roles.js";
import { eventManager } from "./eventManager.js";

export const userManager = reactive({
  userInfo: {
    role: localStorage.getItem("role") || "guest",
    email: localStorage.getItem("email") || null,
  },
  userList: [],
  selectedUser: {},
  getUsers: async function () {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch(`${import.meta.env.VITE_API}/api/users`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      this.userList = await res.json();
      this.userList.forEach((user) => {
        user.role = roles[user.role];
      });
      return true;
    } else if (res.status === 401 && (await this.refreshToken()) == true) {
      this.getUsers();
      return false;
    } else {
      return false;
    }
  },
  getUserByIdInLocal: function (userId) {
    return this.userList.find((user) => userId === user.userId);
  },
  getUserById: async function (userId) {
    const token = localStorage.getItem("token");

    if (!token) return;
    const res = await fetch(`${import.meta.env.VITE_API}/api/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      let user = await res.json();
      userManager.selectedUser = user;
      return { userId: userId, ...user };
    } else if (res.status === 401 && (await this.refreshToken()) == true) {
      this.getUserById(userId);
    } else {
      return false;
    }
  },
  createUser: async function (user) {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch(`${import.meta.env.VITE_API}/api/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        role: user.role,
        password: user.password,
      }),
    });
    const info = await res.json();
    if (res.status === 200) {
      this.getUsers();
      return true;
    } else if (res.status === 401 && (await this.refreshToken()) == true) {
      this.createUser(user);
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
  deleteUser: async function (userId) {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch(`${import.meta.env.VITE_API}/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const info = await res.text();
    if (res.status === 200) {
      this.getUsers();
    } else if (res.status === 401 && (await this.refreshToken()) == true) {
      this.deleteUser(userId);
    } else {
      let error = "";
      for (let i = 0; i < info.details.length; i++) {
        error += info.details[i].errorMessage + " \n";
      }
      return error;
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      }
    );
    const info = await res.json();
    if (res.status === 200) {
      this.getUsers();
      return true;
    } else if (res.status === 401 && (await this.refreshToken()) == true) {
      this.editUser(user);
    } else {
      console.log(info)
      let error = "";
      for (let i = 0; i < info.details.length; i++) {
        error += info.details[i].errorMessage + " \n";
      }
      return error;
    }
  },
  login: async function (userLogin) {
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

      this.userInfo.role = info.role[0];
      this.userInfo.email = userLogin.email;

      if (info.role[0] === "admin") this.getUsers();
      if (userLogin.rememberMe) {
        const passwordEncrypted = CryptoJS.AES.encrypt(
          userLogin.password,
          "secret key"
        );
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: userLogin.email,
            password: passwordEncrypted.toString(),
          })
        );
      } else {
        localStorage.removeItem("user");
      }
      eventManager.getEvents();
      return true;
    } else {
      let error = "";
      for (let i = 0; i < info.details.length; i++) {
        error += info.details[i].errorMessage + " \n";
      }
      return error;
    }
  },
  logout: function () {
    // localStorage.removeItem("token");
    // localStorage.removeItem("refreshToken");
    // localStorage.removeItem("email");

    const rememberedUser = localStorage.getItem("user");
    localStorage.clear();
    localStorage.setItem("role", "guest");
    if (rememberedUser) localStorage.setItem("user", rememberedUser);
    this.userInfo = { role: "guest" };
    userManager.userList = [];
    eventManager.eventList = [];

    deleteAllCookies();
    function deleteAllCookies() {
      var cookies = document.cookie.split(";");

      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    }
  },
  refreshToken: async function () {
    const currentToken = localStorage.getItem("token");
    const currentRefreshToken = localStorage.getItem("refreshToken");
    if (!currentToken) return;

    const res = await fetch(`${import.meta.env.VITE_API}/api/refresh`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${currentRefreshToken}`,
      },
    });

    if (res.status === 200) {
      let info = await res.json();
      localStorage.setItem("token", info.token);
      return true;
    } else if (res.status === 500) {
      localStorage.removeItem("token");
      location.reload();
      return false;
    } else {
      return false;
    }
  },
  matchingPassword: async function (user) {
    const res = await fetch(`${import.meta.env.VITE_API}/api/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });
    const info = await res.json();
    if (res.status === 200) {
      return true;
    } else {
      let error = "";
      for (let i = 0; i < info.details.length; i++) {
        error += info.details[i].errorMessage + " \n";
      }
      return error;
    }
  },
});
