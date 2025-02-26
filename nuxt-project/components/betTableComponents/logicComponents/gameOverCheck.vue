<template>
    <ReNewGame v-if="betTableState.isGameOver"/>
</template>


<script>
import { watch } from 'vue';
import { betTableState } from '~/store/data/betTableState';
import ReNewGame from './reNewGame.vue';
export default {
    setup() {
        return {
            betTableState,
        }
    },
    data() {
        return {
            fold: null,
            call: null,
            raise: null,
            check: null,
        }
    },
    mounted() {
        watch(() => [betTableState.numberOfAction, betTableState.round], (newValue, oldValue) => {
            if (!betTableState.haveAllinCase) {
                if ((betTableState.numberOfPlayer === 1) || (betTableState.round === 4)) {
                    betTableState.isGameOver = true
                    betTableState.buttonDisplay = false
                }
            }
        }, { deep: true });
    },
    methods: {
    },
    components: {
        ReNewGame
    }
}
</script>