<template>
    <CalculatePlayPos/>
</template>



<script>
import { watch } from 'vue';
import { state } from '~/store/data/betTableState';
import CalculatePlayPos from './calculatePlayPos.vue';
import { useMyBettbFunc } from '~/store/functions/bettableFuncStore';

export default {
    setup() {
        const { closestToTheLeft } = useMyBettbFunc()
        const { addSidePot } = useMyBettbFunc()
        return {
            state,
            closestToTheLeft,
            addSidePot
        }
    },
    data() {
        return {
            numberOfPlayerInCurrentRound: null,
        }
    },
    mounted() {
        watch(() => state.numberOfAction, (newval, oldval) => {
            if ((state.round === 0) && (state.numberOfAction === 1)) {
                let count = 0
                for (let i = 0; i < 6; i ++) {
                    if ((state.stackList[i] !== 0) && (!state.allin[i])) {
                        count ++
                    }
                }
                this.numberOfPlayerInCurrentRound = count
            }
            if (!state.stopBetting) {
                if (state.numberOfAction === 0) {
                    this.numberOfPlayerInCurrentRound = state.numberOfPlayer
                } else {
                    if (state.numberOfAction >= this.numberOfPlayerInCurrentRound) {
                        if (this.betTotalIsEqual()) {
                            this.changeTitle()
                            state.actionPos = null
                            state.numberOfAction = 0
                            state.round ++
                            state.everyGameHistory.unshift({ stt: 'move'})
                        } else {
                            state.actionPos = this.closestToTheLeft(state.actionPos)
                        }
                    } else {
                        state.actionPos = this.closestToTheLeft(state.actionPos)
                    }
                }
            }
        })
    },
    methods: {
        changeTitle() {
            for (let i = 0; i < 6; i ++) {
                if ((state.botTitle[i] !== 'Fold') && (state.botTitle[i] !== 'Eliminated') && (state.botTitle[i] !== 'All in')) {
                    state.botTitle[i] = `Bot${i}`
                }
            }
        },
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
        },
    },
    components: {
        CalculatePlayPos
    }
}

</script>