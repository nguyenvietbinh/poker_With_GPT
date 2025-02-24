<template>
    <div v-for="n in 6" :key="n" :class="`h-[25%] w-[50%] absolute ${style.playerAreaDirection[n-1]} ${style.playerAreaXPosition[n-1]} ${style.playerAreaYPosition[n-1]}`">
        <div class="w-[10vw] md:w-[7.5vh] absolute left-[50%] translate-x-[-50%] md:bottom-[2.5vh] bottom-[2.5vw]">
            <img src="~/public/img/avt4.png" alt="" class="avatar rounded-full border-[0.3vh] border-white">
        </div>
        <div :class="`${style.card} h-[7vw] md:h-[6.5vh] w-[6.5vw] md:w-[6vh] bottom-[20%] left-[6%]`">
            <img class="playerCard" src="~/public/img/cards/back.png" alt="">
        </div>
        <div :class="`${style.card} h-[7vw] md:h-[6.5vh] w-[6.5vw] md:w-[6vh] bottom-[20%] left-[22%]`">
            <img class="playerCard" src="~/public/img/cards/back.png" alt="">
        </div>
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
        <div :class="`absolute bottom-[50%] left-[50%] px-[2vw] ${style.chipDisplay}`" v-if="state.betTotalList[n-1] !== 0">{{ betTotalList[n-1] }}</div>
        <div :class="`absolute bottom-[12%] md:bottom-[10%] left-[75%] md:left-[50%] ${style.chipDisplay}`" >{{ stackList[n-1] }}</div>
    </div>
</template>


<script>
import { style } from '~/store/data/taildwindStyle';
import { state } from '~/store/data/dataStore';
import { audio } from '~/store/data/audioStore';
export default {
    setup() {
        return {
            state,
            style,
            audio
        }
    },
    data() {
        return {
            betTotalList: [0, 0, 0, 0, 0, 0],
            stackList: [0, 0, 0, 0, 0, 0]
        }
    },
    mounted() {
        watch(() => state.betTotalList, (newval, oldval) => {
            for (let i = 0; i < 6; i ++) {
                if (state.betTotalList[i] !== this.betTotalList[i]) {
                    let currentValue = this.betTotalList[i]
                    let targetValue = state.betTotalList[i]
                    const step = Math.ceil((targetValue - currentValue) / 50)
                    const interval = setInterval(() => {
                        currentValue += step
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
                        this.betTotalList[i] = currentValue;
                    }, 20)
                }
            }
        },{ deep: true })
        watch(() => state.stackList, (newval, oldval) => {
            for (let i = 0; i < 6; i ++) {
                if (state.stackList[i] !== this.stackList[i]) {
                    let currentValue = this.stackList[i]
                    let targetValue = state.stackList[i]
                    const step = Math.ceil((targetValue - currentValue) / 50)
                    const interval = setInterval(() => {
                        currentValue += step
                        if (step >= 0) {
                            if (currentValue >= targetValue) {
                                currentValue = targetValue;
                                clearInterval(interval);
                                audio.coinDrop.stop()
                            }
                        } else {
                            if (currentValue <= targetValue) {
                                currentValue = targetValue;
                                clearInterval(interval);
                                audio.coinDrop.stop()
                            }
                        }
                        this.stackList[i] = currentValue;
                    }, 20)
                }
            }
        },{ deep: true })
    },
}


</script>