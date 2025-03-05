<template>
    <MoveToNextRound/>
</template>


<script>
import { watch } from 'vue';
import { betTableState } from '~/store/data/betTableState';
import { useMyBettbFunc } from '~/store/functions/bettableFuncStore';
import { useSounds } from '~/store/functions/soundControl'
import MoveToNextRound from './moveToNextRound.vue';
import OpenAllinCards from './openAllinCards.vue';


export default {
    setup() {
        const { closestToTheLeft } = useMyBettbFunc()
        const { isOverBet } = useMyBettbFunc()
        const { disPlayCard } = useMyBettbFunc()
        const { addGameHistory } = useMyBettbFunc()
        const { playFoldingSound } = useSounds()
        const { playCallSound } = useSounds()
        const { playCheckSound } = useSounds()
        const { playCoinDrop } = useSounds()
        return {
            betTableState,
            closestToTheLeft,
            disPlayCard,
            addGameHistory,
            isOverBet,
            playFoldingSound,
            playCallSound,
            playCheckSound,
            playCoinDrop,
        }
    },
    data() {
        return {

        }
    },
    mounted() {
        watch(() => betTableState.numberOfAction, (newval, oldval) => {
            if ((!betTableState.isGameOver) && (!betTableState.canMoveToNextRound)) {
                if ((betTableState.numberOfAction !== 0) && (!betTableState.stopBetting)) {
                    this.doAction(betTableState.playerAct, betTableState.actionPos)
                    
                }
            }
        })
    },
    methods: {
        doAction(act, pos) {
            betTableState.botTitle[pos] = act
            if (act === 'Fold') {
                this.addGameHistory(betTableState.round, 'Fold', betTableState.actionPos)
                betTableState.playerCardsElement[betTableState.actionPos * 2].style.display = 'none'
                betTableState.playerCardsElement[betTableState.actionPos * 2 + 1].style.display = 'none'
                betTableState.numberOfPlayer -= 1
                betTableState.playerStatus[pos] = false
            } else if (act === 'Check') {
                this.addGameHistory(betTableState.round, 'Check', betTableState.actionPos)
            } else if (act === 'Call') {
                if (!this.isOverBet('Call', pos)) {
                    betTableState.stackList[pos] -= (Math.max(...betTableState.betTotalList) - betTableState.betTotalList[pos])
                    betTableState.betTotalList[pos] = Math.max(...betTableState.betTotalList)
                }
            } else if (!isNaN(act)) {
                if (!this.isOverBet(act, pos)) {
                    betTableState.botTitle[pos] = `Raise:${act}`
                    betTableState.stackList[pos] -= (Math.max(...betTableState.betTotalList) + act - betTableState.betTotalList[pos])
                    betTableState.betTotalList[pos] = Math.max(...betTableState.betTotalList) + act
                }
            } else if (act === 'All in') {
                this.isOverBet('All in', pos)
            }
            betTableState.pot = this.countPot()
        },
        countPot() {
            let t = 0
            for (let i of betTableState.betTotalList) {
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