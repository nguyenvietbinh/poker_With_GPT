<template>
</template>


<script>
import { betTableState } from '~/store/data/betTableState';
import { useMyBettbFunc } from '~/store/functions/bettableFuncStore';
import { style } from '~/store/data/taildwindStyle';
export default {
    setup() {
        const { mixCards } = useMyBettbFunc()
        const { closestToTheLeft } = useMyBettbFunc()
        const { closestToTheRight } = useMyBettbFunc()
        const { disPlayCard } = useMyBettbFunc()
        const { splitPlayerCard } = useMyBettbFunc()
        const { takeBackCard } = useMyBettbFunc()
        return {
            betTableState,
            mixCards,
            closestToTheLeft,
            closestToTheRight,
            disPlayCard,
            style,
            splitPlayerCard,
            takeBackCard
        }
    },
    data() {
        return {
            dealerDots: null,
            smblindDots: null,
            bigblinhDots: null
        }
    },
    mounted() {
        this.dealerDots = document.querySelectorAll('.dealer')
        this.smblindDots = document.querySelectorAll('.smallBlind')
        this.bigblinhDots = document.querySelectorAll('.bigBlind')
        setTimeout(() => {
            this.takeBackCard()
            setTimeout(() => {
                this.splitPlayerCard(betTableState.playerCardsElement, style.playerCardsPos, style.playerCardsRotage)
                betTableState.communityCardsImg.forEach(element => {
                    element.src = '/img/cards/back.png'
                });
                betTableState.playerCardsImg.forEach(element => {
                    element.src = '/img/cards/back.png'
                });
                setTimeout(() => {
                    for (let i = 0; i < 6; i ++) {
                        if (betTableState.playerStatus[i]) {
                            betTableState.playerCardsElement[i * 2].style.display = 'block'
                            betTableState.playerCardsElement[i * 2 + 1].style.display = 'block'
                        } else {
                            betTableState.playerCardsElement[i * 2].style.display = 'none'
                            betTableState.playerCardsElement[i * 2 + 1].style.display = 'none'
                        }
                    }
                }, 500)
            }, 800)
        }, 100)
        watch(() => betTableState.splitCards, (newval, oldval) => {
            if (!betTableState.splitCards) {
                if (betTableState.blindPos === null) {
                    betTableState.blindPos = Math.floor(Math.random() * 6)
                    betTableState.smBlind = this.closestToTheRight(betTableState.blindPos)
                    betTableState.dealer = this.closestToTheRight(betTableState.smBlind)
                }
                betTableState.pause = false
                this.displayPos()
                betTableState.cards = this.mixCards()
                this.disPlayCard(betTableState.cards[0], betTableState.playerCardsImg[0])
                this.disPlayCard(betTableState.cards[1], betTableState.playerCardsImg[1])
                this.countBlind(betTableState.blindPos)
                this.calculateStackList()
                betTableState.actionPos = this.closestToTheLeft(betTableState.blindPos)
                betTableState.isGameOver = false
            } 
        })

    },
    methods: {
        displayPos() {
            for (let i = 0; i < 6; i ++) {
                this.dealerDots[i].style.display = 'none'
                this.smblindDots[i].style.display = 'none'
                this.bigblinhDots[i].style.display = 'none'
            }
            this.dealerDots[betTableState.dealer].style.display = 'block'
            this.smblindDots[betTableState.smBlind].style.display = 'block'
            this.bigblinhDots[betTableState.blindPos].style.display = 'block'
        },
        countBlind(bb) {
            betTableState.betTotalList[bb] = 10
            betTableState.betTotalList[this.closestToTheRight(bb)] = 5
        },
        calculateStackList() {
            betTableState.pot = 0
            for (let i = 0; i < 6; i ++) {
                betTableState.stackList[i] -= betTableState.betTotalList[i]
                betTableState.pot += betTableState.betTotalList[i]
            }
        },
    }
}

</script>