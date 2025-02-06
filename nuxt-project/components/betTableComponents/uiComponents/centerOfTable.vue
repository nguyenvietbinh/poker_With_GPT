<template>
    <div :class="`h-[50%] w-[50%] absolute top-[25%] left-[25%]`">
        <p class="text-black text-[3vw] md:text-[2.5vh] hover:underline cursor-pointer font-bold text-center whitespace-nowrap absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">Click here to play.</p>
        <div v-if="counted" class="text-black text-[20vw] md:text-[20vh] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">{{ count }}</div>
        <div v-if="counted" :class="`absolute bottom-[30%] left-[50%] ${style.chipDisplay}`">Pot: {{ state.pot }}</div>
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
            count: 3,
            counting: false,
            counted: false,
        }
    },
    mounted() {

    }
}
</script>