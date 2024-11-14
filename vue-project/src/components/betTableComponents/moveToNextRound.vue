<template>
    <CalculatePlayPos/>
</template>



<script>
import { watch } from 'vue';
import { state } from '../../store/dataStore';
import CalculatePlayPos from './calculatePlayPos.vue';
import { useMyFunction } from '../../store/functionStore';

export default {
    setup() {
        const { closestToTheLeft } = useMyFunction()
        return {
            state,
            closestToTheLeft
        }
    },
    data() {
        return {
            numberOfPlayerInCurrentRound: 6,
        }
    },
    mounted() {
        watch(() => state.numberOfAction, (newval, oldval) => {
            if (state.numberOfAction === 0) {
                this.numberOfPlayerInCurrentRound = state.numberOfPlayer
            } else {
                if (state.numberOfAction >= this.numberOfPlayerInCurrentRound) {
                    if (this.betTotalIsEqual()) {
                        state.actionPos = null
                        state.numberOfAction = 0
                        state.round ++
                    } else {
                        state.actionPos = this.closestToTheLeft(state.actionPos)
                    }
                } else {
                    state.actionPos = this.closestToTheLeft(state.actionPos)
                }
            }
        })
    },
    methods: {
        betTotalIsEqual() {
            if ((state.numberOfAction !== 0) && (state.numberOfPlayer > 1)) {
                let bigestBetSize = Math.max(...state.betTotalList)
                for (let i in state.playerStatus) {
                    if (state.playerStatus[i]) {
                        if (state.betTotalList[i] < bigestBetSize) {
                            return false
                        }
                    }
                }
                return true
            }
        }
    },
    components: {
        CalculatePlayPos
    }
}

</script>