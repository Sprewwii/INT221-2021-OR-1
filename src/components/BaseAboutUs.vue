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
    description: "โดนัทยังมีรู ละเมื่อไหร่ยูจะมีใจ"
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
    description: "อาจารย์ที่ปรีกษากลุ่ม OR-1"
  }
]
</script>
 
<template>
  <div class="px-16 lg:ml-[300px] lg:mr-6 pr-16 pt-24 lg:fixed">
    <h1 class="text-gray-300 font-medium text-2xl lg:mt-12 font-[400] select-none inline-block align-middle">
      About Us (OR-1)
    </h1>
    <div class="lg:grid-cols-4 grid grid-cols-2 mt-6 gap-4 pb-16">
      <div class="w-full transition ease-in-out hover:-translate-y-1  hover:scale-105 duration-300 " v-for="aboutUs in aboutUsList" :key="aboutUs.id">
        <div class="container mx-auto max-w-sm rounded-lg overflow-hidden shadow-lg my-2 bg-gray-100/10" id="cardMember">
          <div class="a relative z-10" style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5vw));">
            <img class="w-full object-cover bg-bottom opacity-80" :src="aboutUs.img" alt="Profile image" />
            <div class="absolute w-full pr-5 text-right drop-shadow-xl " style="top: 2rem">
              <p class="text-white tracking-wide uppercase text-lg lg:text-4xl font-bold ">{{ aboutUs.name }}</p>
              <p class="text-white tracking-wide uppercase text-s xl:text-lg font-bold">{{ aboutUs.surname }}</p>
              <p class="text-gray-100 text-xs lg:text-sm">{{ aboutUs.id }}</p>
            </div>
            <div class="absolute bottom-56 -left-32 ml-3 mb-3">
              <p class="-rotate-90 text-lg lg:text-2xl tracking-wide font-bold uppercase text-gray-100 z-50 opacity-50 w-full lg:w-72">
                  {{ aboutUs.position }}
              </p>
            </div>
          </div>
          <div class="pb-5 text-left ml-5">
            <p class="text-lg text-gray-100 ">{{ aboutUs.nickname }}</p>
            <p class="text-xs lg:text-sm text-gray-400">{{ aboutUs.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<style>
</style>