<template>
<div class="banner">
    <header class="header w-full h-[80px] z-50 fixed top-0 left-0 bg-[#ffffff] opacity-[0.5] transition-all duration-300">
        <img @click="router.push('/')" src="../img/logo.png" alt="" class="logo h-[50px] cursor-pointer w-auto absolute left-[25px] top-[50%] translate-y-[-50%] opacity-100">
        <div class="text-[20px] absolute bg-[#ffffff] cursor-pointer text-[#001f1b] hover:bg-[#828282] inline-block left-[425px] rounded-[22px] p-[4px] px-4 top-[50%] translate-y-[-50%] hover:translate-y-[-53%] transition duration-300 opacity-100">About</div>
        <div class="text-[20px] absolute bg-[#ffffff] cursor-pointer text-[#001f1b] hover:bg-[#828282] inline-block left-[275px] rounded-[22px] p-[4px] px-4 top-[50%] translate-y-[-50%] hover:translate-y-[-53%] transition duration-300 opacity-100">Products</div>
        <div @click="moveToSource" class="source text-[20px] absolute bg-[#ffffff] cursor-pointer text-[#001f1b] hover:bg-[#828282] inline-block left-[140px] rounded-[22px] p-[4px] px-4 top-[50%] translate-y-[-50%] hover:translate-y-[-53%] transition duration-300 opacity-100">Source</div>
        <button class="absolute rounded-lg right-[100px] text-[#001f1b] font-semibold hover:underline top-[50%] translate-y-[-50%] transition duration-300 opacity-100">Log In</button>
        <button class="absolute rounded-lg right-[20px] text-[#001f1b] font-semibold hover:underline top-[50%] translate-y-[-50%] transition duration-300 opacity-100">Sign Up</button>
    </header>
    <h1 class="absolute text-[50px] font-semibold text-white top-[50%] translate-y-[-70%] text-center left-[50%] translate-x-[-50%]">FOLLOW YOUR DREAM AND JOIN WITH US NOW</h1>
    <button @click="router.push('/bettable')" class="top-[60%] rounded-[35px] hover:text-black hover:bg-white font-semibold hover:top-[59%] text-center left-[50%] translate-x-[-50%] absolute inline-block text-[40px] text-white border-white border-[4px] border-solid px-10 transition-all duration-300">PLAY</button>
</div>
</template>


<script>
import { useRouter } from 'vue-router';
    export default {
        setup() {
            const router = useRouter()
            return {
                router
            }
        },
        data() {
            return {

            }
        },
        mounted() {
            const header = document.querySelector('.header')
            let lastScrollTop = 0;
            window.addEventListener('scroll', () => {
                let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

                if (currentScrollTop > lastScrollTop) {
                    header.style.height = '60px'
                } else {
                    header.style.height = '80px'
                }

                lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Đảm bảo giá trị không âm
            });
        },
        methods: {
            moveToSource() {
                window.open('https://github.com/nguyenvietbinh/vue-poker2')
            }
        }
    }
</script>


<style>
.banner {
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.75),rgba(0, 0, 0, 0.75)),url(../img/homePageBackground.png);
    background-size: cover;
    background-position: center;
}
</style>