<script setup>
import { ref, computed } from "vue"
import IconClose from "../icons/IconClose.vue"
import { eventManager } from "../../scripts/eventManager.js"
import { validation } from "../../scripts/validation.js"
import { decorator } from "../../scripts/decorator.js"
import IconMicrosoft from "../icons/IconMicrosoft.vue"
import IconGuest from "../icons/IconGuest.vue"
import IconEye from "../icons/IconEye.vue"
import IconEyeOff from "../icons/IconEyeOff.vue"

const emit = defineEmits(['login', 'loginAsGuest', 'loginAsMS'])

const user = ref({ email: "", password: "", rememberMe: false })
const isShowPassword = ref(false)

getRememberedUser()

function getRememberedUser() {
    if (localStorage.getItem("user")) {
        const rememberedUser = JSON.parse(localStorage.getItem("user"))
        let text = CryptoJS.AES.encrypt("usersads", 'secret key')
        user.value = { email: rememberedUser.email, password: CryptoJS.AES.decrypt(rememberedUser.password, 'secret key').toString(CryptoJS.enc.Utf8), rememberMe: true }
    }
}

function login(e) {
    e.preventDefault()
    emit('login', user.value)
}

function toggleShowPassword() {
    isShowPassword.value = !isShowPassword.value
}

</script>
<template>
    <div
        class="bg-managray-300/10 shadow-2xl w-[350px] sm:w-[550px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col justify-center items-center p-8 rounded-xl">

        <h2 class="text-gray text-[12px] tracking-[.3rem]">WELCOME TO</h2>
        <h1
            class="text-transparent bg-clip-text bg-gradient-to-r from-manapurple-100 to-manapink-100 text-3xl sm:text-5xl font-bold tracking-wider">
            MANA CLINIC</h1>
        <form class="mt-6 space-y-5 w-11/12 text-sm sm:text-md">
            <div>
                <input @blur="user.email = user.email.trim()" v-model="user.email" placeholder="Email"
                    class="rounded-xl block w-full p-3 bg-managray-100/20 placeholder-managray-100 text-white focus:outline-none focus:ring-2 focus:ring-violet-300" />
            </div>
            <div>
                <div class="w-full h-[45px] relative">

                    <input :type="isShowPassword ? 'text' : 'password'" v-model="user.password" placeholder="Password"
                        class="text-sm border-none sm:text-md rounded-xl block w-full p-3 bg-managray-100/20 placeholder-managray-100 text-white focus:outline-none focus:ring-2 focus:ring-violet-300" />
                    <IconEye v-show="!isShowPassword" @click="toggleShowPassword"
                        class="absolute text-managray-300 text-2xl right-4 bottom-3" />
                    <IconEyeOff v-show="isShowPassword" @click="toggleShowPassword"
                        class="absolute text-managray-300 text-2xl right-4 bottom-3" />
                </div>
                <div class="mt-3">
                    <input type="checkbox" id="rememberme"
                        class="bg-managray-100/20 border-none rounded checked:bg-manapurple-100 focus:outline-none focus:ring-0"
                        v-model="user.rememberMe" />
                    <label for="rememberme" class="ml-2 mb-2 text-sm font-medium">Remember Me</label>
                </div>
            </div>
            <button @click="login"
                class="w-full h-[45px] text-white bg-gradient-to-l from-manapink-100 to-manapurple-100 group relative inline-block overflow-hidden rounded-xl">
                <span
                    class="absolute w-full opacity-0 group-hover:opacity-100 inset-y-0 left-0 text-white bg-gradient-to-r from-manapink-100 to-manapurple-100 transition-all duration-500"></span>

                <span
                    class="relative text-sm font-medium transition-colors tracking-widest group-hover:tracking-[0.5em] transition-all duration-300 flex gap-x-2 justify-center">
                    LOGIN
                </span>
            </button>

            <div class="flex items-center">
                <!-- The left line -->
                <div class="flex-grow h-px bg-managray-300"></div>
                <span class="flex-shrink text-lg text-managray-300 px-4 font-light">or</span>

                <!-- The right line -->
                <div class="flex-grow h-px bg-managray-300"></div>
            </div>

            <div class="flex flex-col sm:flex-row sm:justify-between w-full h-[110px] sm:h-[45px] gap-y-6 gap-x-6">
                <button @click="$emit('loginAsMS')" type="button"
                    class="w-full h-full text-manapurple-100 group relative inline-block overflow-hidden border border-manapurple-100 rounded-xl">
                    <span
                        class="absolute inset-y-0 left-0 w-[0px] bg-manapurple-100 transition-all group-hover:w-full group-active:bg-manapurple-500"></span>

                    <span
                        class="relative text-sm font-medium transition-colors group-hover:text-white flex gap-x-2 justify-center">
                        <IconMicrosoft class="text-xl" />Login with Microsoft
                    </span>
                </button>

                <button @click="$emit('loginAsGuest')" type="button"
                    class="w-full h-full text-manapink-100 group relative inline-block overflow-hidden border border-manapink-100 rounded-xl">
                    <span
                        class="absolute inset-y-0 left-0 w-[0px] bg-manapink-100 transition-all group-hover:w-full group-active:bg-manapink-500"></span>

                    <span
                        class="relative text-sm font-medium transition-colors group-hover:text-white flex gap-x-2 justify-center">
                        <IconGuest class="text-xl" />Login with Guest
                    </span>
                </button>
            </div>
        </form>
    </div>
</template>
