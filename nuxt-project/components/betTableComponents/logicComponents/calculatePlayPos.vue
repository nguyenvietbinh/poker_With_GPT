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
        const { splitFlop } = useMyBettbFunc()
        const { splitCommunityCards } = useMyBettbFunc()
        return {
            betTableState,
            disPlayCard,
            splitFlop,
            splitCommunityCards,
            closestToTheLeft,
        }
    },
    data() {
        return {
        }
    },
    mounted() {
        watch(() => betTableState.round, (newval, oldval) => {
            if (!betTableState.stopBetting) {
                if (betTableState.round === 1) {
                    this.splitFlop()
                } else if (betTableState.round === 2) {
                    this.splitCommunityCards()
                } else if (betTableState.round === 3) {
                    this.splitCommunityCards()
                } else if (betTableState.round === 4) {
                    
                }
            }
        })
    } 
}
</script>
