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
                <div v-if="startCounting && !counting" class="communityCards select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-blue-600 absolute underline text-center text-[4vw] md:text-[3.5vh] top-[46%] left-[32%]"></div>
                <div v-if="startCounting && !counting" class="communityCards select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-blue-600 absolute underline text-center text-[4vw] md:text-[3.5vh] top-[46%] left-[39%]"></div>
                <div v-if="startCounting && !counting" class="communityCards select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-blue-600 absolute underline text-center text-[4vw] md:text-[3.5vh] top-[46%] left-[46%]"></div>
                <div v-if="startCounting && !counting" class="communityCards select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-blue-600 absolute underline text-center text-[4vw] md:text-[3.5vh] top-[46%] left-[54%]"></div>
                <div v-if="startCounting && !counting" class="communityCards select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-blue-600 absolute underline text-center text-[4vw] md:text-[3.5vh] top-[46%] left-[61%]"></div>
                <div>
                    <BetTableComponentsUiComponentsPlayerArea/>
                </div>
                <div class="h-[50%] w-[50%] absolute top-[25%] left-[25%]">
                    <p v-if="!startCounting" class="text-black text-[3vw] md:text-[2.5vh] font-bold text-center absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">Click anywhere to play.</p>
                    <div v-if="counting" class="text-black text-[20vw] md:text-[20vh] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">{{ count }}</div>
                    <div v-if="startCounting && !counting" class="absolute bottom-[30%] left-[50%] px-[2vw] md:px-[2vh] translate-x-[-50%] text-[3vw] md:text-[1.5vh] inline-block bg-blue-200 text-black border-[0.5vw] md:border-[0.3vh] border-neutral border-solid rounded-[3.6vw]">Pot: {{ pot }}</div>
                </div>
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
            startCounting: false,
            counting: false,
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
        document.addEventListener('click', (event) => {
            if (!this.startCounting) {
                this.startCounting = true
                this.counting = true
                this.defSoundVal()
                this.countDonw()
            }
        })
        watch(() => this.count, (newval, oldval) => {
            if (this.count !== 0) {
                this.countDonw()
            } else {
                this.counting = false
                state.startGame = true
            }
        })
        watch(() => state.pot, (newval, oldval) => {
            let currentValue = this.pot
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
                this.pot = currentValue;
            }, 20)
        })
        watch(() => state.winRate, (newval, oldval) => {
            let currentValue = this.winRate
            if (state.winRate === 100) {
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
                                this.stopCoinDrop()
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
    methods: {
        countDonw() {
            setTimeout(() => {
                this.count -= 1
            }, 1000);
        },
        foldCheckClick() {
            if (state.betTotalList[0] === Math.max(...state.betTotalList)) {
                state.playerAct = 'Check'
                state.numberOfAction ++
                state.buttonDisplay = false
            } else {
                state.playerAct = 'Fold'
                state.numberOfAction ++
                state.buttonDisplay = false
                this.avatar[0].style.borderColor = 'gray'
            }
        },
        callClick() {
            if (state.betTotalList[0] === Math.max(...state.betTotalList)) {
                state.playerAct = 'Check'
                state.numberOfAction ++
                state.buttonDisplay = false
            } else {
                state.playerAct = 'Call'
                state.numberOfAction ++
                state.buttonDisplay = false
            }
        },
        inputCheck() {
            if (parseInt(event.target.value)) {
                event.target.value = parseInt(event.target.value)
            } else {
                event.target.value = ''
            }
            if (event.key === 'Enter') {
                if (event.target.value === '') {
                    this.callClick()
                } else {
                    state.playerAct = parseInt(event.target.value)
                }
                state.numberOfAction ++
                state.buttonDisplay = false
            }
        },
    }
}
</script>