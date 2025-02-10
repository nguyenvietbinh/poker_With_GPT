<template>
    <div class="w-full h-[7.5vh] absolute bottom-[-7.5vh]">
        <button @click="foldCheckClick" v-if="state.buttonDisplay" :class="`btn fold ${style.button} left-0`">Fold/Check</button>
        <button @click="callClick" v-if="state.buttonDisplay" :class="`btn call ${style.button} absolute left-[35%]`">Call</button>
        <input @keyup="inputCheck" v-if="state.buttonDisplay" min="0" type="number" placeholder="Raise" id="" class="h-full raise input bg-blue-500 hover:bg-blue-600 input-bordered w-[30%] mt-[1vw] md:mt-[0.5vh] absolute right-0 text-white rounded-md">
    </div>
</template>



<script>
import { state } from '~/store/data/dataStore';
import { style } from '~/store/data/taildwindStyle';
export default {

    setup() {
        return {
            state,
            style
        }
    },
    data() {
        return {
            avatar: null
        }
    },
    mounted() {
        this.avatar = document.querySelector('.avatar')
    },
    methods: {
        foldCheckClick() {
            if (state.betTotalList[0] === Math.max(...state.betTotalList)) {
                state.playerAct = 'Check'
                state.numberOfAction ++
                state.buttonDisplay = false
            } else {
                state.playerAct = 'Fold'
                state.numberOfAction ++
                state.buttonDisplay = false
                this.avatar[0].style.borderColor = 'gray'
            }
        },
        callClick() {
            if (state.betTotalList[0] === Math.max(...state.betTotalList)) {
                state.playerAct = 'Check'
                state.numberOfAction ++
                state.buttonDisplay = false
            } else {
                state.playerAct = 'Call'
                state.numberOfAction ++
                state.buttonDisplay = false
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
                    state.playerAct = parseInt(event.target.value)
                }
                state.numberOfAction ++
                state.buttonDisplay = false
            }
        }
    }
}
</script>