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
            playerCards: null,
            dealerDots: null,
            smblindDots: null,
            bigblinhDots: null
        }
    },
    mounted() {
        this.playerCards = document.querySelectorAll('.playerCard')
        this.dealerDots = document.querySelectorAll('.dealer')
        this.smblindDots = document.querySelectorAll('.smblind')
        this.bigblinhDots = document.querySelectorAll('.bigblind')
        if (this.BetTableData.blindPos === null) {
            this.BetTableData.blindPos = Math.floor(Math.random() * 6)
            this.BetTableData.smBlind = this.BetTableFunctions.closestToTheRight(this.BetTableData.blindPos)
            this.BetTableData.dealer = this.BetTableFunctions.closestToTheRight(this.BetTableData.smBlind)
        }
        this.displayPos()
        this.BetTableData.cards = this.BetTableFunctions.mixCards()
        this.BetTableFunctions.disPlayCard(this.BetTableData.cards[0], this.playerCards[0])
        this.BetTableFunctions.disPlayCard(this.BetTableData.cards[1], this.playerCards[1])
        this.countBlind(this.BetTableData.blindPos)
        this.calculateStackList()
        console.log(JSON.stringify(this.BetTableData.betTotalList))
        this.BetTableData.actionPos = this.BetTableFunctions.closestToTheLeft(this.BetTableData.blindPos)
        this.BetTableData.isGameOver = false
    },
    methods: {
        displayPos() {
            for (let i = 0; i < 6; i ++) {
                this.dealerDots[i].style.display = 'none'
                this.smblindDots[i].style.display = 'none'
                this.bigblinhDots[i].style.display = 'none'
            }
            this.dealerDots[this.BetTableData.dealer].style.display = 'block'
            this.smblindDots[this.BetTableData.smBlind].style.display = 'block'
            this.bigblinhDots[this.BetTableData.blindPos].style.display = 'block'
        },
        countBlind(bb) {
            this.BetTableData.betTotalList[bb] = 10
            this.BetTableData.betTotalList[this.BetTableFunctions.closestToTheRight(bb)] = 5
        },
        calculateStackList() {
            this.BetTableData.pot = 0
            for (let i = 0; i < 6; i ++) {
                this.BetTableData.stackList[i] -= this.BetTableData.betTotalList[i]
                this.BetTableData.pot += this.BetTableData.betTotalList[i]
            }
        },
    }
}

</script>