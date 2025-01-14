<template>
    <OpenAllinCards v-if="state.stopBetting"/>
</template>


<script>
import { state } from '@/store/dataStore';
import { watch } from 'vue';
import { useMyBettbFunc } from '../../store/bettableFuncStore';
import SplitAllinPot from './SplitAllinPot.vue';
import OpenAllinCards from './openAllinCards.vue';


export default {
    setup() {
        const { closestToTheLeft } = useMyBettbFunc()
        return {
            closestToTheLeft,
            state
        }
    },
    data() {
        return {
            bigestAllin: 0
        }
    },
    mounted() {
        watch(() => state.numberOfAction, (newval, oldval) => {
            if ((state.numberOfPlayer === 0) || (state.round === 4)) {
                state.stopBetting = true
            } else if (state.numberOfPlayer === 1) {
                this.bigestAllin = this.getBigestAllin()
                for (let i = 0; i < 6; i ++) {
                    if (state.playerStatus[i]) {
                        if (state.betTotalList[i] >= this.bigestAllin) {
                            state.stopBetting = true
                        }
                    }
                }
            }
        })
    },
    methods: {
        getBigestAllin() {
            let ans = 0
            for (let i in state.allin) {
                if (state.allin[i]) {
                    if (state.betTotalList[i] > ans) {
                        ans = state.betTotalList[i]
                    }
                }
            }
            return ans
        }
    },
    components: {
        SplitAllinPot,
        OpenAllinCards
    }
}
</script>