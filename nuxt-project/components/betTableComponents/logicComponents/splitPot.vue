<template>
</template>


<script>
import { watch } from 'vue';
import { betTableState } from '~/store/data/betTableState';
import { useMyBettbFunc } from '~/store/functions/bettableFuncStore';
import ClaculateHandLevel from './claculateHandLevel.vue';


export default {
    setup() {
        const { disPlayCard } = useMyBettbFunc() 
        return {
            betTableState,
            disPlayCard
        }
    },
    data() {
        return {
            playerCards: null
        }
    },
    mounted() {
        this.playerCards = document.querySelectorAll('.playerCard')
        watch(() => betTableState.isGameOver, (newval, oldval) => {
            if (betTableState.isGameOver) {
                for (let i = 0; i < 6; i ++) {
                    if (betTableState.playerStatus[i]) {
                        this.disPlayCard(betTableState.cards[i * 2], this.playerCards[i * 2])
                        this.disPlayCard(betTableState.cards[i * 2 + 1], this.playerCards[i * 2 + 1])
                    }
                }
                if (betTableState.numberOfPlayer === 1) {
                    for (let i in betTableState.playerStatus) {
                        if (betTableState.playerStatus[i]) {
                            betTableState.stackList[i] += betTableState.pot
                            betTableState.everyGameHistory.unshift({
                                stt: 'end',
                                winner: [i],
                            })
                        }
                    }
                } else {
                    for (let i = 0; i < 6; i ++) {
                        if (betTableState.playerStatus[i]) {                           
                            betTableState.lstOfHand.push([betTableState.cards[i * 2], betTableState.cards[i * 2 + 1]].concat(betTableState.communityCards))
                        }
                    }
                }
            }
        })
        watch(() => betTableState.winner, (newval, oldval)  => {
            if ((!betTableState.haveAllinCase) && (betTableState.winner.length >= 1)) {
                for (let i = 0; i < betTableState.winner.length; i ++) {
                    if (betTableState.winner.includes(0)) {
                        betTableState.winRate = 100
                    } else {
                        betTableState.winRate = 0
                    }
                    betTableState.stackList[betTableState.winner[i]] += Math.floor(betTableState.pot/betTableState.winner.length)
                    betTableState.everyGameHistory.unshift({
                        stt: 'end',
                        winner: betTableState.winner,
                    })
                }
            }
        }, { deep: true })
    },
    methods: {

    },
    components: {
        ClaculateHandLevel
    }
}
</script>