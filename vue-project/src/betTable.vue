<template>
    <div style="top: calc(50% - 250px); left: calc(50% - 250px);" class="h-[500px] w-[500px] absolute select-none">
        <img src="./img/pokerTable.png" alt="" class="h-[500px] w-auto rounded-[20px] absolute top-0 left-0 z-0">
        <div class="communityCards select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 absolute underline text-center text-[20px] top-[230px] left-[160px]"></div>
        <div class="communityCards select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 absolute underline text-center text-[20px] top-[230px] left-[195px]"></div>
        <div class="communityCards select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 absolute underline text-center text-[20px] top-[230px] left-[230px]"></div>
        <div class="communityCards select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 absolute underline text-center text-[20px] top-[230px] left-[270px]"></div>
        <div class="communityCards select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 absolute underline text-center text-[20px] top-[230px] left-[310px]"></div>
        <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute top-[430px] left-[220px]"></div>
        <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute top-[430px] left-[250px]"></div>
        <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute rotate-90 top-[400px] left-[30px]"></div>
        <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute rotate-90 top-[370px] left-[30px]"></div>
        <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute rotate-90 bottom-[400px] left-[30px]"></div>
        <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute rotate-90 bottom-[370px] left-[30px]"></div>
        <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute bottom-[430px] left-[220px]"></div>
        <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute bottom-[430px] left-[250px]"></div>
        <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute -rotate-90 bottom-[400px] right-[30px]"></div>
        <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute -rotate-90 bottom-[370px] right-[30px]"></div>
        <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute -rotate-90 top-[400px] right-[30px]"></div>
        <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute -rotate-90 top-[370px] right-[30px]"></div>
        <div class="absolute bottom-[-50px] left-[225px] w-[50px] h-[50px]">
            <img src="./img/user.png" alt="" class="absolute h-[50px] w-auto bg-white rounded-full">
            <div class="absolute bottom-[-10px] left-[50%] px-2 pr-2 translate-x-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px]">{{ state.stackList[0] }}.0$ </div>
            <div class="left-[50%] top-[-95px] px-2 pr-2 translate-x-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px] absolute">{{ state.betTotalList[0] }}.0$</div>
            <div @click="this.checkButtonClick" class="right-[-70px] absolute p-2 m-1 hidden bg-red-500 rounded-md border-[1px] border-solid border-black hover:bg-black hover:text-red-500 hover:translate-y-[-2px] transition-all check">Check</div>
            <div @click="this.foldButtonClick" class="right-[-70px] absolute p-2 m-1 hidden bg-red-500 rounded-md border-[1px] border-solid border-black hover:bg-black hover:text-red-500 hover:translate-y-[-2px] transition-all fold">Fold</div>
            <div @click="this.callButtonClick" class="right-[-120px] absolute p-2 m-1 hidden bg-yellow-500 rounded-md border-[1px] border-solid border-black hover:bg-black hover:text-yellow-500 hover:translate-y-[-2px] transition-all call">Call</div>
            <input @keyup="this.inputCheck" type="text" class="right-[-180px] w-[55px] absolute hidden p-2 m-1 bg-green-950 text-white rounded-md border-[1px] border-solid border-black hover:bg-black hover:text-green-500 hover:translate-y-[-2px] transition-all raise" placeholder="Raise">
        </div>
        <div class="playerAvatar absolute bottom-[70px] left-[-50px] h-[50px] w-[50px]">
            <img src="./img/user.png" alt="" class="h-[50px] w-auto absolute bg-white rounded-[50%]">
            <div class="absolute bottom-[-10px] left-[50%] px-2 pr-2 translate-x-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px]">{{ state.stackList[1] }}.0$</div>
            <div class="top-[50%] right-[-100px] rotate-90 px-2 pr-2 translate-y-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px] absolute">{{ state.betTotalList[1] }}.0$</div>
        </div>
        <div class="playerAvatar absolute top-[70px] left-[-50px] h-[50px] w-[50px]">
            <img src="./img/user.png" alt="" class="h-[50px] w-auto absolute bg-white rounded-[50%]">
            <div class="absolute bottom-[-10px] left-[50%] px-2 pr-2 translate-x-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px]">{{ state.stackList[2] }}.0$</div>
            <div class="top-[50%] right-[-100px] rotate-90 px-2 pr-2 translate-y-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px] absolute">{{ state.betTotalList[2] }}.0$</div>
        </div>
        <div class="playerAvatar absolute top-[-50px] left-[225px] h-[50px] w-[50px]">
            <img src="./img/user.png" alt="" class="h-[50px] w-auto absolute bg-white rounded-[50%]">
            <div class="absolute bottom-[-10px] left-[50%] px-2 pr-2 translate-x-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px]">{{ state.stackList[3] }}.0$</div>
            <div class="left-[50%] bottom-[-95px] px-2 pr-2 translate-x-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px] absolute">{{ state.betTotalList[3] }}.0$</div>
        </div>
        <div class="playerAvatar absolute top-[70px] right-[-50px] h-[50px] w-[50px]">
            <img src="./img/user.png" alt="" class="h-[50px] w-auto absolute bg-white rounded-[50%]">
            <div class="absolute bottom-[-10px] left-[50%] px-2 pr-2 translate-x-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px]">{{ state.stackList[4] }}.0$</div>
            <div class="top-[50%] left-[-100px] -rotate-90 px-2 pr-2 translate-y-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px] absolute">{{ state.betTotalList[4] }}.0$</div>
        </div>
        <div class="playerAvatar absolute bottom-[70px] right-[-50px] h-[50px] w-[50px]">
            <img src="./img/user.png" alt="" class="h-[50px] w-auto absolute bg-white rounded-[50%]">
            <div class="absolute bottom-[-10px] left-[50%] px-2 pr-2 translate-x-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px]">{{ state.stackList[5] }}.0$</div>
            <div class="top-[50%] left-[-100px] -rotate-90 px-2 pr-2 translate-y-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px] absolute">{{ state.betTotalList[5] }}.0$</div>
        </div>
        <div class="left-[50%] top-[200px] px-2 pr-2 translate-x-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px] absolute">Pot: {{ state.pot }}.0$</div>
    </div>    
    <GameLogic/>
