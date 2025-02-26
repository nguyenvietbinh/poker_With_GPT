<template>

</template>


<script>
import { state } from '~/store/data/dataStore';
import { useMyHandLvFunc } from '~/store/functions/handLvFuncStore';
export default {
    setup() {
        const { getPlayerWinRate } = useMyHandLvFunc()
        const { getAllInWinRate } = useMyHandLvFunc()
        return {
            state,
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
        watch(() => [state.actionPos, state.numberOfPlayer, state.numberOfAllinPlayer], (newval, oldval) => {
            if((!state.playerStatus[0]) && (!state.allin[0])) {
                state.winRate = 0
                this.allInCards = []
            } else {
                if (state.haveAllinCase) {
                    if ((state.numberOfPlayer + state.numberOfAllinPlayer) === 1) {
                        state.winRate = 100
                    } else {
                        if (state.stopBetting) {

                        } else {
                            if ((oldval[1] + oldval[2]) !== (newval[1] + newval[2])) {
                                state.winRate = this.getAllInWinRate([state.cards[0], state.cards[1]], state.communityCards, state.numberOfPlayer + state.numberOfAllinPlayer)
                            } 
                        }
                    }
                } else {
                    if (((oldval[0] === null) || (oldval[0] === newval[0])) && (!state.isGameOver)) {
                        if (state.numberOfAllinPlayer === 1) {
                            state.winRate = 100
                        } else {
                            console.log('1')
                            this.GetPlayerWinRate().then(response => {
                                console.log('2')
                                state.winRate = response
                            })
                        }
                    }
                }
            }
        }, { deep: true })
        watch(() => [state.stopBetting, state.communityCards], (newval, oldval) => {
            if (state.stopBetting) {
                this.allInCards = []
                for (let i = 0; i < 6; i ++) {
                    if ((state.playerStatus[i]) || (state.allin[i])) {
                        this.allInCards.push([state.cards[i * 2], state.cards[i * 2 + 1]])
                    }
                }
                state.winRate = this.getAllInWinRate(this.allInCards, state.communityCards)
            }
        }, { deep: true })
    },
    methods: {
        async GetPlayerWinRate() {
            return await this.getPlayerWinRate([[state.cards[0], state.cards[1]], state.communityCards, state.numberOfPlayer])
        }
    }
}
</script>