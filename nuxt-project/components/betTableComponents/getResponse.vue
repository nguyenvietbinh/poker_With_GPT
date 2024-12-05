<template>

</template>



<script>
import { watch } from 'vue';
import { state } from '../../store/dataStore';
import { useMyFunction } from '../../store/functionStore';
    export default {
        setup() {
            const { sendReq } = useMyFunction()
            const { getPrompt } = useMyFunction()
            const { closestToTheLeft } = useMyFunction()
            return {
                state,
                sendReq,
                getPrompt,
                closestToTheLeft,
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
            this.playerAvatar = document.querySelectorAll('.playerAvatar')
            this.fold = document.querySelector('.fold')
            this.check = document.querySelector('.check')
            this.call = document.querySelector('.call')
            this.raise = document.querySelector('.raise')
            watch(() => state.actionPos, (newval, oldval) => {
                if ((state.actionPos !== null) && (!state.stopBetting)) {
                    if (state.actionPos !== 0) {
                        this.playerAvatar[state.actionPos].style.backgroundColor = 'green'
                        this.getResponse().then(response => {
                            if (response === 'Fold') {
                                this.playerAvatar[state.actionPos].style.backgroundColor = 'gray'
                            } else {
                                this.playerAvatar[state.actionPos].style.backgroundColor = 'white'
                            }
                            state.playerAct = response
                            state.numberOfAction ++
                        })
                    } else {
                        this.playerAvatar[state.actionPos].style.backgroundColor = 'green'
                        this.enAbleButton()
                    }
                }
            })
            state.actionPos = this.closestToTheLeft(state.blindPos)
        },
        methods: {

            async getResponse() {
                return await this.sendReq(this.getPrompt(state.actionPos))
            },
            enAbleButton() {
                if (state.betTotalList[0] === Math.max(...state.betTotalList)) {
                    this.check.style.display = 'inline-block'
                    this.raise.style.display = 'block'
                } else {
                    this.fold.style.display = 'inline-block'
                    this.call.style.display = 'inline-block'
                    this.raise.style.display = 'block'
                }
            },
        }
    }
</script>