<template>

</template>


<script>
import { watch } from 'vue';
import { state } from '../../store/data/dataStore';
import { useMyBettbFunc } from '../../store/functions/bettableFuncStore';
import { useMyHandLvFunc } from '~/store/functions/handLvFuncStore';


export default {
    setup() {
        const { disPlayCard } = useMyBettbFunc()
        const { closestToTheLeft } = useMyBettbFunc()
        const { getPlayerWinRate } = useMyHandLvFunc()
        return {
            state,
            disPlayCard,
            closestToTheLeft,
            getPlayerWinRate
        }
    },
    data() {
        return {
            communityCards: null,
        }
    },
    mounted() {
        this.communityCards = document.querySelectorAll('.communityCards')
        watch(() => state.round, (newval, oldval) => {
            if (!state.stopBetting) {
                if (state.round === 1) {
                    this.disPlayCard(state.cards[51], this.communityCards[0])
                    state.communityCards[0] = state.cards[51]
                    this.disPlayCard(state.cards[50], this.communityCards[1])
                    state.communityCards[1] = state.cards[50]
                    this.disPlayCard(state.cards[49], this.communityCards[2])
                    state.communityCards[2] = state.cards[49]
                    state.winRate = this.getPlayerWinRate([state.cards[0], state.cards[1]], state.communityCards, state.numberOfPlayer)
                    state.actionPos = this.closestToTheLeft(state.dealer)
                } else if (state.round === 2) {
                    this.disPlayCard(state.cards[48], this.communityCards[3])
                    state.communityCards[3] = state.cards[48]
                    state.winRate = this.getPlayerWinRate([state.cards[0], state.cards[1]], state.communityCards, state.numberOfPlayer)
                    state.actionPos = this.closestToTheLeft(state.dealer)
                } else if (state.round === 3) {
                    this.disPlayCard(state.cards[47], this.communityCards[4])
                    state.communityCards[4] = state.cards[47]
                    state.winRate = this.getPlayerWinRate([state.cards[0], state.cards[1]], state.communityCards, state.numberOfPlayer)
                    state.actionPos = this.closestToTheLeft(state.dealer)
                } else if (state.round === 4) {
                    
                }
            }
        })
    } 
}
</script>
