<template>
    <StartGame v-if="newGame"/>
</template>


<script>
import { state } from '../../store/dataStore';
import { useMyFunction } from '../../store/functionStore';
import StartGame from './startGame.vue';
export default {
    setup() {
        const { reSetData } = useMyFunction()
        const { closestToTheLeft } = useMyFunction()
        const { disPlayCard } = useMyFunction()
        return {
            state,
            reSetData,
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
            this.reNewGame2()
            this.newGame = true
            for (let i = 0; i < 6; i ++) {
                if (state.stackList[i] <= 0) {
                    state.playerStatus[i] = false
                }
            }
            console.log(state.playerStatus)
        }, 5000);

        this.newGame = false
    },
    methods: {
        reNewGame2() {
            this.communityCards.forEach(element => {
                element.innerHTML = ''
                element.style.backgroundColor = 'rgb(220, 38, 38)'
            });
            for (let i = 0; i < 6; i ++) {
                if (state.playerStatus[i]) {
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
        reNewGame() {
            this.playerCards.forEach(element => {
                element.style.display = 'block'
            });
            this.playerAvatar.forEach(element => {
                element.style.backgroundColor = 'white'
            });
            this.communityCards.forEach(element => {
                element.innerHTML = ''
                element.style.backgroundColor = 'rgb(220, 38, 38)'
            });
            this.playerCards.forEach((element, index) => {
                element.innerHTML = ''
                element.style.backgroundColor = 'rgb(220, 38, 38)'
            });
        },
    },
    components: {
        StartGame
    }
}
</script>