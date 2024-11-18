<template>


</template>



<script>
import { state } from '@/store/dataStore';
import { watch } from 'vue';


export default {
    setup() {
        return {
            state
        }
    },
    data() {
        return {

        }
    },
    mounted() {
        if (state.stopBetting) {
            if (state.numberOfAllinPlayer + state.numberOfPlayer === 1) {
                for (let i = 0 ;i < 6; i ++) {
                    if (state.allin[i]) {
                        state.stackList[i] += state.pot
                        state.pot = 0
                    }
                }
            } else {
                for (let i = 0; i < 6; i ++) {
                    if ((state.playerStatus[i]) || (state.allin[i])) {
                        state.lstOfHand.push([state.cards[i * 2], state.cards[i * 2 + 1]].concat(state.communityCards))
                        console.log('as')
                    }
                }
            }
        }
    },
    methods: {

    }
}
</script>