<template>
    <betTableComponentsStartGame v-if="newGame"/>
</template>


<script>
export default {
    setup() {
        const { reSetData } = useMyFunction()
        const { closestToTheLeft } = useMyFunction()
        const { closestToTheRight } = useMyFunction()
        const { disPlayCard } = useMyFunction()
        return {
            state,
            reSetData,
            closestToTheRight,
            closestToTheLeft,
            disPlayCard
        }
    },
    data() {
        return {
            playerCards: null,
            newGame: false,
            communityCards: null,
            playerAvatar: null,
        }
    },
    mounted() {
        this.playerAvatar = document.querySelectorAll('.playerAvatar')
        this.playerCards = document.querySelectorAll('.playerCard')
        this.communityCards = document.querySelectorAll('.communityCards')
        this.reSetData()
        setTimeout(() => {
            this.newGame = true
            for (let i = 0; i < 6; i ++) {
                if (this.BetTableData.stackList[i] <= 0) {
                    this.BetTableData.playerStatus[i] = false
                }
            }
            this.BetTableData.dealer = this.closestToTheLeft(this.BetTableData.dealer)
            this.BetTableData.smBlind = this.closestToTheLeft(this.BetTableData.dealer)
            this.BetTableData.blindPos = this.closestToTheLeft(this.BetTableData.smBlind)
            this.reNewGame()
            this.matchGameData()
        }, 5000);

        this.newGame = false
    },
    methods: {
        reNewGame() {
            this.communityCards.forEach(element => {
                element.innerHTML = ''
                element.style.backgroundColor = 'rgb(220, 38, 38)'
            });
            for (let i = 0; i < 6; i ++) {
                if (this.BetTableData.playerStatus[i]) {
                    this.playerCards[i * 2].style.display = 'block'
                    this.playerCards[i * 2].innerHTML = ''
                    this.playerCards[i * 2].style.backgroundColor = 'rgb(220, 38, 38)'
                    this.playerCards[i * 2 + 1].style.display = 'block'
                    this.playerCards[i * 2 + 1].innerHTML = ''
                    this.playerCards[i * 2 + 1].style.backgroundColor = 'rgb(220, 38, 38)'
                    this.playerAvatar[i].style.backgroundColor = 'white'
                } else {
                    this.playerAvatar[i].style.backgroundColor = 'gray' 
                    this.playerCards[i * 2].style.display = 'none'
                    this.playerCards[i * 2 + 1].style.display = 'none'
                }
            }
        },
        matchGameData() {
            for (let i = 0; i < 6; i ++) {
                if (!this.BetTableData.playerStatus[i]) {
                    this.BetTableData.numberOfPlayer -= 1
                    if (this.BetTableData.blindPos === i) {
                        this.BetTableData.blindPos = closestToTheLeft(this.BetTableData.blindPos)
                        this.BetTableData.smBlind = closestToTheRight(this.BetTableData.blindPos)
                        this.BetTableData.dealer = closestToTheRight(this.BetTableData.smBlind)
                    }
                }
            }
        }
    },
}
</script>