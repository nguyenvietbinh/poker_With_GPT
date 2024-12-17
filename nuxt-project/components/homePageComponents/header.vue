<template>
    <header class="header w-full h-[12.5vh] fixed bg-[#ffffff] opacity-[0.5] transition-all duration-300">
        <NuxtLink to="/">
            <img src="/img/logo.png" alt="" class="logo h-[50px] cursor-pointer w-auto absolute left-[5vw] md:left-[2.5vw] top-[50%] translate-y-[-50%]">
        </NuxtLink>
        <div @click="moveToSource" class="source hidden text-[20px] absolute bg-[#ffffff] cursor-pointer text-[#001f1b] hover:bg-[#828282] md:inline-block left-[140px] rounded-[22px] p-[4px] px-4 top-[50%] translate-y-[-50%] hover:translate-y-[-53%] transition duration-300 opacity-100">Source</div>
        <NuxtLink to="/signin" class="absolute right-[7.5vw] md:right-[5vw] text-[#001f1b] font-semibold hover:underline top-[50%] translate-y-[-50%] transition duration-300">Sign In</NuxtLink>
    </header>
</template>


<script>

export default {
    methods: {
        moveToSource() {
            window.open('https://github.com/nguyenvietbinh/vue-poker2')
        }
    }
}
</script>