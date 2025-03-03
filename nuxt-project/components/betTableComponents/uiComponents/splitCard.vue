<template>
        <div v-for="n in 5" :key="n" :class="`cards communityCards absolute`" :style="{ width: `${onePercentOfH * 8}px`, height: `${onePercentOfH * 12}px`}">
            <img class="img" src="~/public/img/cards/back.png" alt="card">
        </div>
        <div v-for="n in 6" :key="n">
            <div :class="`cards playerCards absolute`" :style="{ width: `${onePercentOfH * 8}px`, height: `${onePercentOfH * 12}px`}">
                <img class="img playerCard" src="~/public/img/cards/back.png" alt="card">
            </div>
            <div :class="`cards playerCards absolute`" :style="{ width: `${onePercentOfH * 8}px`, height: `${onePercentOfH * 12}px`}">
                <img class="img playerCard" src="~/public/img/cards/back.png" alt="card">
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
            onePercentOfH: 0,
            communityCardsXPos: [30, 38, 46, 54, 62, 70],
            communityCardsYPos: 40,
            playerCardsRotage: [0, 90, 90, 180, -90, -90],
            playerCardsPos: [[28, 86.5, 36, 86.5], [3.5, 51, 3.5, 59], [3.5, 1, 3.5, 9], [56, 1.5, 64, 1.5], [88.5, 37, 88.5, 29], [88.5, 87, 88.5, 79]],
        }
    },
    mounted() {
        this.table = document.querySelector('.table')
        this.cards = document.querySelectorAll('.cards')
        this.communityCards = document.querySelectorAll('.communityCards')
        this.playerCards = document.querySelectorAll('.playerCards')
        this.onePercentOfH = this.table.clientHeight/100
        this.cards.forEach(element => {
            element.style.left = `${46 * this.onePercentOfH}px`
            element.style.top = `${30 * this.onePercentOfH}px`
        });
        window.addEventListener('resize', () => {
            this.onePercentOfH = this.table.clientHeight/100
        });
        setTimeout(() => {
            this.splitPlayerCard(this.playerCards, this.playerCardsPos, this.onePercentOfH, this.playerCardsRotage)
        }, 100);

    },
    methods: {

    }
}
</script>