<template>

</template>

<script>
import { state } from '~/store/data/dataStore';
export default {  
    setup() {
        return {
            state
        }
    },
    data() {
        return {
            betTotalList: [0, 0, 0, 0, 0, 0],
            stackList: [2000, 2000, 2000, 2000, 2000, 2000],
        }
    }
}

</script>