<template>
    <div v-for="n in 6" :key="n" :class="`h-[25%] w-[50%] absolute ${style.playerAreaDirection[n-1]} ${style.playerAreaXPosition[n-1]} ${style.playerAreaYPosition[n-1]}`">
        <div v-if="stackList[n-1] !== 0" class="absolute top-[85%] text-white left-[75%] translate-x-[-50%] translate-y-[-50%] inline-flex rounded-sm">
            <div>{{ stackList[n-1] }}</div>
            <img src="/img/whiteCoin.png" class="mx-1 size-3 self-center" alt="">
        </div>
        <span v-if="betTableState.playerLoading[n-1]" class="loading loading-bars md:loading-lg loading-md left-[50%] translate-x-[-50%] top-[60%] absolute"></span>
    </div>
    <div v-for="n in 6" :key="n" :class="`h-[25%] w-[50%] stackContainer border-solid border-white border-[2px] absolute ${style.playerAreaDirection[n-1]} ${style.playerAreaXPosition[n-1]} ${style.playerAreaYPosition[n-1]}`">
        <div v-if="true" class="absolute stacks top-[25%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white inline-flex rounded-sm">
            <div>100</div>
            <img src="/img/whiteCoin.png" class="mx-1 size-3 self-center" alt="">
        </div>
    </div>
    <BetTableComponentsLogicComponentsMoveStacks/>

</template>


<script>
import { style } from '~/store/data/taildwindStyle';
import { betTableState } from '~/store/data/betTableState';
import { audio } from '~/store/data/audioStore';
export default {
    setup() {
        return {
            betTableState,
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
        this.stackList = betTableState.stackList
        watch(() => betTableState.betTotalList, (newval, oldval) => {
            for (let i = 0; i < 6; i ++) {
                if (betTableState.betTotalList[i] !== this.betTotalList[i]) {
                    let currentValue = this.betTotalList[i]
                    let targetValue = betTableState.betTotalList[i]
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
        watch(() => betTableState.stackList, (newval, oldval) => {
            for (let i = 0; i < 6; i ++) {
                if (betTableState.stackList[i] !== this.stackList[i]) {
                    let currentValue = this.stackList[i]
                    let targetValue = betTableState.stackList[i]
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
                        this.stackList[i] = currentValue;
                    }, 20)
                }
            }
        },{ deep: true })
    },
}


</script>