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
                <li v-for="(iItem, i) in state.everyGameHistory" :key="i">
                    <div class="h-[25px] w-full" v-if="iItem.stt === 'action'">
                        <div class="h-[25px] w-[10%] text-center absolute left-0">{{ countAct(i) }}</div>
                        <div class="h-[25px] w-[30%] text-center absolute left-[10%]">{{ iItem.player }}</div>
                        <div class="h-[25px] w-[30%] text-center absolute left-[40%]">{{ iItem.round }}</div>
                        <div class="h-[25px] w-[30%] text-center absolute left-[70%]">{{ iItem.action }}</div>
                    </div>
                    <div v-else-if="iItem.stt === 'move'" class="h-[2px] w-full bg-[#053191]"></div>
                    <div v-else-if="iItem.stt === 'end'">
                        <ul>
                            <li v-for="(jItem, j) in iItem.winner" :key="j">
                                <div v-if="jItem === 0">Winner: you</div>
                                <div v-else>Winner: bot {{ jItem }}</div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
            <div class="h-[2px] w-full bg-[#053191]"></div>
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
            gameHistoryAction: null,
        }
    },
    mounted() {
        watch(() => state.everyGameHistory, (newval, oldval) => {
            this.gameHistoryAction = 0
            for (let i = 0; i < state.everyGameHistory.length; i ++) {
                if (state.everyGameHistory[i].stt === 'action') {
                    this.gameHistoryAction ++
                    if (state.everyGameHistory[i].player === 0) {
                        state.everyGameHistory[i].player = 'you'
                    } else {
                        if (!isNaN(state.everyGameHistory[i].player)) {
                            state.everyGameHistory[i].player = `bot ${state.everyGameHistory[i].player}`
                        }
                    }
                } else {

                }
            }
        }, { deep: true })
    },
    methods: {
        countAct(index) {
            let count = 0
            for (let i = index; i < state.everyGameHistory.length; i ++) {
                if (state.everyGameHistory[i].stt === 'action') {
                    count ++
                }
            }
            return count
        }
    }
}
</script>
<style>
    .scrollable-content::-webkit-scrollbar {
        width: 4px;
    }

</style>