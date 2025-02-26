<template>
    <BetTableComponentsLogicComponentsCalculatePlayerWinRate/>
    <BetTableComponentsLogicComponentsGetResponse/>
    <BetTableComponentsLogicComponentsStartGame/>
    <BetTableComponentsLogicComponentsDoAction/>
    <BetTableComponentsLogicComponentsClaculateHandLevel/>
    <BetTableComponentsLogicComponentsSplitPot v-if="!betTableState.haveAllinCase"/>
    <BetTableComponentsLogicComponentsGameOverCheck/>
    <BetTableComponentsLogicComponentsHandleAllinCase v-if="betTableState.haveAllinCase"/>
    <BetTableComponentsLogicComponentsPlayAudio/>
    <BetTableComponentsLogicComponentsDisplayPlayerTurn/>
</template>


<script>
import { betTableState } from '~/store/data/betTableState';
    export default {
        setup() {            
            return {
                betTableState,
            }
        }
    }
</script>