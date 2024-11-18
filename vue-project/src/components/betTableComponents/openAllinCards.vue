<template>

</template>


<script>
import { watch } from 'vue';
import { state } from '@/store/dataStore';
import { useMyFunction } from '../../store/functionStore';


export default {
    setup() {
        const { disPlayCard } = useMyFunction() 
        return {
            disPlayCard,
            state
        }
    },
    data() {
        return {
            playerCards: null,
            communityCards: null
        }
    },
    mounted() {
        this.playerCards = document.querySelectorAll('.playerCard')
        watch(() => state.stopBetting, (newval, oldval) => {
            if (state.stopBetting) {
                this.openPlayerCards()
            }
        })
    },
    methods: {
        openPlayerCards() {
            for (let i = 0; i < 6; i ++) {
                if ((state.playerStatus[i]) || (state.allin[i])) {
                    this.disPlayCard(state.cards[i * 2], this.playerCards[i * 2])
                    this.disPlayCard(state.cards[i * 2 + 1], this.playerCards[i * 2 + 1])
                }
            }
        }
    }
}
</script>