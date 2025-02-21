<template>
    <div class="w-[98vw] md:w-[99vw] h-[20vw] md:h-[10vh] bg-neutral rounded-lg mt-[1vw] md:mt-[0.5vh] left-[50%] translate-x-[-50%] absolute">
        <NuxtLink @click="reSetAllData" to="/">
            <img src="/img/logo.png" alt="" class="logo h-[60%] cursor-pointer w-auto absolute left-[5vw] md:left-[2.5vh] top-[50%] translate-y-[-50%]">
        </NuxtLink>
        <img @click="toggleMute" v-if="!state.mute" src="/img/unmute.png" alt="" class="h-[10vw] md:h-[5vh] w-[10vw] md:w-[5vh] cursor-pointer absolute right-[5vw] md:right-[2.5vh] top-[50%] translate-y-[-50%]">
        <img @click="toggleMute" v-if="state.mute" src="/img/mute.png" alt="" class="h-[10vw] md:h-[5vh] w-[10vw] md:w-[5vh] cursor-pointer absolute right-[5vw] md:right-[2.5vh] top-[50%] translate-y-[-50%]">
    </div>
</template>


<script>
import { useMyBettbFunc } from '~/store/functions/bettableFuncStore';
import { state } from '~/store/data/dataStore';
export default {
    setup() {
        const { reSetAllData } = useMyBettbFunc()
        return {
            reSetAllData,
            state
        }
    },
    methods: {
        toggleMute() {
            state.mute = !state.mute
        }
    }
}
</script>