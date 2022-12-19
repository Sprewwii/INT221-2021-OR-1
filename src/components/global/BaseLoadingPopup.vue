<script setup>

</script>

<template>
       <div class="bg-black/60 z-[51] h-full w-full fixed  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
         <div
            class="overflow-y-hidden overflow-x-hidden z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div class="w-[500px] h-[400px] rounded-3xl bg-managray-100/10 backdrop-blur-md shadow-2xl flex flex-col gap-y-8 justify-center items-center">
             
<div class="spinner"></div>
            <p class="text-2xl text-white">Loading...</p></div>
            </div>
    </div>  
</template>


<style>
.spinner {
   width: 88px;
   height: 88px;
   border-radius: 50%;
   background: radial-gradient(farthest-side,#ffffff 94%,#0000) top/14.1px 14.1px no-repeat,
          conic-gradient(#0000 30%,#ffffff);
   -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 14.1px),#000 0);
   animation: spinner-c7wet2 0.8s infinite linear;
}

@keyframes spinner-c7wet2 {
   100% {
      transform: rotate(1turn);
   }
}
</style>