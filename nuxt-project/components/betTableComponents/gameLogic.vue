<template>
    <GetResponse/>
    <StartGame/>
    <DoAction/>
    <ClaculateHandLevel/>
    <SplitPot v-if="!state.haveAllinCase"/>
    <GameOverCheck/>
    <HandleAllinCase v-if="state.haveAllinCase"/>
</template>


<script>
import { watch } from 'vue';
import { state } from '../../store/dataStore';
import GameOverCheck from './gameOverCheck.vue'
import CalculatePlayPos from './calculatePlayPos.vue';
import GetResponse from './getResponse.vue'
import DoAction from './doAction.vue';
import StartGame from './startGame.vue';
import SplitPot from './splitPot.vue'
import MoveToNextRound from './moveToNextRound.vue';
import HandleAllinCase from './handleAllinCase.vue';
import ClaculateHandLevel from './claculateHandLevel.vue';
    export default {
        setup() {            
            return {
                state,
            }
        },
        data() {
            return {
                
            }
        },
        mounted() {
            
        },
        methods: {
            
        },
        components: {
            GameOverCheck,
            CalculatePlayPos,
            GetResponse,
            DoAction,
            StartGame,
            SplitPot,
            MoveToNextRound,
            HandleAllinCase,
            ClaculateHandLevel
        }
    }
</script>