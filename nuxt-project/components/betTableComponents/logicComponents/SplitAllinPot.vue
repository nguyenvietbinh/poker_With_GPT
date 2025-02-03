<template>


</template>



<script>
import { state } from '~/store/data/dataStore';
import { watch } from 'vue';
import { useMyBettbFunc } from '~/store/functions/bettableFuncStore';

export default {
    setup() {
        const { addSidePot } = useMyBettbFunc()
        return {
            state,
            addSidePot
        }
    },
    data() {
        return {

        }
    },
    mounted() {
        watch(() => state.pot, (newval, oldval) => {
            if (state.pot <= 0) {
                state.isGameOver = true
            }
        }) 
        watch(() => state.winner, (newval, oldval) => {
            if (state.winner.length >= 1) {
                state.everyGameHistory.unshift({
                    stt: 'end',
                    winner: state.winner
                })
                for (let i = 0; i < state.winner.length; i ++) {
                    if (state.winner.length === 1) {
                        if ((state.sidePot[state.winner[i]] === 0)) {
                            state.stackList[state.winner[i]] += state.pot
                            state.pot = 0
                        } else {
                            let m
                            if (state.pot <= state.sidePot[state.winner[i]]) {
                                m = state.pot
                            } else {
                                m = state.sidePot[state.winner[i]]
                            }
                            state.stackList[state.winner[i]] += m
                            state.pot -= m
                            state.numberOfAllinPlayer -= 1
                            state.allin[state.winner[i]] = false
                            if (state.numberOfAllinPlayer + state.numberOfPlayer === 1) {
                                for (let i = 0; i < 6; i ++) {
                                    if (state.playerStatus[i] || state.allin[i]) {
                                        state.stackList[i] += state.pot
                                        state.pot = 0
                                    }
                                }
                            }
                            if (state.pot > 0) {
                                this.removeWinner(state.winner[i])
                            }
                        }
                    }
                }
            } else {
                console.log('this case is not done yet!')
                let sidePots = []
                for (let i = 0; i < state.winner.length; i ++) {
                    sidePots.push(state.sidePot[winner[i]])
                }
                for (let i = 0; i < sidePots.length; i ++) {
                    if (sidePots[i] !== 0) {
                        
                    }
                }
            }
        }, { deep: true })
        if (state.stopBetting) {
            if (state.numberOfAllinPlayer + state.numberOfPlayer === 1) {
                for (let i = 0 ;i < 6; i ++) {
                    if (state.allin[i]) {
                        state.stackList[i] += state.pot
                        state.pot = 0
                    }
                }
            } else {
                this.addSidePot()
                for (let i = 0; i < 6; i ++) {
                    if ((state.playerStatus[i]) || (state.allin[i])) {
                        state.lstOfHand.push([state.cards[i * 2], state.cards[i * 2 + 1]].concat(state.communityCards))
                    }
                }
            }
        }
    },
    methods: {
        removeWinner(winnerpos) {
            for (let i = 0; i < state.lstOfHand.length; i ++) {
                if (state.lstOfHand[i][0] === state.cards[winnerpos * 2]) {
                    state.lstOfHand.splice(i, 1)
                }
            }
        }
    }
}
</script>