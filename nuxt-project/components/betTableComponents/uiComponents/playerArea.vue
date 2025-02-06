<template>
    <div v-for="n in 6" :key="n" :class="`h-[25%] w-[50%] absolute ${style.playerAreaDirection[n-1]} ${style.playerAreaXPosition[n-1]} ${style.playerAreaYPosition[n-1]}`">
        <div>{{ n }}</div>
        <div class="w-[10vw] md:w-[7.5vh] absolute left-[50%] translate-x-[-50%] md:bottom-[2.5vh] bottom-[2.5vw]">
            <img src="~/public/img/avt4.png" alt="" class="avatar rounded-full border-[0.3vh] border-white">
        </div>
        <div :class="`playerCard ${style.card} h-[5.5vw] md:h-[5.5vh] w-[4vw] md:w-[4vh] bottom-[12%] left-[12%]`"></div>
        <div :class="`playerCard ${style.card} h-[5.5vw] md:h-[5.5vh] w-[4vw] md:w-[4vh] bottom-[12%] left-[22%]`"></div>
        <div>
            <div :class="`dealer ${style.blindDiv} bg-gray-200`">
                <p :class="`${style.blindText}`">D</p>
            </div>
            <div :class="`smallBlind ${style.blindDiv} bg-blue-600`">
                <p class="absolute left-[50%] translate-x-[-50%] text-black text-[4vw] md:text-[2vh] top-[50%] translate-y-[-50%]">S</p>
            </div>
            <div :class="`bigBlind ${style.blindDiv} bg-blue-600`">
                <p class="absolute left-[50%] translate-x-[-50%] text-black text-[4vw] md:text-[2vh] top-[50%] translate-y-[-50%]">B</p>
            </div>
        </div>
        <div :class="`absolute bottom-[50%] left-[50%] px-[2vw] ${style.chipDisplay}`" v-if="state.betTotalList[0] !== 0">{{ state.betTotalList[0] }}</div>
        <div :class="`absolute bottom-[12%] md:bottom-[10%] left-[75%] md:left-[50%] ${style.chipDisplay}`" >{{ state.stackList[0] }}</div>
    </div>
</template>


<script>
import { style } from '~/store/data/taildwindStyle';
import { state } from '~/store/data/dataStore';
export default {
    setup() {
        return {
            state,
            style
        }
    },
    data() {
        return {
        }
    },
    mounted() {

    }
}


</script>