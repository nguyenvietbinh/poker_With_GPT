<template>


</template>



<script>
export default {
    setup() {
        const { addSidePot } = useMyFunction()
        return {
            state,
            addSidePot
        }
    },
    data() {
        return {

        }
    },
    mounted() {
        watch(() => this.BetTableData.pot, (newval, oldval) => {
            if (this.BetTableData.pot <= 0) {
                this.BetTableData.isGameOver = true
            }
        }) 
        watch(() => this.BetTableData.winner, (newval, oldval) => {
            if (this.BetTableData.winner.length >= 1) {
                for (let i = 0; i < this.BetTableData.winner.length; i ++) {
                    if (this.BetTableData.winner.length === 1) {
                        if ((this.BetTableData.sidePot[this.BetTableData.winner[i]] === 0)) {
                            this.BetTableData.stackList[this.BetTableData.winner[i]] += this.BetTableData.pot
                            this.BetTableData.pot = 0
                        } else {
                            let m
                            if (this.BetTableData.pot <= this.BetTableData.sidePot[this.BetTableData.winner[i]]) {
                                m = this.BetTableData.pot
                            } else {
                                m = this.BetTableData.sidePot[this.BetTableData.winner[i]]
                            }
                            this.BetTableData.stackList[this.BetTableData.winner[i]] += m
                            this.BetTableData.pot -= m
                            this.BetTableData.numberOfAllinPlayer -= 1
                            this.BetTableData.allin[this.BetTableData.winner[i]] = false
                            if (this.BetTableData.numberOfAllinPlayer + this.BetTableData.numberOfPlayer === 1) {
                                for (let i = 0; i < 6; i ++) {
                                    if (this.BetTableData.playerStatus[i] || this.BetTableData.allin[i]) {
                                        this.BetTableData.stackList[i] += this.BetTableData.pot
                                        this.BetTableData.pot = 0
                                    }
                                }
                            }
                            if (this.BetTableData.pot > 0) {
                                this.removeWinner(this.BetTableData.winner[i])
                            }
                        }
                    }
                }
            } else {
                console.log('this case is not done yet!')
                let sidePots = []
                for (let i = 0; i < this.BetTableData.winner.length; i ++) {
                    sidePots.push(this.BetTableData.sidePot[winner[i]])
                }
                for (let i = 0; i < sidePots.length; i ++) {
                    if (sidePots[i] !== 0) {
                        
                    }
                }
            }
        }, { deep: true })
        if (this.BetTableData.stopBetting) {
            if (this.BetTableData.numberOfAllinPlayer + this.BetTableData.numberOfPlayer === 1) {
                for (let i = 0 ;i < 6; i ++) {
                    if (this.BetTableData.allin[i]) {
                        this.BetTableData.stackList[i] += this.BetTableData.pot
                        this.BetTableData.pot = 0
                    }
                }
            } else {
                this.addSidePot()
                for (let i = 0; i < 6; i ++) {
                    if ((this.BetTableData.playerStatus[i]) || (this.BetTableData.allin[i])) {
                        this.BetTableData.lstOfHand.push([this.BetTableData.cards[i * 2], this.BetTableData.cards[i * 2 + 1]].concat(this.BetTableData.communityCards))
                    }
                }
            }
        }
    },
    methods: {
        removeWinner(winnerpos) {
            for (let i = 0; i < this.BetTableData.lstOfHand.length; i ++) {
                if (this.BetTableData.lstOfHand[i][0] === this.BetTableData.cards[winnerpos * 2]) {
                    this.BetTableData.lstOfHand.splice(i, 1)
                }
            }
        }
    }
}
</script>