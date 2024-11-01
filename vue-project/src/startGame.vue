<template>

</template>


<script>
import { state } from './dataStore';
import { useMyFunction } from './functionStore';

export default {
    setup() {
        const { mixCards } = useMyFunction()
        const { closestToTheLeft } = useMyFunction()
        const { closestToTheRight } = useMyFunction()
        const { disPlayCard } = useMyFunction()
        return {
            state,
            mixCards,
            closestToTheLeft,
            closestToTheRight,
            disPlayCard
        }
    },
    data() {
        return {
            playerCards: null
        }
    },
    mounted() {
        this.playerCards = document.querySelectorAll('.playerCard')
        if (state.blindPos === null) {
            state.blindPos = Math.floor(Math.random() * 6)
            state.smBlind = this.closestToTheRight(state.blindPos)
            state.dealer = this.closestToTheRight(state.smBlind)
        }
        state.cards = this.mixCards()
        this.disPlayCard(state.cards[0], this.playerCards[0])
        this.disPlayCard(state.cards[1], this.playerCards[1])
        this.countBlind(state.blindPos)
        this.calculateStackList()
        state.actionPos = this.closestToTheLeft(state.blindPos)
        state.isGameOver = false
    },
    methods: {
        countBlind(bb) {
            state.betTotalList[bb] = 10
            state.betTotalList[this.closestToTheRight(bb)] = 5
        },
        calculateStackList() {
            state.pot = 0
            for (let i = 0; i < 6; i ++) {
                state.stackList[i] -= state.betTotalList[i]
                state.pot += state.betTotalList[i]
            }
        },
    }
}

</script>