<template>
    <div class="winratecontainer h-[2.5vw] md:h-[2vh] w-[94%] rounded-full border-solid border-white border-[0.2vh] absolute left-[50%] translate-x-[-50%] bottom-0">
        <div :style="{ width: this.winRate + '%'}" class="winrateBar h-full bg-white rounded-l-full absolute left-0"></div>
        <span v-if="betTableState.calculatingWinrate" class="loading loading-dots bg-black loading-xs absolute top-[70%] translate-y-[-50%] left-[2%]"></span>
        <div v-else>
            <p v-if="this.winRate >= 5" class="text-black whitespace-nowrap text-[2vw] md:text-[1.5vh] font-semibold absolute top-[50%] translate-y-[-50%] left-[2%]">{{ this.winRate }}%</p>
        </div>
    </div>
</template>

<script>
import { betTableState } from '~/store/data/betTableState';
export default {
    setup() {
        return {
            betTableState
        }
    },
    data() {
        return {
            winRate: 0,
            winrateBar: 0,
        }
    },
    mounted() {
        this.winrateBar = document.querySelector('.winrateBar')
        watch(() => betTableState.winRate, (newval, oldval) => {
            let currentValue = this.winRate
            if (betTableState.winRate === 100) {
                this.winrateBar.style.borderRadius = '9999px'
            } else {
                this.winrateBar.style.borderTopRightRadius = '0px'
                this.winrateBar.style.borderBottomRightRadius = '0px'
                this.winrateBar.style.borderTopLeftRadius = '9999px';
                this.winrateBar.style.borderBottomLeftRadius = '9999px';
            }
            let targetValue = newval
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
                this.winRate = currentValue;
            }, 20)
        })
    }
}

</script>