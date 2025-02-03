<template>
    <BetTableComponentsLogicComponentsGetResponse/>
    <BetTableComponentsLogicComponentsStartGame/>
    <BetTableComponentsLogicComponentsDoAction/>
    <BetTableComponentsLogicComponentsClaculateHandLevel/>
    <BetTableComponentsLogicComponentsSplitPot v-if="!state.haveAllinCase"/>
    <BetTableComponentsLogicComponentsGameOverCheck/>
    <BetTableComponentsLogicComponentsHandleAllinCase v-if="state.haveAllinCase"/>
</template>


<script>
import { state } from '~/store/data/dataStore'
    export default {
        setup() {            
            return {
                state,
            }
        }
    }
</script>