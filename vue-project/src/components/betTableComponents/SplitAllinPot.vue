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
                console.log(JSON.stringify(state.betTotalList))
            }
        })
    },
    methods: {

    }
}
</script>