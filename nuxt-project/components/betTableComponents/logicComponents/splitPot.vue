<template>
</template>


<script>
import { watch } from 'vue';
import { state } from '~/store/data/betTableState';
import { useMyBettbFunc } from '~/store/functions/bettableFuncStore';
import ClaculateHandLevel from './claculateHandLevel.vue';


export default {
    setup() {
        const { disPlayCard } = useMyBettbFunc() 
        return {
            state,
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
        watch(() => state.isGameOver, (newval, oldval) => {
            if (state.isGameOver) {
                for (let i = 0; i < 6; i ++) {
                    if (state.playerStatus[i]) {
                        this.disPlayCard(state.cards[i * 2], this.playerCards[i * 2])
                        this.disPlayCard(state.cards[i * 2 + 1], this.playerCards[i * 2 + 1])
                    }
                }
                if (state.numberOfPlayer === 1) {
                    for (let i in state.playerStatus) {
                        if (state.playerStatus[i]) {
                            state.stackList[i] += state.pot
                            state.everyGameHistory.unshift({
                                stt: 'end',
                                winner: [i],
                            })
                        }
                    }
                } else {
                    for (let i = 0; i < 6; i ++) {
                        if (state.playerStatus[i]) {                           
                            state.lstOfHand.push([state.cards[i * 2], state.cards[i * 2 + 1]].concat(state.communityCards))
                        }
                    }
                }
            }
        })
        watch(() => state.winner, (newval, oldval)  => {
            if ((!state.haveAllinCase) && (state.winner.length >= 1)) {
                for (let i = 0; i < state.winner.length; i ++) {
                    if (state.winner.includes(0)) {
                        state.winRate = 100
                    } else {
                        state.winRate = 0
                    }
                    state.stackList[state.winner[i]] += Math.floor(state.pot/state.winner.length)
                    state.everyGameHistory.unshift({
                        stt: 'end',
                        winner: state.winner,
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