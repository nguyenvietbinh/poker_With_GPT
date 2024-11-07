<template>
    <MoveToNextRound/>
</template>


<script>
import { watch } from 'vue';
import { state } from '../store/dataStore';
import { useMyFunction } from '../store/functionStore';
import MoveToNextRound from './moveToNextRound.vue';


export default {
    setup() {
        const { closestToTheLeft } = useMyFunction()
        const { disPlayCard } = useMyFunction()
        return {
            state,
            closestToTheLeft,
            disPlayCard
        }
    },
    data() {
        return {
            playerCards: null,
            playerAvatar: null,
        }
    },
    mounted() {
        this.playerAvatar = document.querySelectorAll('.playerAvatar')
        this.playerCards = document.querySelectorAll('.playerCard')
        this.disPlayCard(state.cards[0], this.playerCards[0])
        this.disPlayCard(state.cards[1], this.playerCards[1])
        watch(() => state.numberOfAction, (newval, oldval) => {
            if ((!state.isGameOver) && (!state.canMoveToNextRound)) {
                if (state.numberOfAction !== 0) {
                    this.doAction(state.playerAct, state.actionPos)
                    
                }
            }
        })
    },
    methods: {
        doAction(act, pos) {
            if (act === 'Fold') {
                this.playerCards[state.actionPos * 2].style.display = 'none'
                this.playerCards[state.actionPos * 2 + 1].style.display = 'none'
                state.numberOfPlayer -= 1
                state.playerStatus[pos] = false
            } else if (act === 'Call') {
                state.stackList[pos] -= (Math.max(...state.betTotalList) - state.betTotalList[pos])
                state.betTotalList[pos] = Math.max(...state.betTotalList)
            } else if (!isNaN(act)) {
                state.stackList[pos] -= (Math.max(...state.betTotalList) + act - state.betTotalList[pos])
                state.betTotalList[pos] = Math.max(...state.betTotalList) + act
            } else if (act === 'All in') {
                state.betTotalList[pos] = state.stackList[pos] + state.betTotalList[pos]
                state.stackList[pos] = 0
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
        MoveToNextRound
    }
}
</script>