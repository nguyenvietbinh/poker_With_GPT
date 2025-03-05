<template>
        <div v-for="n in 5" :key="n" :class="`cards communityCards absolute`" :style="{ width: `${8}%`, height: `${12}%`}">
            <img class="img communityCardsImg" src="~/public/img/cards/back.png" alt="card">
        </div>
        <div v-for="n in 6" :key="n">
            <div :class="`cards playerCards absolute`" :style="{ width: `${8}%`, height: `${12}%`}">
                <img class="img playerCardsImg" src="~/public/img/cards/back.png" alt="card">
            </div>
            <div :class="`cards playerCards absolute`" :style="{ width: `${8}%`, height: `${12}%`}">
                <img class="img playerCardsImg" src="~/public/img/cards/back.png" alt="card">
            </div> 
        </div>

</template>



<script>

import { style } from '~/store/data/taildwindStyle';
import { betTableState } from '~/store/data/betTableState';
import { useMyBettbFunc } from '~/store/functions/bettableFuncStore';
export default {
    setup() {
        const { splitPlayerCard } = useMyBettbFunc()
        return {
            style,
            splitPlayerCard,
            betTableState
        }
    },
    data() {
        return {
            table: null,
            cards: null,
            communityCards: null,
            playerCards: null,
        }
    },
    mounted() {
        this.cards = document.querySelectorAll('.cards')
        betTableState.communityCardsELement = document.querySelectorAll('.communityCards')
        betTableState.playerCardsElement = document.querySelectorAll('.playerCards')
        betTableState.communityCardsImg = document.querySelectorAll('.communityCardsImg')
        betTableState.playerCardsImg = document.querySelectorAll('.playerCardsImg')
        this.cards.forEach(element => {
            element.style.left = `${46}%`
            element.style.top = `${30}%`
        });
    },
    methods: {

    }
}
</script>