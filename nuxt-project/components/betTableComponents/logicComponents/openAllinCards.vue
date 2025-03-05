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
        const { splitFlop } = useMyBettbFunc() 
        const { splitCommunityCards } = useMyBettbFunc() 
        const { getAllInWinRate } = useMyHandLvFunc() 
        return {
            disPlayCard,
            getAllInWinRate,
            splitCommunityCards,
            splitFlop,
            betTableState
        }
    },
    data() {
        return {
            allInCards: [],
            startSplitPot: false
        }
    },
    mounted() {
        if (betTableState.numberOfAllinPlayer + betTableState.numberOfPlayer > 1) {
            this.openCards()
        } else {
            this.startSplitPot = true
        }   
        watch(() => betTableState.round, (newval, oldval) => {
                if (betTableState.round === 1) {
                    this.splitFlop()
                } else if (betTableState.round === 2) {
                    this.splitCommunityCards()
                } else if (betTableState.round === 3) {
                    this.splitCommunityCards()
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
                    this.disPlayCard(betTableState.cards[i * 2], betTableState.playerCardsImg[i * 2])
                    this.disPlayCard(betTableState.cards[i * 2 + 1], betTableState.playerCardsImg[i * 2 + 1])
                }
            }
        }
    },
    components: {
        SplitAllinPot
    }
}
</script>