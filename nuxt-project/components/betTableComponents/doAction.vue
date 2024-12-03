<template>
    <betTableComponentsMoveToNextRound/>
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
            playerCards: null,
            playerAvatar: null,
        }
    },
    mounted() {
        this.playerAvatar = document.querySelectorAll('.playerAvatar')
        this.playerCards = document.querySelectorAll('.playerCard')
        this.BetTableFunctions.disPlayCard(this.BetTableData.cards[0], this.playerCards[0])
        this.BetTableFunctions.disPlayCard(this.BetTableData.cards[1], this.playerCards[1])
        watch(() => this.BetTableData.numberOfAction, (newval, oldval) => {
            if ((!this.BetTableData.isGameOver) && (!this.BetTableData.canMoveToNextRound)) {
                if ((this.BetTableData.numberOfAction !== 0) && (!this.BetTableData.stopBetting)) {
                    this.doAction(this.BetTableData.playerAct, this.BetTableData.actionPos)
                    
                }
            }
        })
    },
    methods: {
        doAction(act, pos) {
            if (act === 'Fold') {
                this.BetTableFunctions.addGameHistory(this.BetTableData.round, 'Fold', this.BetTableData.actionPos)
                this.playerCards[this.BetTableData.actionPos * 2].style.display = 'none'
                this.playerCards[this.BetTableData.actionPos * 2 + 1].style.display = 'none'
                this.BetTableData.numberOfPlayer -= 1
                this.BetTableData.playerStatus[pos] = false
            } else if (act === 'Call') {
                if (!this.BetTableFunctions.isOverBet('Call', pos)) {
                    this.BetTableData.stackList[pos] -= (Math.max(...this.BetTableData.betTotalList) - this.BetTableData.betTotalList[pos])
                    this.BetTableData.betTotalList[pos] = Math.max(...this.BetTableData.betTotalList)
                }
            } else if (!isNaN(act)) {
                if (!this.BetTableFunctions.isOverBet(act, pos)) {
                    this.BetTableData.stackList[pos] -= (Math.max(...this.BetTableData.betTotalList) + act - this.BetTableData.betTotalList[pos])
                    this.BetTableData.betTotalList[pos] = Math.max(...this.BetTableData.betTotalList) + act
                }
            } else if (act === 'All in') {
                this.BetTableFunctions.isOverBet('All in', pos)
            }
            this.BetTableData.pot = this.countPot()
        },
        countPot() {
            let t = 0
            for (let i of this.BetTableData.betTotalList) {
                t += i
            }
            return t
        }
    },
}
</script>