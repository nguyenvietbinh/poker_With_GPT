<template>
    <div :class="`${style.card} bottom-[50%] left-[45%]`">
    </div>
</template>


<script>
import { style } from '~/store/data/taildwindStyle';
export default {
    setup() {
        return {
            style
        }
    }
}
</script>