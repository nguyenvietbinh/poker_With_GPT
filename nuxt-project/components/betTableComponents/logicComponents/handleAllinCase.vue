<template>
    <OpenAllinCards v-if="betTableState.stopBetting"/>
</template>


<script>
import { betTableState } from '~/store/data/betTableState';
import { watch } from 'vue';
import { useMyBettbFunc } from '~/store/functions/bettableFuncStore';
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
        watch(() => betTableState.numberOfAction, (newval, oldval) => {
            if ((betTableState.numberOfPlayer === 0) || (betTableState.round === 4)) {
                betTableState.stopBetting = true
            } else if (betTableState.numberOfPlayer === 1) {
                this.bigestAllin = this.getBigestAllin()
                for (let i = 0; i < 6; i ++) {
                    if (betTableState.playerStatus[i]) {
                        if (betTableState.betTotalList[i] >= this.bigestAllin) {
                            betTableState.stopBetting = true
                        }
                    }
                }
            }
        })
    },
    methods: {
        getBigestAllin() {
            let ans = 0
            for (let i in betTableState.allin) {
                if (betTableState.allin[i]) {
                    if (betTableState.betTotalList[i] > ans) {
                        ans = betTableState.betTotalList[i]
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