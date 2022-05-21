<script setup>
const aboutUsList = [
    {      
        id: "63130500047",
        name: "Thanadol",
        surname: "Wangsirisomboon",
        nickname: "Mos",
        img: "/src/images/profile/sprew.jpg",
        position: "Frontend",
        description: "dsadsad"
    },
    {      
        id: "63130500124",
        name: "Supicha",
        surname: "Piriyasiriphan",
        nickname: "Prew",
        img: "/src/images/profile/sprew.jpg",
        position: "Backend",
        description: "เกินปุ้่ยมุ้ย"
    },
    
    {      
        id: "63130500128",
        name: "Athiti",
        surname: "Khongsobsin",
        nickname: "James",
        img: "/src/images/profile/sprew.jpg",
        position: "Infrastructure & Database",
        description: "เจมส์ไม่โกรธน้า"
    }
]
</script>
 
<template>
<div class="flex flex-row ml-80 mr-24 w-3/6">
<div v-for="aboutUs in aboutUsList" :key="aboutUs.id">
  <div class="container mx-auto max-w-sm rounded-lg overflow-hidden shadow-lg my-2" id="cardMember">
    <div class="a relative z-10" style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5vw));">
      <img class="w-full object-cover bg-bottom" :src="aboutUs.img" alt="Profile image" />
      <div class="text-center absolute w-full" style="bottom: 4rem">
        <p class="text-white tracking-wide uppercase text-lg font-bold">{{ aboutUs.name }}</p>
        <p class="text-white tracking-wide uppercase text-lg font-bold">{{ aboutUs.surname }}</p>
        <p class="text-gray-100 text-sm">{{ aboutUs.id }}</p>
      </div>
    </div>

    <div class="pt-6 pb-8 text-gray-600 text-center">
      <p>{{ aboutUs.position }}</p>
      <p class="text-sm">{{ aboutUs.description }}</p>
    </div>

  </div>
</div>
</div>
</template>
 
<style>
</style>