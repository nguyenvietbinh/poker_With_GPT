<template>
<div @click="moveStack" class="absolute top-[82.5%] left-[62.5%] bg-black h-[5%] w-[5%] -rotate-90">bla</div>
</template>


<script>
import { useMyBettbFunc } from '~/store/functions/bettableFuncStore'
import { betTableState } from '~/store/data/betTableState'
import { style } from '~/store/data/taildwindStyle'
export default {
    setup() {
        const { move } = useMyBettbFunc()
        return {
            move,
            betTableState,
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
        this.stackContainer = document.querySelectorAll('.stackContainer')
        this.stacks = document.querySelectorAll('.stacks')

    },
    methods: {
        moveStack() {
            this.move(this.stackContainer[0], 0, 0, 5000, 0)
        }
    }
}
</script>