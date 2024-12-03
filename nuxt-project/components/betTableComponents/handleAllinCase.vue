<template>
    <betTableComponentsOpenAllinCards v-if="this.BetTableData.stopBetting"/>
</template>


<script>



export default {
    setup() {
        const { closestToTheLeft } = useMyFunction()
        return {
            closestToTheLeft,
            state
        }
    },
    data() {
        return {
            bigestAllin: 0
        }
    },
    mounted() {
        watch(() => this.BetTableData.numberOfAction, (newval, oldval) => {
            if ((this.BetTableData.numberOfPlayer === 0) || (this.BetTableData.round === 4)) {
                this.BetTableData.stopBetting = true
            } else if (this.BetTableData.numberOfPlayer === 1) {
                this.bigestAllin = this.getBigestAllin()
                for (let i = 0; i < 6; i ++) {
                    if (this.BetTableData.playerStatus[i]) {
                        if (this.BetTableData.betTotalList[i] >= this.bigestAllin) {
                            this.BetTableData.stopBetting = true
                        }
                    }
                }
            }
        })
    },
    methods: {
        getBigestAllin() {
            let ans = 0
            for (let i in this.BetTableData.allin) {
                if (this.BetTableData.allin[i]) {
                    if (this.BetTableData.betTotalList[i] > ans) {
                        ans = this.BetTableData.betTotalList[i]
                    }
                }
            }
            return ans
        }
    },
}
</script>