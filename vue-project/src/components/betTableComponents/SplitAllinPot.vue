<template>


</template>



<script>
import { state } from '@/store/dataStore';
import { watch } from 'vue';
import { useMyFunction } from '../../store/functionStore';

export default {
    setup() {
        const { addSidePot } = useMyFunction()
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
        watch(() => state.winner, (newval, oldval) => {
            if (state.winner.length >= 1) {
                for (let i = 0; i < state.winner.length; i ++) {
                    if (state.winner.length === 1) {
                        if ((state.sidePot[state.winner[i]] === 0) || (state.sidePot[state.winner[i]] === Math.max(...state.sidePot))) {
                            state.stackList[state.winner[i]] += state.pot
                            state.pot = 0
                        } else {
                            state.stackList[state.winner[i]] += state.sidePot[state.winner[i]]
                            state.sidePot -= state.sidePot[state.winner[i]]
                        }
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
                console.log(JSON.stringify(state.lstOfHand))
            }
        }
    },
    methods: {

    }
}
</script>