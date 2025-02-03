<template>
    <SplitAllinPot v-if="startSplitPot"/>
</template>


<script>
import { watch } from 'vue';
import { state } from '~/store/data/dataStore';
import { useMyBettbFunc } from '~/store/functions/bettableFuncStore';
import { useMyHandLvFunc } from '~/store/functions/handLvFuncStore';
import SplitAllinPot from './SplitAllinPot.vue';


export default {
    setup() {
        const { disPlayCard } = useMyBettbFunc() 
        const { getAllInWinRate } = useMyHandLvFunc() 
        return {
            disPlayCard,
            getAllInWinRate,
            state
        }
    },
    data() {
        return {
            playerCards: null,
            communityCards: null,
            allInCards: [],
            startSplitPot: false
        }
    },
    mounted() {
        this.communityCards = document.querySelectorAll('.communityCards')
        this.playerCards = document.querySelectorAll('.playerCard')
        if (state.numberOfAllinPlayer + state.numberOfPlayer > 1) {
            this.openCards()
            state.winRate = this.getAllInWinRate(this.allInCards, state.communityCards)
        } else {
            this.startSplitPot = true
        }   
        watch(() => state.round, (newval, oldval) => {
                if (state.round === 1) {
                    this.disPlayCard(state.cards[51], this.communityCards[0])
                    state.communityCards[0] = state.cards[51]
                    this.disPlayCard(state.cards[50], this.communityCards[1])
                    state.communityCards[1] = state.cards[50]
                    this.disPlayCard(state.cards[49], this.communityCards[2])
                    state.communityCards[2] = state.cards[49]
                    state.winRate = this.getAllInWinRate(this.allInCards, state.communityCards)
                } else if (state.round === 2) {
                    this.disPlayCard(state.cards[48], this.communityCards[3])
                    state.communityCards[3] = state.cards[48]
                    state.winRate = this.getAllInWinRate(this.allInCards, state.communityCards)
                } else if (state.round === 3) {
                    this.disPlayCard(state.cards[47], this.communityCards[4])
                    state.communityCards[4] = state.cards[47]
                    state.winRate = this.getAllInWinRate(this.allInCards, state.communityCards)
                } else if (state.round === 4) {
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
            if (state.round !== 4) {
                setTimeout(() => {
                    state.round ++
                    this.openComunityCards()
                }, 3000);
            } else {
                this.startSplitPot = true
            }
        },
        openPlayerCards() {
            for (let i = 0; i < 6; i ++) {
                if ((state.playerStatus[i]) || (state.allin[i])) {
                    this.allInCards.push([state.cards[i * 2], state.cards[i * 2 + 1]])
                    this.disPlayCard(state.cards[i * 2], this.playerCards[i * 2])
                    this.disPlayCard(state.cards[i * 2 + 1], this.playerCards[i * 2 + 1])
                }
            }
        }
    },
    components: {
        SplitAllinPot
    }
}
</script>