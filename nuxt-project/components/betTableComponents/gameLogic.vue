<template>
    <BetTableComponentsGetResponse/>
    <BetTableComponentsStartGame/>
    <BetTableComponentsDoAction/>
    <BetTableComponentsClaculateHandLevel/>
    <BetTableComponentsSplitPot v-if="!state.haveAllinCase"/>
    <BetTableComponentsGameOverCheck/>
    <BetTableComponentsHandleAllinCase v-if="state.haveAllinCase"/>
</template>


<script>
import { state } from '../../store/dataStore';
    export default {
        setup() {            
            return {
                state,
            }
        }
    }
</script>