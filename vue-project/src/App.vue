<template>
  <div class="h-full w-full bg-blue-500 absolute top-0 left-0">
    <BetTable/>
  </div>
</template>

<script>
import BetTable from './betTable.vue';
import ClaculateCardLevel from './claculateHandLevel.vue';
import Test from './test.vue';

  export default {
    setup() {
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
      BetTable,
      ClaculateCardLevel,
      Test,
    }
  }
</script>