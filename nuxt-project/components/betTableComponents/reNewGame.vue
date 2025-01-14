<template>
    <StartGame v-if="newGame"/>
</template>


<script>
import { state } from '../../store/dataStore';
import { useMyBettbFunc } from '../../store/bettableFuncStore';
import StartGame from './startGame.vue';
export default {
    setup() {
        const { reSetData } = useMyBettbFunc()
        const { closestToTheLeft } = useMyBettbFunc()
        const { closestToTheRight } = useMyBettbFunc()
        const { disPlayCard } = useMyBettbFunc()
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
        this.playerAvatar = document.querySelectorAll('.avatar')
        this.playerCards = document.querySelectorAll('.playerCard')
        this.communityCards = document.querySelectorAll('.communityCards')
        this.reSetData()
        setTimeout(() => {
            this.newGame = true
            state.botTitle = ['You', 'Bot 1', 'Bot 2', 'Bot 3', 'Bot 4', 'Bot 5']
            for (let i = 0; i < 6; i ++) {
                if (state.stackList[i] <= 0) {
                    state.playerStatus[i] = false
                    state.botTitle[i] = 'Eliminated'
                }
            }
            state.numberOfPlayer = this.count()
            state.dealer = this.closestToTheLeft(state.dealer)
            state.smBlind = this.closestToTheLeft(state.dealer)
            state.blindPos = this.closestToTheLeft(state.smBlind)
            this.reNewGame()
        }, 10000);

        this.newGame = false
    },
    methods: {
        reNewGame() {
            this.communityCards.forEach(element => {
                element.innerHTML = ''
                element.style.backgroundColor = 'rgb(37, 99, 253)'
            });
            for (let i = 0; i < 6; i ++) {
                if (state.playerStatus[i]) {
                    this.playerCards[i * 2].style.display = 'block'
                    this.playerCards[i * 2].innerHTML = ''
                    this.playerCards[i * 2].style.backgroundColor = 'rgb(37, 99, 235)'
                    this.playerCards[i * 2 + 1].style.display = 'block'
                    this.playerCards[i * 2 + 1].innerHTML = ''
                    this.playerCards[i * 2 + 1].style.backgroundColor = 'rgb(37, 99, 235)'
                    this.playerAvatar[i].style.backgroundColor = 'white'
                } else {
                    this.playerAvatar[i].style.borderColor = 'gray' 
                    this.playerCards[i * 2].style.display = 'none'
                    this.playerCards[i * 2 + 1].style.display = 'none'
                }
            }
        },
        count() {
            let c = 0
            for (let i = 0; i < 6; i ++) {
                if (state.playerStatus[i]) {
                    c ++
                }
            } 
            return c
        },
    },
    components: {
        StartGame
    }
}
</script>