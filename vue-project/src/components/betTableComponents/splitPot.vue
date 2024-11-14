<template>
    <ClaculateHandLevel/>
</template>


<script>
import { watch } from 'vue';
import { state } from '../../store/dataStore';
import { useMyFunction } from '../../store/functionStore';
import ClaculateHandLevel from './claculateHandLevel.vue';


export default {
    setup() {
        const { disPlayCard } = useMyFunction() 
        return {
            state,
            disPlayCard
        }
    },
    data() {
        return {
            playerCards: null
        }
    },
    mounted() {
        this.playerCards = document.querySelectorAll('.playerCard')
        watch(() => state.isGameOver, (newval, oldval) => {
            if (state.isGameOver) {
                for (let i = 0; i < 6; i ++) {
                    if (state.playerStatus[i]) {
                        this.disPlayCard(state.cards[i * 2], this.playerCards[i * 2])
                        this.disPlayCard(state.cards[i * 2 + 1], this.playerCards[i * 2 + 1])
                    }
                }
                if (state.numberOfPlayer === 1) {
                    for (let i in state.playerStatus) {
                        if (state.playerStatus[i]) {
                            state.stackList[i] += state.pot
                        }
                    }
                } else {
                    for (let i = 0; i < 6; i ++) {
                        if (state.playerStatus[i]) {
                            
                            state.lstOfHand.push([state.cards[i * 2], state.cards[i * 2 + 1]].concat(state.communityCards))
                        }
                    }
                }
            }
        })
    },
    methods: {

    },
    components: {
        ClaculateHandLevel
    }
}
</script>