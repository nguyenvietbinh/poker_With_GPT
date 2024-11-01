<template>
    <ReNewGame v-if="state.isGameOver"/>
</template>


<script>
import { watch } from 'vue';
import { state } from './dataStore';
import ReNewGame from './reNewGame.vue';
export default {
    setup() {
        return {
            state,
        }
    },
    data() {
        return {

        }
    },
    mounted() {
        watch(() => [state.numberOfAction, state.round], (newValue, oldValue) => {
            if (state.numberOfPlayer === 1) {
                state.isGameOver = true
            } else if (state.round === 4) {
                state.isGameOver = true
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