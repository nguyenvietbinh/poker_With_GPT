<template>

</template>



<script>
import { betTableState } from '~/store/data/betTableState';

export default {
    setup() {
        return {
            betTableState
        }
    },
    data() {
        return {
            avtBorder: null
        }
    },
    mounted() {
        this.avtBorder = document.querySelectorAll('.avatar')
        watch(() => betTableState.actionPos, (newval, oldval) => {
            if (betTableState.haveAllinCase) {
                if (betTableState.actionPos !== null) {
                    this.avtBorder.forEach((element, index) => {
                        element.style.borderColor = 'white'
                        if((!betTableState.playerStatus[index]) && (!betTableState.allin[index])) {
                            element.style.borderColor = 'gray'
                        }
                        this.avtBorder[betTableState.actionPos].style.borderColor = 'green'
                    });
                } else {
                    this.avtBorder.forEach((element, index) => {
                        element.style.borderColor = 'white'
                        if((!betTableState.playerStatus[index]) && (!betTableState.allin[index])) {
                            element.style.borderColor = 'gray'
                        }
                    });
                }
            } else {
                if (betTableState.actionPos !== null) {
                    this.avtBorder.forEach((element, index) => {
                        element.style.borderColor = 'white'
                        if(!betTableState.playerStatus[index]) {
                            element.style.borderColor = 'gray'
                        }
                    });
                    this.avtBorder[betTableState.actionPos].style.borderColor = 'green'
                } else {
                    this.avtBorder.forEach((element, index) => {
                        element.style.borderColor = 'white'
                        if(!betTableState.playerStatus[index]) {
                            element.style.borderColor = 'gray'
                        }
                    });
                }
            }
        })
    }
}


</script>