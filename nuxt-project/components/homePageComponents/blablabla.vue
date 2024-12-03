<template>
</template>


<script>
    export default {
        setup() {
            const BetTableFunctions = betTableFunctions()
            const BetTableData = betTableData()
            return {
                BetTableData,
                BetTableFunctions
            }
        },
        data() {
            return {

            }
        },
        mounted() {
            console.log(this.BetTableData.blindPos)
            this.BetTableData.blindPos = 3
        },
        methods: {

        },
    }
</script>