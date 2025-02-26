<template>


</template>



<script>
import { betTableState } from '~/store/data/betTableState';
import { watch } from 'vue';
import { useMyBettbFunc } from '~/store/functions/bettableFuncStore';

export default {
    setup() {
        const { addSidePot } = useMyBettbFunc()
        return {
            betTableState,
            addSidePot
        }
    },
    data() {
        return {

        }
    },
    mounted() {
        watch(() => betTableState.pot, (newval, oldval) => {
            if (betTableState.pot <= 0) {
                betTableState.isGameOver = true
            }
        }) 
        watch(() => betTableState.winner, (newval, oldval) => {
            if (betTableState.winner.length >= 1) {
                betTableState.everyGameHistory.unshift({
                    stt: 'end',
                    winner: betTableState.winner
                })
                for (let i = 0; i < betTableState.winner.length; i ++) {
                    if (betTableState.winner.length === 1) {
                        if ((betTableState.sidePot[betTableState.winner[i]] === 0)) {
                            betTableState.stackList[betTableState.winner[i]] += betTableState.pot
                            betTableState.pot = 0
                        } else {
                            let m
                            if (betTableState.pot <= betTableState.sidePot[betTableState.winner[i]]) {
                                m = betTableState.pot
                            } else {
                                m = betTableState.sidePot[betTableState.winner[i]]
                            }
                            betTableState.stackList[betTableState.winner[i]] += m
                            betTableState.pot -= m
                            betTableState.numberOfAllinPlayer -= 1
                            betTableState.allin[betTableState.winner[i]] = false
                            if (betTableState.numberOfAllinPlayer + betTableState.numberOfPlayer === 1) {
                                for (let i = 0; i < 6; i ++) {
                                    if (betTableState.playerStatus[i] || betTableState.allin[i]) {
                                        betTableState.stackList[i] += betTableState.pot
                                        betTableState.pot = 0
                                    }
                                }
                            }
                            if (betTableState.pot > 0) {
                                this.removeWinner(betTableState.winner[i])
                            }
                        }
                    }
                }
            } else {
                console.log('this case is not done yet!')
                let sidePots = []
                for (let i = 0; i < betTableState.winner.length; i ++) {
                    sidePots.push(betTableState.sidePot[winner[i]])
                }
                for (let i = 0; i < sidePots.length; i ++) {
                    if (sidePots[i] !== 0) {
                        
                    }
                }
            }
        }, { deep: true })
        if (betTableState.stopBetting) {
            if (betTableState.numberOfAllinPlayer + betTableState.numberOfPlayer === 1) {
                for (let i = 0 ;i < 6; i ++) {
                    if (betTableState.allin[i]) {
                        betTableState.stackList[i] += betTableState.pot
                        betTableState.pot = 0
                    }
                }
            } else {
                this.addSidePot()
                for (let i = 0; i < 6; i ++) {
                    if ((betTableState.playerStatus[i]) || (betTableState.allin[i])) {
                        betTableState.lstOfHand.push([betTableState.cards[i * 2], betTableState.cards[i * 2 + 1]].concat(betTableState.communityCards))
                    }
                }
            }
        }
    },
    methods: {
        removeWinner(winnerpos) {
            for (let i = 0; i < betTableState.lstOfHand.length; i ++) {
                if (betTableState.lstOfHand[i][0] === betTableState.cards[winnerpos * 2]) {
                    betTableState.lstOfHand.splice(i, 1)
                }
            }
        }
    }
}
</script>