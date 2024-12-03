<template>
    <div class="banner">
        <header class="header w-full h-[80px] z-50 fixed top-0 left-0 bg-[#ffffff] opacity-[0.5] transition-all duration-300">
            <NuxtLink to="/">
                <img src="/img/logo.png" alt="" class="logo h-[50px] cursor-pointer w-auto absolute left-[25px] top-[50%] translate-y-[-50%] opacity-100">
            </NuxtLink>
            <div class="text-[20px] absolute bg-[#ffffff] cursor-pointer text-[#001f1b] hover:bg-[#828282] inline-block left-[425px] rounded-[22px] p-[4px] px-4 top-[50%] translate-y-[-50%] hover:translate-y-[-53%] transition duration-300 opacity-100">About</div>
            <div class="text-[20px] absolute bg-[#ffffff] cursor-pointer text-[#001f1b] hover:bg-[#828282] inline-block left-[275px] rounded-[22px] p-[4px] px-4 top-[50%] translate-y-[-50%] hover:translate-y-[-53%] transition duration-300 opacity-100">Products</div>
            <div @click="moveToSource" class="source text-[20px] absolute bg-[#ffffff] cursor-pointer text-[#001f1b] hover:bg-[#828282] inline-block left-[140px] rounded-[22px] p-[4px] px-4 top-[50%] translate-y-[-50%] hover:translate-y-[-53%] transition duration-300 opacity-100">Source</div>
            <NuxtLink to="/" class="absolute rounded-lg right-[50px] text-[#001f1b] font-semibold hover:underline top-[50%] translate-y-[-50%] transition duration-300 opacity-100">Sign In</NuxtLink to="/singin">
        </header>
    </div>
</template>


<script>

export default {
    setup() {
        return {

        }
    },
    data() {
        return {

        }
    },
    methods: {
        moveToSource() {
            window.open('https://github.com/nguyenvietbinh/vue-poker2')
        }
    }
}
</script>