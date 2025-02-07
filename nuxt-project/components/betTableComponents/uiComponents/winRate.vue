<template>
    <div class="winratecontainer h-[2.5vw] md:h-[2vh] w-[94%] rounded-full border-solid border-white border-[0.2vh] absolute left-[50%] translate-x-[-50%] bottom-0">
        <div :style="{ width: this.winRate + '%'}" class="winrateBar h-full bg-white rounded-l-full absolute left-0"></div>
        <p v-if="this.winRate >= 5" class="text-black whitespace-nowrap text-[2vw] md:text-[1.5vh] font-semibold absolute top-[50%] translate-y-[-50%] left-[2%]">{{ this.winRate }}%</p>
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
            winRate: 0
        }
    }
}

</script>