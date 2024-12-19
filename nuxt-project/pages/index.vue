<template>
    <HomePageComponentsHeader/>
    <div class="h-[85vh] w-full absolute top-[12.5vh]">
        <h1 class="absolute hidden md:block text-[40px] font-thin font-serif text-gray-500 select-none top-[40%] translate-y-[-90%] text-center left-[50%] translate-x-[-50%]">PLAY POKER WITH STRONGEST AI IN THE WORLD NOW.</h1>
        <h1 class="absolute block md:hidden text-[40px] font-thin font-serif text-gray-600 select-none top-[30%] text-center left-[50%] translate-x-[-50%]">Wellcome.</h1>
        <NuxtLink to="/bettable" class="md:top-[45%] select-none top-[40%] rounded-[35px] font-serif md:hover:text-black md:hover:bg-white bg-white text-black md:bg-inherit font-thin md:hover:top-[44%] text-center left-[50%] translate-x-[-50%] absolute inline-block text-[40px] md:text-white border-white border-[2px] border-solid px-10 transition-all duration-300">PLAY</NuxtLink>
    </div>
    <HomePageComponentsFooter class=""/>
</template>


<style>
body {
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.75),rgba(0, 0, 0, 0.75)),url(/img/homePageBackground.png);
    background-size: cover;
    background-position: center;
}
</style>