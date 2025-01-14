<template>

</template>



<script>
import { watch } from 'vue';
import { state } from '../../store/dataStore';
import { useMyBettbFunc } from '../../store/bettableFuncStore';
    export default {
        setup() {
            const { sendReq } = useMyBettbFunc()
            const { getPrompt } = useMyBettbFunc()
            const { closestToTheLeft } = useMyBettbFunc()
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
            this.playerAvatar = document.querySelectorAll('.avatar')
            this.fold = document.querySelector('.fold')
            this.check = document.querySelector('.check')
            this.call = document.querySelector('.call')
            this.raise = document.querySelector('.raise')
            watch(() => state.actionPos, (newval, oldval) => {
                if ((state.actionPos !== null) && (!state.stopBetting)) {
                    if (state.actionPos !== 0) {
                        this.playerAvatar[state.actionPos].style.borderColor = 'green'
                        this.getResponse().then(response => {
                            if (response === 'Fold') {
                                this.playerAvatar[state.actionPos].style.borderColor = 'gray'
                            } else {
                                this.playerAvatar[state.actionPos].style.borderColor = 'white'
                            }
                            state.playerAct = response
                            state.numberOfAction ++
                        })
                    } else {
                        this.playerAvatar[state.actionPos].style.borderColor = 'green'
                        state.buttonDisplay = true
                    }
                }
            })
            state.actionPos = this.closestToTheLeft(state.blindPos)
        },
        methods: {

            async getResponse() {
                return await this.sendReq(this.getPrompt(state.actionPos))
            },
        }
    }
</script>