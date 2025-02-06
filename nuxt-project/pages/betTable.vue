<template>
    <div class="h-[100vh] w-[100vw] absolute">
        <div class="w-[98vw] md:w-[99vw] h-[20vw] md:h-[10vh] bg-neutral rounded-lg mt-[1vw] md:mt-[0.5vh] left-[50%] translate-x-[-50%] absolute">
            <NuxtLink @click="reSetAllData" to="/">
                <img src="/img/logo.png" alt="" class="logo h-[60%] cursor-pointer w-auto absolute left-[5vw] md:left-[2.5vh] top-[50%] translate-y-[-50%]">
            </NuxtLink>
        </div>
        <div style="" class="h-[98vw] md:h-[80vh] w-[98vw] md:w-[80vh] absolute left-[50%] top-[20vw] md:top-[10vh] mt-[2vw] md:mt-[1vh] translate-x-[-50%]">
            <img src="/img/pokerTable.png" alt="" class="h-full w-full rounded-[2vh] absolute">
            <div class="winratecontainer h-[2.5vw] md:h-[2vh] w-[94%] rounded-full border-solid border-white border-[0.2vh] absolute left-[50%] translate-x-[-50%] bottom-0">
                <div :style="{ width: this.winRate + '%'}" class="winrateBar h-full bg-white rounded-l-full absolute left-0"></div>
                <p v-if="this.winRate >= 5" class="text-black whitespace-nowrap text-[2vw] md:text-[1.5vh] font-semibold absolute top-[50%] translate-y-[-50%] left-[2%]">{{ this.winRate }}%</p>
            </div>
            <div class="h-[96%] w-[96%] absolute top-[2%] left-[2%]">

                <BetTableComponentsUiComponentsPlayerArea/>
                <BetTableComponentsUiComponentsCenterOfTable/>

            </div>
            <div class="w-full h-[7.5vh] absolute bottom-[-7.5vh]">
                <button @click="foldCheckClick" v-if="state.buttonDisplay" class="btn fold border-none bg-blue-500 hover:bg-blue-600 text-white h-full w-[30%] mt-[1vw] md:mt-[0.5vh] absolute left-0">Fold/Check</button>
                <button @click="callClick" v-if="state.buttonDisplay" class="btn call border-none bg-blue-500 hover:bg-blue-600 text-white h-full w-[30%] mt-[1vw] md:mt-[0.5vh] absolute left-[35%]">Call</button>
                <input @keyup="this.inputCheck" v-if="state.buttonDisplay" min="0" type="number" placeholder="Raise" id="" class="h-full raise input bg-blue-500 hover:bg-blue-600 input-bordered w-[30%] mt-[1vw] md:mt-[0.5vh] absolute right-0 text-white rounded-md">
            </div>
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