<template>
    <HomePageComponentsHeader/>
    <h1 class="absolute text-[20px] md:text-[30px] font-semibold text-white top-[50%] translate-y-[-70%] text-center left-[50%] translate-x-[-50%]">This feature is not implemented yet.</h1>
</template>




<script>
    export default {
        data() {
            return {
                counter: 100
            }
        },
        mounted() {

        },
        methods: {
            updateCounter(targetValue) {
                let currentValue = this.counter
                const step = Math.ceil((targetValue - currentValue) / 50); 

                const interval = setInterval(() => {
                    currentValue += step;
                    if (step >= 0) {
                        if (currentValue >= targetValue) {
                            currentValue = targetValue;
                            clearInterval(interval);
                        }
                    } else {
                        if (currentValue <= targetValue) {
                            currentValue = targetValue;
                            clearInterval(interval);
                        }
                    }
                    this.counter = currentValue;
                }, 20);
            }
        }
    }
</script>
