<template>
  <BetTableComponentsMobileBetTable class="md:hidden"/>
  <BetTableComponentsLaptopBetTable class="hidden md:block"/>
</template>


<script>
import { state } from '../store/dataStore';
export default {
    setup() {
        return {
            state,
        }
    },
    data() {
        return {
            fold: null,
            check: null,
            call: null,
            raise: null,
            actionPos: null,
            playerAvatar: null,
        }
    },
    mounted() {
        this.playerAvatar = document.querySelectorAll('.playerAvatar')
        this.fold = document.querySelector('.fold')
        this.check = document.querySelector('.check')
        this.call = document.querySelector('.call')
        this.raise = document.querySelector('.raise')
    },
    methods: {
        inputCheck() {
            if (parseInt(event.target.value)) {
                event.target.value = parseInt(event.target.value)
            } else {
                event.target.value = ''
            }
            if (event.key === 'Enter') {
                this.state.playerAct = parseInt(event.target.value)
                this.state.numberOfAction ++
                this.disAbleButton()
            }
        },
        checkButtonClick() {
            this.state.playerAct = 'Check'
            this.state.numberOfAction ++
            this.disAbleButton()
        },
        foldButtonClick() {               
            this.state.playerAct = 'Fold'
            this.state.numberOfAction ++
            this.disAbleButton()
            this.playerAvatar[0].style.backgroundColor = 'gray'
        },
        callButtonClick() {
            this.state.playerAct = 'Call'
            this.state.numberOfAction ++
            this.disAbleButton()
        },
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