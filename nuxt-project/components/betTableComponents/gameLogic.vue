<template>
    <betTableComponentsGetResponse/>
    <betTableComponentsStartGame/>
    <betTableComponentsDoAction/>
    <betTableComponentsClaculateHandLevel/>
    <betTableComponentsSplitPot v-if="!BetTableData.haveAllinCase"/>
    <betTableComponentsGameOverCheck/>
    <betTableComponentsHandleAllinCase v-if="BetTableData.haveAllinCase"/>
</template>


<script>
    export default {
        setup() {      
            const BetTableData = betTableData()      
            return {
                BetTableData,
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
    }
</script>