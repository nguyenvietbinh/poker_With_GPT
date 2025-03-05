<template>
    <div class="h-[100vh] w-[100vw] absolute">
        <BetTableComponentsUiComponentsHeader/>
        <div class="h-[98vw] md:h-[80vh] w-[98vw] md:w-[80vh] absolute left-[50%] top-[20vw] md:top-[10vh] mt-[2vw] md:mt-[1vh] translate-x-[-50%]">
            <img src="/img/pokerTable.png" alt="" class="h-full w-full rounded-[2vh] absolute">
            <div class="table h-[96%] w-[96%] absolute top-[2%] left-[2%]">
                <BetTableComponentsUiComponentsPlayerArea v-if="betTableState.startGame"/>
                <BetTableComponentsUiComponentsCenterOfTable/>
                <BetTableComponentsLogicComponentsStartGame v-if="betTableState.startGame"/>
                <BetTableComponentsUiComponentsSplitCard v-if="betTableState.startGame"/>
            </div>
            <BetTableComponentsUiComponentsWinRate v-if="betTableState.startGame"/>
            <BetTableComponentsUiComponentsLoadingBar v-if="!betTableState.startGame"/>
            <BetTableComponentsUiComponentsButtons/>
        </div>
    </div>
    <BetTableComponentsLogicComponentsGameLogic v-if="betTableState.startGame" />
</template>

<script>
import { betTableState } from '~/store/data/betTableState';
export default {
    setup() {
        return {
            betTableState,
        }
    },
}
</script>