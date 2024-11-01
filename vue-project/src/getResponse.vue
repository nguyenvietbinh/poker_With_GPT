<template>

</template>



<script>
import { watch } from 'vue';
import { state } from './dataStore';
import { useMyFunction } from './functionStore';
    export default {
        setup() {
            const { getChatGPTResponse } = useMyFunction()
            const { getPrompt } = useMyFunction()
            const { closestToTheLeft } = useMyFunction()
            return {
                state,
                getChatGPTResponse,
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
                if (state.actionPos !== null) {
                    if (state.actionPos !== 0) {
                        this.playerAvatar.forEach(element => {
                            element.style.backgroundColor = 'black'
                        });
                        this.playerAvatar[state.actionPos - 1].style.backgroundColor = 'white'
                        this.getResponse().then(response => {
                            state.playerAct = response
                            state.numberOfAction ++
                            console.log(response)
                        })
                    } else {
                        this.playerAvatar.forEach(element => {
                            element.style.backgroundColor = 'black'
                        });
                        this.enAbleButton()
                    }
                }
            })
            state.actionPos = this.closestToTheLeft(state.blindPos)
        },
        methods: {
            async getResponse() {
                return await this.getChatGPTResponse(this.getPrompt(state.actionPos))
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