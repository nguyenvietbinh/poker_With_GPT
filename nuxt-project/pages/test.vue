<template>
    <div :class="`${style.card} bottom-[50%] left-[45%]`">
        <img src="/img/cards/clubs_k.png" alt="">
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