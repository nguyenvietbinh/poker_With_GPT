<template>
    <ReNewGame v-if="state.isGameOver"/>
</template>


<script>
import { watch } from 'vue';
import { state } from '../../store/dataStore';
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
            playerAvatar: null,
        }
    },
    mounted() {
        this.fold = document.querySelector('.fold')
        this.check = document.querySelector('.check')
        this.call = document.querySelector('.call')
        this.raise = document.querySelector('.raise')
        this.playerAvatar = document.querySelectorAll('.playerAvatar')
        watch(() => [state.numberOfAction, state.round], (newValue, oldValue) => {
            if (!state.haveAllinCase) {
                if ((state.numberOfPlayer === 1) || (state.round === 4)) {
                    state.isGameOver = true
                    this.disAbleButton()
                }
            }
        }, { deep: true });
    },
    methods: {
        disAbleButton() {
            this.playerAvatar[0].style.backgroundColor = 'white'
            this.check.style.display = 'none'
            this.fold.style.display = 'none'
            this.call.style.display = 'none'
            this.raise.style.display = 'none'
        }
    },
    components: {
        ReNewGame
    }
}
</script>