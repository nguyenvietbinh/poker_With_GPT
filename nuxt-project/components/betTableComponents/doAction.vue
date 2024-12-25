<template>
    <MoveToNextRound/>
</template>


<script>
import { watch } from 'vue';
import { state } from '../../store/dataStore';
import { useMyFunction } from '../../store/functionStore';
import MoveToNextRound from './moveToNextRound.vue';
import OpenAllinCards from './openAllinCards.vue';


export default {
    setup() {
        const { closestToTheLeft } = useMyFunction()
        const { isOverBet } = useMyFunction()
        const { disPlayCard } = useMyFunction()
        const { addGameHistory } = useMyFunction()
        return {
            state,
            closestToTheLeft,
            disPlayCard,
            addGameHistory,
            isOverBet
        }
    },
    data() {
        return {
            playerCards: null,
            playerAvatar: null,
        }
    },
    mounted() {
        this.playerAvatar = document.querySelectorAll('.avatar')
        this.playerCards = document.querySelectorAll('.playerCard')
        watch(() => state.numberOfAction, (newval, oldval) => {
            if ((!state.isGameOver) && (!state.canMoveToNextRound)) {
                if ((state.numberOfAction !== 0) && (!state.stopBetting)) {
                    this.doAction(state.playerAct, state.actionPos)
                    
                }
            }
        })
    },
    methods: {
        doAction(act, pos) {
            state.botTitle[pos] = act
            if (act === 'Fold') {
                this.addGameHistory(state.round, 'Fold', state.actionPos)
                this.playerCards[state.actionPos * 2].style.display = 'none'
                this.playerCards[state.actionPos * 2 + 1].style.display = 'none'
                state.numberOfPlayer -= 1
                state.playerStatus[pos] = false
            } else if (act === 'Check') {
                this.addGameHistory(state.round, 'Check', state.actionPos)
            } else if (act === 'Call') {
                if (!this.isOverBet('Call', pos)) {
                    state.stackList[pos] -= (Math.max(...state.betTotalList) - state.betTotalList[pos])
                    state.betTotalList[pos] = Math.max(...state.betTotalList)
                }
            } else if (!isNaN(act)) {
                if (!this.isOverBet(act, pos)) {
                    state.botTitle[pos] = `Raise:${act}`
                    state.stackList[pos] -= (Math.max(...state.betTotalList) + act - state.betTotalList[pos])
                    state.betTotalList[pos] = Math.max(...state.betTotalList) + act
                }
            } else if (act === 'All in') {
                this.isOverBet('All in', pos)
            }
            state.pot = this.countPot()
        },
        countPot() {
            let t = 0
            for (let i of state.betTotalList) {
                t += i
            }
            return t
        }
    },
    components: {
        MoveToNextRound,
        OpenAllinCards
    }
}
</script>