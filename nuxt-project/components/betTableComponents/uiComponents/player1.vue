<template>
    <div class="player0 boder-solid h-[25%] w-[50%] absolute rotate-90 bottom-[12.5%] left-[-12.5%]">
        <div class="w-[10vw] md:w-[7.5vh] absolute left-[50%] translate-x-[-50%] md:bottom-[2.5vh] bottom-[2.5vw]">
            <img src="~/public/img/avt1.png" alt="" class="avatar rounded-full border-solid border-[0.5vw] md:border-[0.3vh] border-white">
        </div>
        <div class="playerCard block select-none font-sans font-medium h-[30%] w-[12%] rounded-sm border-[0.2vh] border-black border-solid bg-blue-600 underline text-center text-[4vw] md:text-[3.5vh] absolute bottom-[12%] left-[12%]"></div>
        <div class="playerCard block select-none font-sans font-medium h-[30%] w-[12%] rounded-sm border-[0.2vh] border-black border-solid bg-blue-600 underline text-center text-[4vw] md:text-[3.5vh] absolute bottom-[12%] left-[24%]"></div>
        <div class="dealer h-[5vw] md:h-[3vh] w-[5vw] md:w-[3vh] bg-gray-200 rounded-full absolute left-[20%] top-[10%] border-solid border-black border-[0.1vw] hidden">
            <p class="absolute left-[50%] translate-x-[-50%] text-black text-[4vw] md:text-[2vh] top-[50%] translate-y-[-50%]">D</p>
        </div>
        <div class="smallBlind h-[5vw] md:h-[3vh] w-[5vw] md:w-[3vh] bg-blue-600 rounded-full absolute left-[20%] top-[10%] border-solid border-black border-[0.1vw] hidden">
            <p class="absolute left-[50%] translate-x-[-50%] text-black text-[4vw] md:text-[2vh] top-[50%] translate-y-[-50%]">S</p>
        </div>
        <div class="bigBlind h-[5vw] md:h-[3vh] w-[5vw] md:w-[3vh] bg-blue-600 rounded-full absolute left-[20%] top-[10%] border-solid border-black border-[0.1vw] hidden">
            <p class="absolute left-[50%] translate-x-[-50%] text-black text-[4vw] md:text-[2vh] top-[50%] translate-y-[-50%]">B</p>
        </div>
        <div class="absolute bottom-[50%] left-[50%] px-[2vw] md:px-[2vh] translate-x-[-50%] text-[3vw] md:text-[1.5vh] inline-block bg-blue-200 text-black border-[0.5vw] md:border-[0.3vh] border-neutral border-solid rounded-[3.6vw]" v-if="betTotalList[0] !== 0">{{ betTotalList[0] }}</div>
        <div class="absolute bottom-[12%] md:bottom-[10%] left-[75%] md:left-[50%] px-[2vw] md:px-[2vh] translate-x-[-50%] text-[3vw] md:text-[1.5vh] inline-block bg-blue-200 text-black border-[0.5vw] md:border-[0.3vh] border-neutral border-solid rounded-[3.6vw]" >{{ stackList[0] }}</div>
    </div>
</template>

<script>
import { state } from '~/store/data/betTableState';
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