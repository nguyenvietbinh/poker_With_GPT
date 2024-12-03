<template>
    <betTableComponentsSplitAllinPot v-if="startSplitPot"/>
</template>


<script>


export default {
    setup() {
        const { disPlayCard } = useMyFunction() 
        return {
            disPlayCard,
            state
        }
    },
    data() {
        return {
            playerCards: null,
            communityCards: null,
            startSplitPot: false
        }
    },
    mounted() {
        this.communityCards = document.querySelectorAll('.communityCards')
        this.playerCards = document.querySelectorAll('.playerCard')
        if (this.BetTableData.numberOfAllinPlayer + this.BetTableData.numberOfPlayer > 1) {
            
            this.openCards()
        } else {
            this.startSplitPot = true
        }   
        watch(() => this.BetTableData.round, (newval, oldval) => {
                if (this.BetTableData.round === 1) {
                    this.disPlayCard(this.BetTableData.cards[51], this.communityCards[0])
                    this.BetTableData.communityCards[0] = this.BetTableData.cards[51]
                    this.disPlayCard(this.BetTableData.cards[50], this.communityCards[1])
                    this.BetTableData.communityCards[1] = this.BetTableData.cards[50]
                    this.disPlayCard(this.BetTableData.cards[49], this.communityCards[2])
                    this.BetTableData.communityCards[2] = this.BetTableData.cards[49]
                } else if (this.BetTableData.round === 2) {
                    this.disPlayCard(this.BetTableData.cards[48], this.communityCards[3])
                    this.BetTableData.communityCards[3] = this.BetTableData.cards[48]
                } else if (this.BetTableData.round === 3) {
                    this.disPlayCard(this.BetTableData.cards[47], this.communityCards[4])
                    this.BetTableData.communityCards[4] = this.BetTableData.cards[47]
                } else if (this.BetTableData.round === 4) {
                    this.startSplitPot = true
                }
        })
    },
    methods: {
        openCards() {
            this.openPlayerCards()
            this.openComunityCards()
        },
        openComunityCards() {
            if (this.BetTableData.round !== 4) {
                setTimeout(() => {
                    this.BetTableData.round ++
                    this.openComunityCards()
                }, 2000);
            } else {
                this.startSplitPot = true
            }
        },
        openPlayerCards() {
            for (let i = 0; i < 6; i ++) {
                if ((this.BetTableData.playerStatus[i]) || (this.BetTableData.allin[i])) {
                    this.disPlayCard(this.BetTableData.cards[i * 2], this.playerCards[i * 2])
                    this.disPlayCard(this.BetTableData.cards[i * 2 + 1], this.playerCards[i * 2 + 1])
                }
            }
        }
    },
}
</script>