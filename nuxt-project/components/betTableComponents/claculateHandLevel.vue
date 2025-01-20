<template>

</template>

<script>
import { useMyHandLvFunc } from '../../store/functions/handLvFuncStore'
import { state } from '../../store/data/dataStore';
import { watch } from 'vue';
export default {
    setup() {
        const { searchWinner } = useMyHandLvFunc()
        const { handRanking } = useMyHandLvFunc()
        return {
            state,
            searchWinner,
            handRanking
        }
    },
    data () {
        return {
        }
    },
    mounted() {
        watch(() => state.lstOfHand, (newval, oldval) => {
            if (state.lstOfHand.length === (state.numberOfPlayer + state.numberOfAllinPlayer)) {
                if ((state.numberOfPlayer + state.numberOfAllinPlayer) > 1) {
                    state.winner = this.searchWinner(this.handRanking(state.lstOfHand))
                }
            }
        }, { deep: true })
    },
}
</script>