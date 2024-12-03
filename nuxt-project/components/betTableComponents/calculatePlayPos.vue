<template>

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
            communityCards: null,
        }
    },
    mounted() {
        this.communityCards = document.querySelectorAll('.communityCards')
        watch(() => this.BetTableData.round, (newval, oldval) => {
            if (!this.BetTableData.stopBetting) {
                if (this.BetTableData.round === 1) {
                this.disPlayCard(this.BetTableData.cards[51], this.communityCards[0])
                    this.BetTableData.communityCards[0] = this.BetTableData.cards[51]
                    this.disPlayCard(this.BetTableData.cards[50], this.communityCards[1])
                    this.BetTableData.communityCards[1] = this.BetTableData.cards[50]
                    this.disPlayCard(this.BetTableData.cards[49], this.communityCards[2])
                    this.BetTableData.communityCards[2] = this.BetTableData.cards[49]
                    this.BetTableData.actionPos = this.closestToTheLeft(this.BetTableData.dealer)
                } else if (this.BetTableData.round === 2) {
                    this.disPlayCard(this.BetTableData.cards[48], this.communityCards[3])
                    this.BetTableData.communityCards[3] = this.BetTableData.cards[48]
                    this.BetTableData.actionPos = this.closestToTheLeft(this.BetTableData.dealer)
                } else if (this.BetTableData.round === 3) {
                    this.disPlayCard(this.BetTableData.cards[47], this.communityCards[4])
                    this.BetTableData.communityCards[4] = this.BetTableData.cards[47]
                    this.BetTableData.actionPos = this.closestToTheLeft(this.BetTableData.dealer)
                } else if (this.BetTableData.round === 4) {
                    
                }
            }
        })
    } 
}
</script>
