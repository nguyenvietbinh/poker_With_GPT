<template>
    <div class="w-full h-[7.5vh] absolute bottom-[-7.5vh]">
        <button @click="foldCheckClick" v-if="betTableState.buttonDisplay" :class="`btn fold ${style.button} left-0`">Fold</button>
        <button @click="callClick" v-if="betTableState.buttonDisplay" :class="`btn callCheck ${style.button} absolute left-[35%]`"></button>
        <input @keyup="inputCheck" v-if="betTableState.buttonDisplay" min="0" type="number" placeholder="Raise" id="" class="h-full raise input bg-blue-500 hover:bg-blue-600 input-bordered w-[30%] mt-[1vw] md:mt-[0.5vh] absolute right-0 text-white rounded-md">
    </div>
</template>



<script>
import { betTableState } from '~/store/data/betTableState';
import { style } from '~/store/data/taildwindStyle';
export default {

    setup() {
        return {
            betTableState,
            style
        }
    },
    data() {
        return {
            avatar: null,
            callCheck: null
        }
    },
    mounted() {
        this.avatar = document.querySelectorAll('.avatar')
        watch(() => betTableState.buttonDisplay, (newval, oldval) => {
            if (newval) {
                setTimeout(() => {
                    this.callCheck = document.querySelector('.callCheck')
                    if (this.callCheck) {
                        if (betTableState.betTotalList[0] === Math.max(...betTableState.betTotalList)) {
                            this.callCheck.innerHTML = 'Check'
                        } else {
                            this.callCheck.innerHTML = 'Call'
                        }
                    }
                }, 10)
            }
        })
    },
    methods: {
        foldCheckClick() {
            betTableState.playerAct = 'Fold'
            betTableState.numberOfAction ++
            betTableState.buttonDisplay = false
        },
        callClick() {
            if (betTableState.betTotalList[0] === Math.max(...betTableState.betTotalList)) {
                betTableState.playerAct = 'Check'
                betTableState.numberOfAction ++
                betTableState.buttonDisplay = false
            } else {
                betTableState.playerAct = 'Call'
                betTableState.numberOfAction ++
                betTableState.buttonDisplay = false
            }
        },
        inputCheck() {
            if (parseInt(event.target.value)) {
                event.target.value = parseInt(event.target.value)
            } else {
                event.target.value = ''
            }
            if (event.key === 'Enter') {
                if (event.target.value === '') {
                    this.callClick()
                } else {
                    betTableState.playerAct = parseInt(event.target.value)
                }
                betTableState.numberOfAction ++
                betTableState.buttonDisplay = false
            }
        }
    }
}
</script>