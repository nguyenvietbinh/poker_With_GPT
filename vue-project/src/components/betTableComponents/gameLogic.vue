<template>
    <GetResponse/>
    <StartGame/>
    <DoAction/>
    <SplitPot/>
    <GameOverCheck/>
</template>


<script>
import { watch } from 'vue';
import { state } from '../../store/dataStore';
import { useMyFunction } from '../../store/functionStore';
import GameOverCheck from './gameOverCheck.vue'
import CalculatePlayPos from './calculatePlayPos.vue';
import GetResponse from './getResponse.vue'
import DoAction from './doAction.vue';
import StartGame from './startGame.vue';
import SplitPot from './splitPot.vue'
import MoveToNextRound from './moveToNextRound.vue';
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
            MoveToNextRound
        }
    }
</script>