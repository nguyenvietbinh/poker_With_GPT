<template>

</template>



<script>

    export default {
        setup() {
            const BetTableFunctions = betTableFunctions()
            const BetTableData = betTableData()
            return {
                BetTableData,
                BetTableFunctions
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
            watch(() => this.BetTableData.actionPos, (newval, oldval) => {
                if ((this.BetTableData.actionPos !== null) && (!this.BetTableData.stopBetting)) {
                    if (this.BetTableData.actionPos !== 0) {
                        this.playerAvatar[this.BetTableData.actionPos].style.backgroundColor = 'green'
                        this.getResponse().then(response => {
                            if (response === 'Fold') {
                                this.playerAvatar[this.BetTableData.actionPos].style.backgroundColor = 'gray'
                            } else {
                                this.playerAvatar[this.BetTableData.actionPos].style.backgroundColor = 'white'
                            }
                            this.BetTableData.playerAct = response
                            this.BetTableData.numberOfAction ++
                        })
                    } else {
                        this.playerAvatar[this.BetTableData.actionPos].style.backgroundColor = 'green'
                        this.enAbleButton()
                    }
                }
            })
            this.BetTableData.actionPos = this.BetTableFunctions.closestToTheLeft(this.BetTableData.blindPos)
        },
        methods: {
            async getResponse() {
                return await this.BetTableFunctions.getChatGPTResponse(this.BetTableFunctions.getPrompt(this.BetTableData.actionPos))
            },
            enAbleButton() {
                if (this.BetTableData.betTotalList[0] === Math.max(...this.BetTableData.betTotalList)) {
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