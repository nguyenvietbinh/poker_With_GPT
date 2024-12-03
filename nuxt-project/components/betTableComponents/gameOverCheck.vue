<template>
    <betTableComponentsReNewGame v-if="this.BetTableData.isGameOver"/>
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
        this.fold = document.querySelector('.fold')
        this.check = document.querySelector('.check')
        this.call = document.querySelector('.call')
        this.raise = document.querySelector('.raise')
        this.playerAvatar = document.querySelectorAll('.playerAvatar')
        watch(() => [this.BetTableData.numberOfAction, this.BetTableData.round], (newValue, oldValue) => {
            if (!this.BetTableData.haveAllinCase) {
                if ((this.BetTableData.numberOfPlayer === 1) || (this.BetTableData.round === 4)) {
                    this.BetTableData.isGameOver = true
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
}
</script>