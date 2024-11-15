<template>
    <SplitAllinPot/>
</template>


<script>
import { state } from '@/store/dataStore';
import { watch } from 'vue';
import { useMyFunction } from '../../store/functionStore';
import SplitAllinPot from './SplitAllinPot.vue';


export default {
    setup() {
        const { closestToTheLeft } = useMyFunction()
        return {
            closestToTheLeft,
            state
        }
    },
    data() {
        return {

        }
    },
    mounted() {
        watch(() => state.actionPos, (newval, oldval) => {
            if (state.numberOfPlayer === 1) {
                state.actionPos = null
                for (let i = 0; i < 6; i ++) {
                    if (state.playerStatus[i]) {
                        state.actionPos = i
                        state.stopBetting = true
                    }
                }
            }
        })
    },
    methods: {

    },
    components: {
        SplitAllinPot
    }
}
</script>