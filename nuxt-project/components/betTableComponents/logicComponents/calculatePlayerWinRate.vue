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
            allInCards: []
        }
    },
    mounted() {
        watch(() => [betTableState.actionPos, betTableState.numberOfPlayer, betTableState.numberOfAllinPlayer], (newval, oldval) => {
            if((!betTableState.playerStatus[0]) && (!betTableState.allin[0])) {
                betTableState.winRate = 0
                this.allInCards = []
            } else {
                if (betTableState.haveAllinCase) {
                    if ((betTableState.numberOfPlayer + betTableState.numberOfAllinPlayer) === 1) {
                        betTableState.winRate = 100
                    } else {
                        if (betTableState.stopBetting) {

                        } else {
                            if ((oldval[1] + oldval[2]) !== (newval[1] + newval[2])) {
                                betTableState.winRate = this.getAllInWinRate([betTableState.cards[0], betTableState.cards[1]], betTableState.communityCards, betTableState.numberOfPlayer + betTableState.numberOfAllinPlayer)
                            } 
                        }
                    }
                } else {
                    if (((oldval[0] === null) || (oldval[0] === newval[0])) && (!betTableState.isGameOver)) {
                        if (betTableState.numberOfAllinPlayer === 1) {
                            betTableState.winRate = 100
                        } else {
                            this.GetPlayerWinRate().then(response => {
                                betTableState.winRate = response
                            })
                        }
                    }
                }
            }
        }, { deep: true })
        watch(() => [betTableState.stopBetting, betTableState.communityCards], (newval, oldval) => {
            if (betTableState.stopBetting) {
                this.allInCards = []
                for (let i = 0; i < 6; i ++) {
                    if ((betTableState.playerStatus[i]) || (betTableState.allin[i])) {
                        this.allInCards.push([betTableState.cards[i * 2], betTableState.cards[i * 2 + 1]])
                    }
                }
                betTableState.winRate = this.getAllInWinRate(this.allInCards, betTableState.communityCards)
            }
        }, { deep: true })
    },
    methods: {
        async GetPlayerWinRate() {
            return await this.getPlayerWinRate(betTableState)
        }
    }
}
</script>