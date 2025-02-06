<template>
    <div class="h-full w-1/4 absolute right-0 top-0 border border-gray-500">
        <div class="h-1/6 w-full bg-gray-800 text-white">
            <p class="pt-8 text-center pl-2">Number Of Game: <span class="font-semibold">{{ state.numberOfGame }}</span></p>
            <div class="flex space-x-14 ml-3 mt-10">
                <p>STT</p>
                <p>Player</p>
                <p>Round</p>
                <p>Action</p>
            </div>
        </div>
        <div class="scrollable-content h-5/6 bg-gray-400 overflow-y-auto">
                <ul v-for="(iItem, i) in state.everyGameHistory" :key="i">
                    <div class="flex space-x-12 ml-5 mr-3 mt-3" v-if="iItem.stt === 'action'">
                        <div class="w-1/4"> 
                            <p class="font-semibold">{{ countAct(i) }}</p>
                        </div>
                        <div class="w-1/3"> 
                            <p>{{ iItem.player }}</p>
                        </div>
                        <div class="w-1/3"> 
                            <p>{{ iItem.round }}</p>
                        </div>
                        <div class="w-1/3 text-center"> 
                            <p>{{ iItem.action }}</p>
                        </div>
                    </div>
                    <div v-else-if="iItem.stt === 'move'" class="border border-gray-800 mt-3"></div>
                    <div v-else-if="iItem.stt === 'end'">
                        <ul>
                            <li v-for="(jItem, j) in iItem.winner" :key="j" class="text-green-800 font-semibold mt-10 text-center text-lg">
                                <p v-if="jItem === 0">Winner: you</p>
                                <p v-else>Winner: bot {{ jItem }}</p>
                            </li>
                        </ul>
                    </div>
                </ul>
            <div class="border mt-5 border-gray-800"></div>
        </div>

    </div>
</template>


<script>
import { state } from '~/store/data/dataStore';
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
