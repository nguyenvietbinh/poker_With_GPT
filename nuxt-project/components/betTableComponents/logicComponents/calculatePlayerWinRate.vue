<template>

</template>


<script>
import { betTableState } from '~/store/data/betTableState';
import { useMyHandLvFunc } from '~/store/functions/handLvFuncStore';
export default {
    setup() {
        const { getPlayerWinRate } = useMyHandLvFunc()
        const { getAllInWinRate } = useMyHandLvFunc()
        return {
            betTableState,
            getPlayerWinRate,
            getAllInWinRate
        }
    },
    data() {
        return {
            allInPlayer: []
        }
    },
    mounted() {
        watch(() => [betTableState.actionPos, betTableState.numberOfPlayer, betTableState.numberOfAllinPlayer], (newval, oldval) => {
            if((!betTableState.playerStatus[0]) && (!betTableState.allin[0])) {
                betTableState.winRate = 0
                this.allInPlayer = []
            } else {
                if ((betTableState.haveAllinCase) && (!betTableState.stopBetting)) {
                    if ((betTableState.numberOfPlayer + betTableState.numberOfAllinPlayer) === 1) {
                        betTableState.winRate = 100
                    } else {
                        if ((oldval[1] + oldval[2]) !== (newval[1] + newval[2])) {
                            betTableState.calculatingWinrate = true
                            this.getPlayerWinRate(betTableState)
                            .then(response => {
                                betTableState.winRate = response
                                betTableState.calculatingWinrate = false
                            })
                            .catch(Error => {
                                console.error(Error)
                                betTableState.winRate = 0
                                betTableState.calculatingWinrate = false
                            })
                        } 
                    }
                } else {
                    if (((oldval[0] === null) || (oldval[0] === newval[0])) && (!betTableState.isGameOver)) {
                        if (betTableState.numberOfAllinPlayer === 1) {
                            betTableState.winRate = 100
                        } else {
                            betTableState.calculatingWinrate = true
                            this.getPlayerWinRate(betTableState)
                            .then(response => {
                                betTableState.winRate = response
                                betTableState.calculatingWinrate = false
                            })
                            .catch(Error => {
                                console.error(Error)
                                betTableState.winRate = 0
                                betTableState.calculatingWinrate = false
                            })
                        }
                    }
                }
            }
        }, { deep: true })
        watch(() => [betTableState.stopBetting, betTableState.communityCards], (newval, oldval) => {
            if (betTableState.stopBetting) {
                this.allInPlayer = []
                for (let i = 0; i < 6; i ++) {
                    if ((betTableState.playerStatus[i]) || (betTableState.allin[i])) {
                        this.allInPlayer.push([betTableState.cards[i * 2], betTableState.cards[i * 2 + 1]])
                    }
                }
                betTableState.calculatingWinrate = true
                this.getAllInWinRate([this.allInPlayer, betTableState])
                .then(response => {
                    betTableState.winRate = response
                    betTableState.calculatingWinrate = false
                })
            }
        }, { deep: true })
    },
}
</script>