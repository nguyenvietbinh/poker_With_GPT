<template>
    <CalculatePlayPos/>
</template>



<script>
import { watch } from 'vue';
import { betTableState } from '~/store/data/betTableState';
import CalculatePlayPos from './calculatePlayPos.vue';
import { useMyBettbFunc } from '~/store/functions/bettableFuncStore';

export default {
    setup() {
        const { closestToTheLeft } = useMyBettbFunc()
        const { addSidePot } = useMyBettbFunc()
        return {
            betTableState,
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
        watch(() => betTableState.numberOfAction, (newval, oldval) => {
            if ((betTableState.round === 0) && (betTableState.numberOfAction === 1)) {
                let count = 0
                for (let i = 0; i < 6; i ++) {
                    if ((betTableState.stackList[i] !== 0) && (!betTableState.allin[i])) {
                        count ++
                    }
                }
                this.numberOfPlayerInCurrentRound = count
            }
            if (!betTableState.stopBetting) {
                if (betTableState.numberOfAction === 0) {
                    this.numberOfPlayerInCurrentRound = betTableState.numberOfPlayer
                } else {
                    if (betTableState.numberOfAction >= this.numberOfPlayerInCurrentRound) {
                        if (this.betTotalIsEqual()) {
                            this.changeTitle()
                            betTableState.actionPos = null
                            betTableState.numberOfAction = 0
                            betTableState.round ++
                            betTableState.everyGameHistory.unshift({ stt: 'move'})
                        } else {
                            betTableState.actionPos = this.closestToTheLeft(betTableState.actionPos)
                        }
                    } else {
                        betTableState.actionPos = this.closestToTheLeft(betTableState.actionPos)
                    }
                }
            }
        })
    },
    methods: {
        changeTitle() {
            for (let i = 0; i < 6; i ++) {
                if ((betTableState.botTitle[i] !== 'Fold') && (betTableState.botTitle[i] !== 'Eliminated') && (betTableState.botTitle[i] !== 'All in')) {
                    betTableState.botTitle[i] = `Bot${i}`
                }
            }
        },
        betTotalIsEqual() {
            if ((betTableState.numberOfAction !== 0) && (betTableState.numberOfPlayer > 1)) {
                let bigestBetSize = Math.max(...betTableState.betTotalList)
                for (let i in betTableState.playerStatus) {
                    if (betTableState.playerStatus[i]) {
                        if (betTableState.betTotalList[i] < bigestBetSize) {
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