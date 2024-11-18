<template>


</template>



<script>
import { state } from '@/store/dataStore';
import { watch } from 'vue';


export default {
    setup() {
        return {
            state
        }
    },
    data() {
        return {

        }
    },
    mounted() {
        watch(() => state.stopBetting, (newval, oldval) => {
            if (state.stopBetting) {
                if (state.numberOfAllinPlayer + state.numberOfPlayer === 1) {
                    for (let i = 0 ;i < 6; i ++) {
                        if (state.allin[i]) {
                        }
                    }
                }
            }
        })
    },
    methods: {

    }
}
</script>