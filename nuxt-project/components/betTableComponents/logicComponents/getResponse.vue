<template>

</template>



<script>
import { watch } from 'vue';
import { betTableState } from '~/store/data/betTableState';
import { useMyBettbFunc } from '~/store/functions/bettableFuncStore';
    export default {
        setup() {
            const { sendReq } = useMyBettbFunc()
            const { getPrompt } = useMyBettbFunc()
            const { closestToTheLeft } = useMyBettbFunc()
            return {
                betTableState,
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
            watch(() => betTableState.actionPos, (newval, oldval) => {
                if ((betTableState.actionPos !== null) && (!betTableState.stopBetting)) {
                    if (betTableState.actionPos !== 0) {
                        this.getResponse().then(response => {
                            betTableState.playerAct = response
                            betTableState.numberOfAction ++
                        })
                    } else {
                        betTableState.buttonDisplay = true
                    }
                }
            })
            betTableState.actionPos = this.closestToTheLeft(betTableState.blindPos)
        },
        methods: {

            async getResponse() {
                return await this.sendReq(this.getPrompt(betTableState.actionPos))
            },
        }
    }
</script>