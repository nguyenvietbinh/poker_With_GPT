<template>

</template>


<script>
import { watch } from 'vue';
import { betTableState } from '~/store/data/betTableState';
import { useMyBettbFunc } from '~/store/functions/bettableFuncStore';
import { useMyHandLvFunc } from '~/store/functions/handLvFuncStore';


export default {
    setup() {
        const { disPlayCard } = useMyBettbFunc()
        const { closestToTheLeft } = useMyBettbFunc()
        return {
            betTableState,
            disPlayCard,
            closestToTheLeft,
        }
    },
    data() {
        return {
            communityCards: null,
        }
    },
    mounted() {
        this.communityCards = document.querySelectorAll('.communityCards')
        watch(() => betTableState.round, (newval, oldval) => {
            if (!betTableState.stopBetting) {
                if (betTableState.round === 1) {
                    this.disPlayCard(betTableState.cards[51], this.communityCards[0])
                    betTableState.communityCards[0] = betTableState.cards[51]
                    this.disPlayCard(betTableState.cards[50], this.communityCards[1])
                    betTableState.communityCards[1] = betTableState.cards[50]
                    this.disPlayCard(betTableState.cards[49], this.communityCards[2])
                    betTableState.communityCards[2] = betTableState.cards[49]
                    betTableState.actionPos = this.closestToTheLeft(betTableState.dealer)
                } else if (betTableState.round === 2) {
                    this.disPlayCard(betTableState.cards[48], this.communityCards[3])
                    betTableState.communityCards[3] = betTableState.cards[48]
                    betTableState.actionPos = this.closestToTheLeft(betTableState.dealer)
                } else if (betTableState.round === 3) {
                    this.disPlayCard(betTableState.cards[47], this.communityCards[4])
                    betTableState.communityCards[4] = betTableState.cards[47]
                    betTableState.actionPos = this.closestToTheLeft(betTableState.dealer)
                } else if (betTableState.round === 4) {
                    
                }
            }
        })
    } 
}
</script>
