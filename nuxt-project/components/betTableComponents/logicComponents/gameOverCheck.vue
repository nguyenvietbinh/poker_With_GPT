<template>
    <ReNewGame v-if="state.isGameOver"/>
</template>


<script>
import { watch } from 'vue';
import { state } from '~/store/data/dataStore';
import ReNewGame from './reNewGame.vue';
export default {
    setup() {
        return {
            state,
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
        watch(() => [state.numberOfAction, state.round], (newValue, oldValue) => {
            if (!state.haveAllinCase) {
                if ((state.numberOfPlayer === 1) || (state.round === 4)) {
                    state.isGameOver = true
                    state.buttonDisplay = false
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