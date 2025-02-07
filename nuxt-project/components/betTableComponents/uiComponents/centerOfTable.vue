<template>
    <div :class="`h-[50%] w-[50%] absolute top-[25%] left-[25%]`">
        <p @click="startCounting" class="text-black text-[3vw] md:text-[2.5vh] hover:underline cursor-pointer font-bold text-center whitespace-nowrap absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">Click here to play.</p>
        <div v-if="counting && !state.startGame" class="text-black text-[20vw] md:text-[20vh] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">{{ count }}</div>
        <div v-if="state.startGame" :class="`absolute bottom-[30%] left-[50%] ${style.chipDisplay}`">Pot: {{ state.pot }}</div>
        <div v-if="state.startGame" v-for="n in 5" :key="n" :class="`communityCards h-[5.5vw] md:h-[5.5vh] w-[4vw] md:w-[4vh] ${style.card} bottom-[46%] ${style.commmunityCardXPosition[n-1]}`"></div>
    </div>
</template>


<script>
import { style } from '~/store/data/taildwindStyle';
import { state } from '~/store/data/dataStore';
export default {
    setup() {
        return {
            style,
            state
        }
    },
    data() {
        return {
            count: 4,
            counting: false,
            bla: ['left-[20%]', 'left-[32%]', 'left-[44%]', 'left-[56%]', 'left-[68%]'],
        }
    },
    mounted() {
        watch(() => this.count, (newval, oldval) => {
            if (this.count !== 0) {
                setTimeout(() => {
                    this.count -= 1
                }, 1000);
            } else {
                state.startGame = true
            }
        })
    },
    methods: {
        startCounting() {
            this.counting = true
            this.count -= 1
            event.target.style.display = 'none'
        },

    }
}
</script>