</template>


<script>
import { state } from './dataStore';
import { useMyFunction } from './functionStore';
import GameLogic from './gameLogic.vue';
    export default {
        setup() {
            const { closestToTheLeft } = useMyFunction()
            const { closestToTheRight } = useMyFunction()
            const { reSetData } = useMyFunction()
            return {
                state,
                closestToTheLeft,
                closestToTheRight,
                reSetData,
            }
        },
        data() {
            return {
                fold: null,
                check: null,
                call: null,
                raise: null,
                actionPos: null,
            }
        },
        mounted() {
            this.fold = document.querySelector('.fold')
            this.check = document.querySelector('.check')
            this.call = document.querySelector('.call')
            this.raise = document.querySelector('.raise')
        },
        methods: {
            inputCheck() {
                if (parseInt(event.target.value)) {
                    event.target.value = parseInt(event.target.value)
                } else {
                    event.target.value = ''
                }
                if (event.key === 'Enter') {
                    state.playerAct = parseInt(event.target.value)
                    state.numberOfAction ++
                    if (state.round === 0) {
                        state.bettingHistory[0].preflop.push(`Raise ${parseInt(event.target.value)}.`)
                        state.gameHistory.push(`player: 0, round: preflop, action: ${parseInt(event.target.value)}`)
                    } else if (state.round === 1) {
                        state.bettingHistory[0].flop.push(`Raise ${parseInt(event.target.value)}.`)
                        state.gameHistory.push(`player: 0, round: flop, action: ${parseInt(event.target.value)}`)
                    } else if (state.round === 2) {
                        state.bettingHistory[0].turn.push(`Raise ${parseInt(event.target.value)}.`)
                        state.gameHistory.push(`player: 0, round: turn, action: ${parseInt(event.target.value)}`)
                    } else {
                        state.bettingHistory[0].river.push(`Raise ${parseInt(event.target.value)}.`)
                        state.gameHistory.push(`player: 0, round: river, action: ${parseInt(event.target.value)}`)
                    }
                    this.disAbleButton()
                }
            },
            checkButtonClick() {
                state.playerAct = 'Check'
                state.numberOfAction ++
                if (state.round === 0) {
                    state.bettingHistory[0].preflop.push(`Check.`)
                    state.gameHistory.push(`player: 0, round: preflop, action: Check`)
                } else if (state.round === 1) {
                    state.bettingHistory[0].flop.push(`Check.`)
                    state.gameHistory.push(`player: 0, round: flop, action: Check`)
                } else if (state.round === 2) {
                    state.bettingHistory[0].turn.push(`Check.`)
                    state.gameHistory.push(`player: 0, round: turn, action: Check`)
                } else {
                    state.bettingHistory[0].river.push(`Check.`)
                    state.gameHistory.push(`player: 0, round: river, action: Check`)
                }
                this.disAbleButton()
            },
            foldButtonClick() {
                state.playerAct = 'Fold'
                state.numberOfAction ++
                if (state.round === 0) {
                    state.bettingHistory[0].preflop.push(`Fold.`)
                    state.gameHistory.push(`player: 0, round: preflop, action: Fold`)
                } else if (state.round === 1) {
                    state.bettingHistory[0].flop.push(`Fold.`)
                    state.gameHistory.push(`player: 0, round: flop, action: Fold`)
                } else if (state.round === 2) {
                    state.bettingHistory[0].turn.push(`Fold.`)
                    state.gameHistory.push(`player: 0, round: turn, action: Fold`)
                } else {
                    state.bettingHistory[0].river.push(`Fold.`)
                    state.gameHistory.push(`player: 0, round: river, action: Fold`)
                }
                this.disAbleButton()
            },
            callButtonClick() {
                state.playerAct = 'Call'
                state.numberOfAction ++
                if (state.round === 0) {
                    state.bettingHistory[0].preflop.push(`Call.`)
                    state.gameHistory.push(`player: 0, round: preflop, action: Call`)
                } else if (state.round === 1) {
                    state.bettingHistory[0].flop.push(`Call.`)
                    state.gameHistory.push(`player: 0, round: flop, action: Call`)
                } else if (state.round === 2) {
                    state.bettingHistory[0].turn.push(`Call.`)
                    state.gameHistory.push(`player: 0, round: turn, action: Call`)
                } else {
                    state.bettingHistory[0].river.push(`Call.`)
                    state.gameHistory.push(`player: 0, round: river, action: Call`)
                }
                this.disAbleButton()
            },
            disAbleButton() {
                this.check.style.display = 'none'
                this.fold.style.display = 'none'
                this.call.style.display = 'none'
                this.raise.style.display = 'none'
            }
        },
        components: {
            GameLogic
        }
    }
</script>