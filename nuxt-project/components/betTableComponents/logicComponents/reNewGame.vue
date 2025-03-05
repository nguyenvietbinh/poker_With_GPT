<template>
    <StartGame v-if="newGame"/>
</template>


<script>
import { betTableState } from '~/store/data/betTableState';
import { useMyBettbFunc } from '~/store/functions/bettableFuncStore';
import StartGame from './startGame.vue';
export default {
    setup() {
        const { reSetData } = useMyBettbFunc()
        const { closestToTheLeft } = useMyBettbFunc()
        const { closestToTheRight } = useMyBettbFunc()
        const { disPlayCard } = useMyBettbFunc()
        return {
            betTableState,
            reSetData,
            closestToTheRight,
            closestToTheLeft,
            disPlayCard
        }
    },
    data() {
        return {
            newGame: false,
            playerAvatar: null,
        }
    },
    mounted() {
        this.playerAvatar = document.querySelectorAll('.avatar')
        this.reSetData()
        setTimeout(() => {
            this.newGame = true
            betTableState.botTitle = ['You', 'Bot 1', 'Bot 2', 'Bot 3', 'Bot 4', 'Bot 5']
            for (let i = 0; i < 6; i ++) {
                if (betTableState.stackList[i] <= 0) {
                    betTableState.playerStatus[i] = false
                    betTableState.botTitle[i] = 'Eliminated'
                }
            }
            betTableState.numberOfPlayer = this.count()
            betTableState.dealer = this.closestToTheLeft(betTableState.dealer)
            betTableState.smBlind = this.closestToTheLeft(betTableState.dealer)
            betTableState.blindPos = this.closestToTheLeft(betTableState.smBlind)
            this.reNewGame()
        }, 10000);

        this.newGame = false
    },
    methods: {
        reNewGame() {
            betTableState.communityCardsImg.forEach(element => {
                element.src = '/img/cards/back.png'
            });
            betTableState.playerCardsImg.forEach(element => {
                element.src = '/img/cards/back.png'
            });
            for (let i = 0; i < 6; i ++) {
                if (betTableState.playerStatus[i]) {
                    betTableState.playerCardsElement[i * 2].style.display = 'block'
                    betTableState.playerCardsElement[i * 2 + 1].style.display = 'block'
                    this.playerAvatar[i].style.backgroundColor = 'white'
                } else {
                    betTableState.playerCardsElement[i * 2].style.display = 'none'
                    betTableState.playerCardsElement[i * 2 + 1].style.display = 'none'
                }
            }
        },
        count() {
            let c = 0
            for (let i = 0; i < 6; i ++) {
                if (betTableState.playerStatus[i]) {
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