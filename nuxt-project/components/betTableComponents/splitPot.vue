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
            playerCards: null
        }
    },
    mounted() {
        this.playerCards = document.querySelectorAll('.playerCard')
        watch(() => this.BetTableData.isGameOver, (newval, oldval) => {
            if (this.BetTableData.isGameOver) {
                for (let i = 0; i < 6; i ++) {
                    if (this.BetTableData.playerStatus[i]) {
                        this.disPlayCard(this.BetTableData.cards[i * 2], this.playerCards[i * 2])
                        this.disPlayCard(this.BetTableData.cards[i * 2 + 1], this.playerCards[i * 2 + 1])
                    }
                }
                if (this.BetTableData.numberOfPlayer === 1) {
                    for (let i in this.BetTableData.playerStatus) {
                        if (this.BetTableData.playerStatus[i]) {
                            this.BetTableData.stackList[i] += this.BetTableData.pot
                        }
                    }
                } else {
                    for (let i = 0; i < 6; i ++) {
                        if (this.BetTableData.playerStatus[i]) {                           
                            this.BetTableData.lstOfHand.push([this.BetTableData.cards[i * 2], this.BetTableData.cards[i * 2 + 1]].concat(this.BetTableData.communityCards))
                        }
                    }
                }
            }
        })
        watch(() => this.BetTableData.winner, (newval, oldval)  => {
            if ((!this.BetTableData.haveAllinCase) && (this.BetTableData.winner.length >= 1)) {
                for (let i = 0; i < this.BetTableData.winner.length; i ++) {
                    this.BetTableData.stackList[this.BetTableData.winner[i]] += Math.floor(this.BetTableData.pot/this.BetTableData.winner.length)
                }
            }
        }, { deep: true })
    },
    methods: {

    },
}
</script>