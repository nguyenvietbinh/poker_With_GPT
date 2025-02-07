<template>
    <div class="h-[100vh] w-[100vw] absolute">
        <div class="w-[98vw] md:w-[99vw] h-[20vw] md:h-[10vh] bg-neutral rounded-lg mt-[1vw] md:mt-[0.5vh] left-[50%] translate-x-[-50%] absolute">
            <NuxtLink @click="reSetAllData" to="/">
                <img src="/img/logo.png" alt="" class="logo h-[60%] cursor-pointer w-auto absolute left-[5vw] md:left-[2.5vh] top-[50%] translate-y-[-50%]">
            </NuxtLink>
        </div>
        <div class="h-[98vw] md:h-[80vh] w-[98vw] md:w-[80vh] absolute left-[50%] top-[20vw] md:top-[10vh] mt-[2vw] md:mt-[1vh] translate-x-[-50%]">
            <img src="/img/pokerTable.png" alt="" class="h-full w-full rounded-[2vh] absolute">
            <div class="h-[96%] w-[96%] absolute top-[2%] left-[2%]">
                <BetTableComponentsUiComponentsPlayerArea v-if="state.startGame"/>
                <BetTableComponentsUiComponentsCenterOfTable/>
            </div>
            <BetTableComponentsUiComponentsWinRate/>
            <BetTableComponentsUiComponentsButtons/>
        </div>
    </div>
    <BetTableComponentsLogicComponentsGameLogic v-if="state.startGame" />
</template>

<script>
import { watch } from 'vue';
import { state } from '~/store/data/dataStore';
import { useMyBettbFunc } from '~/store/functions/bettableFuncStore';
import { useSounds } from '~/store/functions/soundControl';
export default {
    setup() {
        const { reSetAllData } = useMyBettbFunc()
        const { playCoinDrop } = useSounds()
        const { stopCoinDrop } = useSounds()
        const { defSoundVal } = useSounds()
        return {
            state,
            reSetAllData,
            playCoinDrop,
            stopCoinDrop,
            defSoundVal,
        }
    },
    data() {
        return {
            count: 3,
            counting: false,
            counted: false,
            avatar: null,
            pot: state.pot,
            betTotalList: [0, 0, 0, 0, 0, 0],
            stackList: [2000, 2000, 2000, 2000, 2000, 2000],
            winRate: 0,
            winrateBar: null,
        }
    },
    mounted() {
        this.avatar = document.querySelectorAll('.avatar')
        this.winrateBar = document.querySelector('.winrateBar')

    },
    methods: {

    }
}
</script>