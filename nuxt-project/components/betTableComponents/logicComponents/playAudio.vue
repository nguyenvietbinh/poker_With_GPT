<template>


</template>


<script>
import { watch } from 'vue';
import { audio } from '~/store/data/audioStore';
import { state } from '~/store/data/dataStore';
export default {
    setup() {
        return {
            audio,
            state
        }
    },
    mounted() {
        watch(() => [state.playerAct, state.numberOfAction], (newval, oldval) => {
            if (state.playerAct === 'Check') {
                this.playCheckAudio()
            } else if (state.playerAct === 'Fold') {
                audio.foldingSound.play()
            } else if (state.playerAct === 'Call') {
                this.playCallAudio()
            } else if (!isNaN(state.playerAct)) {
                audio.coinDrop.play()
            }
        }, { deep: true })
    },
    methods: {
        playCheckAudio() {
            let a = Math.floor(Math.random() * 3)
            if (a === 0) {
                audio.check1.play()
            } else if (a === 1) {
                audio.check2.play()
            } else {
                audio.check3.play()
            } 
        },
        playCallAudio() {
            let a = Math.floor(Math.random() * 3)
            if (a === 0) {
            audio.call1.play()
            } else if (a === 1) {
                audio.call2.play()
            } else {
                audio.call3.play()
            }
        }
    }
}

</script>