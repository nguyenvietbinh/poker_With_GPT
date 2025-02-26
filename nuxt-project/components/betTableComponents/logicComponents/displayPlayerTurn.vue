<template>

</template>



<script>
import { state } from '~/store/data/betTableState';

export default {
    setup() {
        return {
            state
        }
    },
    data() {
        return {
            avtBorder: null
        }
    },
    mounted() {
        this.avtBorder = document.querySelectorAll('.avatar')
        watch(() => state.actionPos, (newval, oldval) => {
            if (state.haveAllinCase) {
                if (state.actionPos !== null) {
                    this.avtBorder.forEach((element, index) => {
                        element.style.borderColor = 'white'
                        if((!state.playerStatus[index]) && (!state.allin[index])) {
                            element.style.borderColor = 'gray'
                        }
                        this.avtBorder[state.actionPos].style.borderColor = 'green'
                    });
                } else {
                    this.avtBorder.forEach((element, index) => {
                        element.style.borderColor = 'white'
                        if((!state.playerStatus[index]) && (!state.allin[index])) {
                            element.style.borderColor = 'gray'
                        }
                    });
                }
            } else {
                if (state.actionPos !== null) {
                    this.avtBorder.forEach((element, index) => {
                        element.style.borderColor = 'white'
                        if(!state.playerStatus[index]) {
                            element.style.borderColor = 'gray'
                        }
                    });
                    this.avtBorder[state.actionPos].style.borderColor = 'green'
                } else {
                    this.avtBorder.forEach((element, index) => {
                        element.style.borderColor = 'white'
                        if(!state.playerStatus[index]) {
                            element.style.borderColor = 'gray'
                        }
                    });
                }
            }
        })
    }
}


</script>