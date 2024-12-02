<template>
<div class="banner">
    <HomePageComponentsHeaderComponent/>
    <h1 class="absolute text-[50px] font-semibold text-white top-[50%] translate-y-[-70%] text-center left-[50%] translate-x-[-50%]">FOLLOW YOUR DREAM AND JOIN WITH US NOW</h1>
    <NuxtLink to="/bettable" class="top-[60%] rounded-[35px] hover:text-black hover:bg-white font-semibold hover:top-[59%] text-center left-[50%] translate-x-[-50%] absolute inline-block text-[40px] text-white border-white border-[4px] border-solid px-10 transition-all duration-300">PLAY</NuxtLink>
</div>
</template>


<script>
    export default {
        setup() {
            const func = betTableFunctionsStore()
            console.log(func.test())
            return {

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

        },
    }
</script>


<style>
.banner {
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.75),rgba(0, 0, 0, 0.75)),url(/img/homePageBackground.png);
    background-size: cover;
    background-position: center;
}
</style>