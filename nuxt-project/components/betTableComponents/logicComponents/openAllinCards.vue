<template>
    <SplitAllinPot v-if="startSplitPot"/>
</template>


<script>
import { watch } from 'vue';
import { betTableState } from '~/store/data/betTableState';
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
            betTableState
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
        if (betTableState.numberOfAllinPlayer + betTableState.numberOfPlayer > 1) {
            this.openCards()
        } else {
            this.startSplitPot = true
        }   
        watch(() => betTableState.round, (newval, oldval) => {
                if (betTableState.round === 1) {
                    this.disPlayCard(betTableState.cards[51], this.communityCards[0])
                    betTableState.communityCards[0] = betTableState.cards[51]
                    this.disPlayCard(betTableState.cards[50], this.communityCards[1])
                    betTableState.communityCards[1] = betTableState.cards[50]
                    this.disPlayCard(betTableState.cards[49], this.communityCards[2])
                    betTableState.communityCards[2] = betTableState.cards[49]
                } else if (betTableState.round === 2) {
                    this.disPlayCard(betTableState.cards[48], this.communityCards[3])
                    betTableState.communityCards[3] = betTableState.cards[48]
                } else if (betTableState.round === 3) {
                    this.disPlayCard(betTableState.cards[47], this.communityCards[4])
                    betTableState.communityCards[4] = betTableState.cards[47]
                } else if (betTableState.round === 4) {
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
            if (betTableState.round !== 4) {
                setTimeout(() => {
                    betTableState.round ++
                    this.openComunityCards()
                }, 3000);
            } else {
                this.startSplitPot = true
            }
        },
        openPlayerCards() {
            for (let i = 0; i < 6; i ++) {
                if ((betTableState.playerStatus[i]) || (betTableState.allin[i])) {
                    this.allInCards.push([betTableState.cards[i * 2], betTableState.cards[i * 2 + 1]])
                    this.disPlayCard(betTableState.cards[i * 2], this.playerCards[i * 2])
                    this.disPlayCard(betTableState.cards[i * 2 + 1], this.playerCards[i * 2 + 1])
                }
            }
        }
    },
    components: {
        SplitAllinPot
    }
}
</script>