<template>
    <betTableComponentsCalculatePlayPos/>
</template>



<script>


export default {
    setup() {
        const BetTableFunctions = betTableFunctions()
        const BetTableData = betTableData()
        return {
            BetTableData,
            BetTableFunctions
        }
    },
    data() {
        return {
            numberOfPlayerInCurrentRound: null,
        }
    },
    mounted() {
        watch(() => this.BetTableData.numberOfAction, (newval, oldval) => {
            if ((this.BetTableData.round === 0) && (this.BetTableData.numberOfAction === 1)) {
                let count = 0
                for (let i = 0; i < 6; i ++) {
                    if ((this.BetTableData.stackList[i] !== 0) && (!this.BetTableData.allin[i])) {
                        count ++
                    }
                }
                this.numberOfPlayerInCurrentRound = count
            }
            if (!this.BetTableData.stopBetting) {
                if (this.BetTableData.numberOfAction === 0) {
                    this.numberOfPlayerInCurrentRound = this.BetTableData.numberOfPlayer
                } else {
                    if (this.BetTableData.numberOfAction >= this.numberOfPlayerInCurrentRound) {
                        if (this.betTotalIsEqual()) {
                            this.BetTableData.actionPos = null
                            this.BetTableData.numberOfAction = 0
                            this.BetTableData.round ++
                        } else {
                            this.BetTableData.actionPos = this.BetTableFunctions.closestToTheLeft(this.BetTableData.actionPos)
                        }
                    } else {
                        this.BetTableData.actionPos = this.BetTableFunctions.closestToTheLeft(this.BetTableData.actionPos)
                    }
                }
            }
        })
    },
    methods: {
        betTotalIsEqual() {
            if ((this.BetTableData.numberOfAction !== 0) && (this.BetTableData.numberOfPlayer > 1)) {
                let bigestBetSize = Math.max(...this.BetTableData.betTotalList)
                for (let i in this.BetTableData.playerStatus) {
                    if (this.BetTableData.playerStatus[i]) {
                        if (this.BetTableData.betTotalList[i] < bigestBetSize) {
                            return false
                        }
                    }
                }
                return true
            }
        },
    },
}

</script>