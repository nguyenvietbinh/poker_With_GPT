<template>
</template>


<script>
import { useMyBettbFunc } from '~/store/functions/bettableFuncStore'
import { betTableState } from '~/store/data/betTableState'
import { style } from '~/store/data/taildwindStyle'
export default {
    setup() {
        const { move } = useMyBettbFunc()
        const { reSetData } = useMyBettbFunc()
        return {
            move,
            betTableState,
            reSetData
        }
    },
    data() {
        return {
            stackContainer: null,
            stacks: null,
            playerAreaDirection: [0, 90, 90, 180, -90, -90],
            playerAreaYPosition: [75, 62.5, 12.5, 0, 12.5, 62.5],
            playerAreaXPosition: [25, -12.5, -12.5, 25, 62.5, 62.5],
       }
    },
    mounted() {
        watch(() => betTableState.stackList.map(item => item), (newval, oldval) => {
            for (let i = 0; i < 6; i ++) {
                if (newval[i] > oldval[i]) {
                    this.stacks = document.querySelectorAll('.stacks')
                    this.stackContainer = document.querySelectorAll('.stackContainer')
                    this.stacks.forEach((element, index) => {
                        this.moveStack(index, i)
                    });
                    setTimeout(() => {
                        this.reSetData()
                        for (let j = 0; j < 6; j ++) {
                            if (this.stackContainer[j]) {
                                this.move(this.stackContainer[j], this.playerAreaXPosition[j], this.playerAreaYPosition[j], 2000, this.playerAreaDirection[j])
                            }
                        }
                    }, 1900)
                }
            }
        }, { deep: true });
    },
    methods: {
        moveStack(obj, tar) {
            this.move(this.stackContainer[obj], this.playerAreaXPosition[tar], this.playerAreaYPosition[tar], 2000, this.playerAreaDirection[tar])
            this.move(this.stacks[obj], 75, 75, 2000, 0)
            this.stacks[obj].style.transform = 'translateX(-50%) translateY(-50%)';
        },

    }
}
</script>