<template>
    <StartGame v-if="newGame"/>
</template>


<script>
import { state } from '../store/dataStore';
import { useMyFunction } from '../store/functionStore';
import StartGame from './startGame.vue';
export default {
    setup() {
        const { reSetData } = useMyFunction()
        const { closestToTheLeft } = useMyFunction()
        return {
            state,
            reSetData,
            closestToTheLeft,
        }
    },
    data() {
        return {
            playerCards: null,
            newGame: false,
            communityCards: null,
        }
    },
    mounted() {
        this.playerCards = document.querySelectorAll('.playerCard')
        this.communityCards = document.querySelectorAll('.communityCards')
        this.reSetData()
        let delayTime = state.numberOfPlayer * 5000
        setTimeout(() => {
            this.reNewGame()
            this.newGame = true
            this.communityCards.forEach(element => {
                element.innerHTML = ''
                element.style.backgroundColor = 'rgb(220, 38, 38)'
            });
            this.playerCards.forEach((element, index) => {
                element.innerHTML = ''
                element.style.backgroundColor = 'rgb(220, 38, 38)'
            });

        }, delayTime);

        this.newGame = false
    },
    methods: {
        reNewGame() {
            this.playerCards.forEach(element => {
                element.style.display = 'block'
            });
        },
        displayCard(cardNumber, card) {
            let cardColor
            if (cardNumber[cardNumber.length - 1] === '♥') {
                cardColor = 'red'
            } else if (cardNumber[cardNumber.length - 1]=== '♦') {
                cardColor = 'orange'
            } else if (cardNumber[cardNumber.length - 1] === '♣') {
                cardColor = 'green'
            } else {
                cardColor = 'black'
            }
            card.innerHTML = cardNumber.slice(0, -1)
            card.style.backgroundColor = cardColor
            card.style.color = 'white'
        },
    },
    components: {
        StartGame
    }
}
</script>