<template>
    <MoveToNextRound/>
</template>


<script>
import { watch } from 'vue';
import { state } from '~/store/data/dataStore';
import { useMyBettbFunc } from '~/store/functions/bettableFuncStore';
import { useMyHandLvFunc } from '~/store/functions/handLvFuncStore';
import { useSounds } from '~/store/functions/soundControl'
import MoveToNextRound from './moveToNextRound.vue';
import OpenAllinCards from './openAllinCards.vue';


export default {
    setup() {
        const { closestToTheLeft } = useMyBettbFunc()
        const { isOverBet } = useMyBettbFunc()
        const { disPlayCard } = useMyBettbFunc()
        const { addGameHistory } = useMyBettbFunc()
        const { getPlayerWinRate } = useMyHandLvFunc()
        const { playFoldingSound } = useSounds()
        const { playCallSound } = useSounds()
        const { playCheckSound } = useSounds()
        const { playCoinDrop } = useSounds()
        return {
            state,
            closestToTheLeft,
            disPlayCard,
            addGameHistory,
            isOverBet,
            getPlayerWinRate,
            playFoldingSound,
            playCallSound,
            playCheckSound,
            playCoinDrop,
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
                this.playFoldingSound()
                this.addGameHistory(state.round, 'Fold', state.actionPos)
                this.playerCards[state.actionPos * 2].style.display = 'none'
                this.playerCards[state.actionPos * 2 + 1].style.display = 'none'
                state.numberOfPlayer -= 1
                state.playerStatus[pos] = false
                state.winRate = this.getPlayerWinRate([state.cards[0], state.cards[1]], state.communityCards, (state.numberOfPlayer + state.numberOfAllinPlayer))
            } else if (act === 'Check') {
                this.playCheckSound()
                this.addGameHistory(state.round, 'Check', state.actionPos)
            } else if (act === 'Call') {
                if (!this.isOverBet('Call', pos)) {
                    this.playCallSound()
                    state.stackList[pos] -= (Math.max(...state.betTotalList) - state.betTotalList[pos])
                    state.betTotalList[pos] = Math.max(...state.betTotalList)
                }
            } else if (!isNaN(act)) {
                if (!this.isOverBet(act, pos)) {
                    this.playCoinDrop()
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