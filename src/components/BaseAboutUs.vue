<script setup>
const aboutUsList = [
  {
    id: "63130500047",
    name: "Thanadol",
    surname: "Wangsirisomboon",
    nickname: "Mos",
    img: "./images/profile/mos.jpg",
    position: "Frontend",
    description: "มอส ปฏิภาณ ปะติมาการ"
  },
  {
    id: "63130500124",
    name: "Supicha",
    surname: "Piriyasiriphan",
    nickname: "Prew",
    img: "./images/profile/sprew.jpg",
    position: "Backend",
    description: "เจ๋งแจ๋ว ฮู้วววววว"
  },
  {
    id: "63130500128",
    name: "Athiti",
    surname: "Khongsobsin",
    nickname: "James",
    img: "./images/profile/james.jpg",
    position: "Infra & Database",
    description: "เจมส์ไม่โกรธน้า"
  },
  {
    id: null,
    name: "Olarn",
    surname: "Rojanapornpun",
    nickname: "Aj. Olarn",
    img: "./images/profile/olarn.png",
    position: "Product Owner (PO)",
    description: "อาจารย์ที่ปรีกษาประจำกลุ่ม OR-1"
  }
]
</script>
 
<template>
  <div class="ml-64 mr-12 mt-12 pt-24 overflow-hidden pr-8">
    <h1 class="text-gray-300 font-medium text-2xl mr-8 ml-28 font-[400] select-none inline-block align-middle">
      About Us (OR-1)
    </h1>
    <div class="flex flex-row ml-32 mt-6 justify-evenly space-x-6">
      <div class="w-full transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-300 " v-for="aboutUs in aboutUsList" :key="aboutUs.id">
        <div class="container mx-auto max-w-sm rounded-lg overflow-hidden shadow-lg my-2" id="cardMember">
          <div class="a relative z-10" style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5vw));">
            <img class="w-full object-cover bg-bottom opacity-80" :src="aboutUs.img" alt="Profile image" />
            <div class="absolute w-full pr-5 text-right drop-shadow-xl" style="top: 2rem">
              <p class="text-white tracking-wide uppercase text-4xl font-bold ">{{ aboutUs.name }}</p>
              <p class="text-white tracking-wide uppercase text-lg font-bold">{{ aboutUs.surname }}</p>
              <p class="text-gray-100 text-sm">{{ aboutUs.id }}</p>
            </div>
            <div class="absolute bottom-56 -left-32 ml-3 mb-3">
              <p class="-rotate-90 text-2xl tracking-wide font-bold uppercase text-gray-100 z-50 opacity-50 w-72">
                  {{ aboutUs.position }}
              </p>
            </div>
          </div>
          <div class="pb-5 text-left ml-5">
            <p class="text-lg text-gray-100 ">{{ aboutUs.nickname }}</p>
            <p class="text-sm text-gray-400">{{ aboutUs.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<style>
</style>