<template>


</template>


<script>
import { watch } from 'vue';
import { audio } from '~/store/data/audioStore';
import { betTableState } from '~/store/data/betTableState';
export default {
    setup() {
        return {
            audio,
            betTableState
        }
    },
    mounted() {
        watch(() => [betTableState.playerAct, betTableState.numberOfAction], (newval, oldval) => {
            if (!betTableState.mute) {
                if (betTableState.playerAct === 'Check') {
                    this.playCheckAudio()
                } else if (betTableState.playerAct === 'Fold') {
                    audio.foldingSound.play()
                } else if (betTableState.playerAct === 'Call') {
                    this.playCallAudio()
                } else if (!isNaN(betTableState.playerAct)) {
                    audio.coinDrop.play()
                }
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