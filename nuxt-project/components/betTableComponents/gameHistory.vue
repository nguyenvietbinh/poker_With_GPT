<template>
    <div class="h-full w-[25%] bg-[#6d9cff] absolute right-0 top-0 border-solid border-[3px] border-[#072a53]">
        <div class="header h-[70px] w-full bg-[#2563EB] absolute">
            <p class="absolute text-center right-0 py-1">Number Of Game: {{ state.numberOfGame }}</p>
            <div class="h-[25px] w-[10%] text-center absolute bottom-0 left-0">Stt</div>
            <div class="h-[25px] w-[30%] text-center absolute bottom-0 left-[10%]">Player</div>
            <div class="h-[25px] w-[30%] text-center absolute bottom-0 left-[40%]">Round</div>
            <div class="h-[25px] w-[30%] text-center absolute bottom-0 left-[70%]">Action</div>
        </div>
        <div class="scrollable-content h-[calc(100vh-75px)] bg-slate-600 w-full absolute bottom-0 overflow-y-auto">
            <ul class="">
                <li v-for="(item, index) in state.everyGameHistory" :key="index">
                    <div class="h-[25px] w-full">
                        <div class="h-[25px] w-[10%] text-center absolute left-0">{{ state.everyGameHistory.length - index }}</div>
                        <div class="h-[25px] w-[30%] text-center absolute left-[10%]">{{ state.everyGameHistory[index].player }}</div>
                        <div class="h-[25px] w-[30%] text-center absolute left-[40%]">{{ state.everyGameHistory[index].round }}</div>
                        <div class="h-[25px] w-[30%] text-center absolute left-[70%]">{{ state.everyGameHistory[index].action }}</div>
                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>


<script>
import { state } from '../../store/dataStore';
export default{
    setup() {
        return {
            state
        }
    },
    data() {
        return {
            startDrag: false,
            startX: 0,
            startBarWith: 0,
        }
    },
    mounted() {
        watch(() => state.everyGameHistory, (newval, oldval) => {
            for (let i = 0; i < state.everyGameHistory.length; i ++) {
                if (state.everyGameHistory[i].player === 0) {
                    state.everyGameHistory[i].player = 'you'
                } else {
                    if (!isNaN(state.everyGameHistory[i].player)) {
                        state.everyGameHistory[i].player = `bot ${state.everyGameHistory[i].player}`
                    }
                }
            }
        }, { deep: true })
    },
    methods: {
    }
}
</script>
<style>
    .scrollable-content::-webkit-scrollbar {
        width: 4px;
    }

</style>