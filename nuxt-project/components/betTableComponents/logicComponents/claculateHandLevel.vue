<template>

</template>

<script>
import { useMyHandLvFunc } from '~/store/functions/handLvFuncStore'
import { betTableState } from '~/store/data/betTableState';
import { watch } from 'vue';
export default {
    setup() {
        const { searchWinner } = useMyHandLvFunc()
        const { handRanking } = useMyHandLvFunc()
        return {
            betTableState,
            searchWinner,
            handRanking
        }
    },
    data () {
        return {
        }
    },
    mounted() {
        watch(() => betTableState.lstOfHand, (newval, oldval) => {
            if (betTableState.lstOfHand.length === (betTableState.numberOfPlayer + betTableState.numberOfAllinPlayer)) {
                if ((betTableState.numberOfPlayer + betTableState.numberOfAllinPlayer) > 1) {
                    betTableState.winner = this.searchWinner(this.handRanking(betTableState.lstOfHand))
                }
            }
        }, { deep: true })
    },
}
</script>