<script setup lang="ts">
import { state } from '~/store/dataStore';
</script>

<template>
    <div class="h-[150vh] w-[100vw] absolute">
        <div class="w-[98vw] h-[20vw] bg-neutral rounded-lg mt-[1vw] left-[50%] translate-x-[-50%] absolute">
            <NuxtLink to="/">
                <img src="/img/logo.png" alt="" class="logo h-[50px] cursor-pointer w-auto absolute left-[5vw] top-[50%] translate-y-[-50%]">
            </NuxtLink>
            <img src="/img/pause.png" alt="" class="h-[40px] cursor-pointer w-auto absolute right-[5vw] top-[50%] translate-y-[-50%]">
        </div>
        <div style="" class="h-[98vw] w-[98vw] absolute left-[50%] top-[20vw] mt-[2vw] translate-x-[-50%]">
            <img src="/img/pokerTable.png" alt="" class="h-full w-full rounded-[2vh] absolute">
            <div class="h-[96%] w-[96%] absolute top-[2%] hidden left-[2%]">
                <div class="communityCards select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-blue-600 absolute underline text-center text-[4vh] top-[46%] left-[32%]"></div>
                <div class="communityCards select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-blue-600 absolute underline text-center text-[4vh] top-[46%] left-[39%]"></div>
                <div class="communityCards select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-blue-600 absolute underline text-center text-[4vh] top-[46%] left-[46%]"></div>
                <div class="communityCards select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-blue-600 absolute underline text-center text-[4vh] top-[46%] left-[54%]"></div>
                <div class="communityCards select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-blue-600 absolute underline text-center text-[4vh] top-[46%] left-[61%]"></div>
                <div class="player0 boder-solid h-[25%] w-[50%] absolute bottom-0 left-[25%]">
                    <div class="avatar w-[10vw] absolute left-[50%] translate-x-[-50%] bottom-[2.5vw]">
                        <img src="/img/avt1.png" alt="" class="rounded-full">
                    </div>
                    <div class="playerCard select-none font-sans font-medium h-[30%] w-[12%] rounded-sm border-[0.2vh] border-black border-solid bg-blue-600 underline text-center text-[4vh] absolute bottom-[12%] left-[12%]"></div>
                    <div class="playerCard select-none font-sans font-medium h-[30%] w-[12%] rounded-sm border-[0.2vh] border-black border-solid bg-blue-600 underline text-center text-[4vh] absolute bottom-[12%] left-[24%]"></div>
                    <div class="dealer h-[5vw] w-[5vw] bg-gray-200 rounded-full absolute left-[20%] top-[10%] border-solid border-black border-[0.1vw] hidden">
                        <p class="absolute left-[50%] translate-x-[-50%] text-black text-[4vw] top-[50%] translate-y-[-50%]">D</p>
                    </div>
                    <div class="smallBlind h-[5vw] w-[5vw] bg-blue-600 rounded-full absolute left-[20%] top-[10%] border-solid border-black border-[0.1vw] hidden">
                        <p class="absolute left-[50%] translate-x-[-50%] text-black text-[4vw] top-[50%] translate-y-[-50%]">S</p>
                    </div>
                    <div class="smallBlind h-[5vw] w-[5vw] bg-blue-600 rounded-full absolute left-[20%] top-[10%] border-solid border-black border-[0.1vw] hidden">
                        <p class="absolute left-[50%] translate-x-[-50%] text-black text-[4vw] top-[50%] translate-y-[-50%]">B</p>
                    </div>
                    <div class="absolute bottom-[50%] left-[50%] px-[2vw] translate-x-[-50%] text-[3vw] inline-block bg-yellow-200 text-black border-[0.3vw] border-black border-solid rounded-[3.6vw]">0</div>
                    <div class="absolute bottom-[12%] left-[75%] px-[2vw] translate-x-[-50%] text-[3vw] inline-block bg-yellow-200 text-black border-[0.3vw] border-black border-solid rounded-[3.6vw]">2000</div>
                </div>
                <div class="player1 boder-solid h-[25%] w-[50%] absolute rotate-90 bottom-[12.5%] left-[-12.5%]">
                    <div class="avatar w-[10vw] absolute left-[50%] translate-x-[-50%] bottom-[2.5vw]">
                        <img src="/img/avt.png" alt="" class="rounded-full">
                    </div>
                    <div class="playerCard select-none font-sans font-medium h-[30%] w-[12%] rounded-sm border-[0.2vh] border-black border-solid bg-blue-600 underline text-center text-[4vh] absolute bottom-[12%] left-[12%]"></div>
                    <div class="playerCard select-none font-sans font-medium h-[30%] w-[12%] rounded-sm border-[0.2vh] border-black border-solid bg-blue-600 underline text-center text-[4vh] absolute bottom-[12%] left-[24%]"></div>
                    <div class="dealer h-[5vw] w-[5vw] bg-gray-200 rounded-full absolute left-[20%] top-[10%] border-solid border-black border-[0.1vw] hidden">
                        <p class="absolute left-[50%] translate-x-[-50%] text-black text-[4vw] top-[50%] translate-y-[-50%]">D</p>
                    </div>
                    <div class="smallBlind h-[5vw] w-[5vw] bg-blue-600 rounded-full absolute left-[20%] top-[10%] border-solid border-black border-[0.1vw] hidden">
                        <p class="absolute left-[50%] translate-x-[-50%] text-black text-[4vw] top-[50%] translate-y-[-50%]">S</p>
                    </div>
                    <div class="smallBlind h-[5vw] w-[5vw] bg-blue-600 rounded-full absolute left-[20%] top-[10%] border-solid border-black border-[0.1vw] hidden">
                        <p class="absolute left-[50%] translate-x-[-50%] text-black text-[4vw] top-[50%] translate-y-[-50%]">B</p>
                    </div>
                    <div class="absolute bottom-[50%] left-[50%] px-[2vw] translate-x-[-50%] text-[3vw] inline-block bg-yellow-200 text-black border-[0.3vw] border-black border-solid rounded-[3.6vw]">0</div>
                    <div class="absolute bottom-[12%] left-[75%] px-[2vw] translate-x-[-50%] text-[3vw] inline-block bg-yellow-200 text-black border-[0.3vw] border-black border-solid rounded-[3.6vw]">2000</div>
                </div>
                <div class="player2 boder-solid h-[25%] w-[50%] absolute rotate-90 top-[12.5%] left-[-12.5%]">
                    <div class="avatar w-[10vw] absolute left-[50%] translate-x-[-50%] bottom-[2.5vw]">
                        <img src="/img/avt2.png" alt="" class="rounded-full">
                    </div>
                    <div class="playerCard select-none font-sans font-medium h-[30%] w-[12%] rounded-sm border-[0.2vh] border-black border-solid bg-blue-600 underline text-center text-[4vh] absolute bottom-[12%] left-[12%]"></div>
                    <div class="playerCard select-none font-sans font-medium h-[30%] w-[12%] rounded-sm border-[0.2vh] border-black border-solid bg-blue-600 underline text-center text-[4vh] absolute bottom-[12%] left-[24%]"></div>
                    <div class="dealer h-[5vw] w-[5vw] bg-gray-200 rounded-full absolute left-[20%] top-[10%] border-solid border-black border-[0.1vw] hidden">
                        <p class="absolute left-[50%] translate-x-[-50%] text-black text-[4vw] top-[50%] translate-y-[-50%]">D</p>
                    </div>
                    <div class="smallBlind h-[5vw] w-[5vw] bg-blue-600 rounded-full absolute left-[20%] top-[10%] border-solid border-black border-[0.1vw] hidden">
                        <p class="absolute left-[50%] translate-x-[-50%] text-black text-[4vw] top-[50%] translate-y-[-50%]">S</p>
                    </div>
                    <div class="smallBlind h-[5vw] w-[5vw] bg-blue-600 rounded-full absolute left-[20%] top-[10%] border-solid border-black border-[0.1vw] hidden">
                        <p class="absolute left-[50%] translate-x-[-50%] text-black text-[4vw] top-[50%] translate-y-[-50%]">B</p>
                    </div>
                    <div class="absolute bottom-[50%] left-[50%] px-[2vw] translate-x-[-50%] text-[3vw] inline-block bg-yellow-200 text-black border-[0.3vw] border-black border-solid rounded-[3.6vw]">0</div>
                    <div class="absolute bottom-[12%] left-[75%] px-[2vw] translate-x-[-50%] text-[3vw] inline-block bg-yellow-200 text-black border-[0.3vw] border-black border-solid rounded-[3.6vw]">2000</div>
                </div>
                <div class="player3 boder-solid h-[25%] w-[50%] absolute top-0 left-[25%]">
                    <div class="avatar w-[10vw] absolute right-[50%] translate-x-[50%] top-[2.5vw]">
                        <img src="/img/avt3.png" alt="" class="rounded-full">
                    </div>
                    <div class="playerCard select-none font-sans font-medium h-[30%] w-[12%] rounded-sm border-[0.2vh] border-black border-solid bg-blue-600 underline text-center text-[4vh] absolute top-[10%] right-[12%]"></div>
                    <div class="playerCard select-none font-sans font-medium h-[30%] w-[12%] rounded-sm border-[0.2vh] border-black border-solid bg-blue-600 underline text-center text-[4vh] absolute top-[10%] right-[24%]"></div>
                    <div class="dealer h-[5vw] w-[5vw] bg-gray-200 rounded-full absolute right-[20%] bottom-[10%] border-solid border-black border-[0.1vw] hidden">
                        <p class="absolute left-[50%] translate-x-[-50%] text-black text-[4vw] top-[50%] translate-y-[-50%]">D</p>
                    </div>
                    <div class="smallBlind h-[5vw] w-[5vw] bg-blue-600 rounded-full absolute right-[20%] bottom-[10%] border-solid border-black border-[0.1vw] hidden">
                        <p class="absolute left-[50%] translate-x-[-50%] text-black text-[4vw] top-[50%] translate-y-[-50%]">S</p>
                    </div>
                    <div class="smallBlind h-[5vw] w-[5vw] bg-blue-600 rounded-full absolute right-[20%] bottom-[10%] border-solid border-black border-[0.1vw] hidden">
                        <p class="absolute left-[50%] translate-x-[-50%] text-black text-[4vw] top-[50%] translate-y-[-50%]">B</p>
                    </div>
                    <div class="absolute top-[50%] left-[50%] px-[2vw] translate-x-[-50%] text-[3vw] inline-block bg-yellow-200 text-black border-[0.3vw] border-black border-solid rounded-[3.6vw]">0</div>
                    <div class="absolute top-[12%] right-[75%] px-[2vw] translate-x-[50%] text-[3vw] inline-block bg-yellow-200 text-black border-[0.3vw] border-black border-solid rounded-[3.6vw]">2000</div>
                </div>
                <div class="player4 boder-solid h-[25%] w-[50%] absolute -rotate-90 top-[12.5%] right-[-12.5%]">
                    <div class="avatar w-[10vw] absolute left-[50%] translate-x-[-50%] bottom-[2.5vw]">
                        <img src="/img/avt4.png" alt="" class="rounded-full">
                    </div>
                    <div class="playerCard select-none font-sans font-medium h-[30%] w-[12%] rounded-sm border-[0.2vh] border-black border-solid bg-blue-600 underline text-center text-[4vh] absolute bottom-[12%] left-[12%]"></div>
                    <div class="playerCard select-none font-sans font-medium h-[30%] w-[12%] rounded-sm border-[0.2vh] border-black border-solid bg-blue-600 underline text-center text-[4vh] absolute bottom-[12%] left-[24%]"></div>
                    <div class="dealer h-[5vw] w-[5vw] bg-gray-200 rounded-full absolute left-[20%] top-[10%] border-solid border-black border-[0.1vw] hidden">
                        <p class="absolute left-[50%] translate-x-[-50%] text-black text-[4vw] top-[50%] translate-y-[-50%]">D</p>
                    </div>
                    <div class="smallBlind h-[5vw] w-[5vw] bg-blue-600 rounded-full absolute left-[20%] top-[10%] border-solid border-black border-[0.1vw] hidden">
                        <p class="absolute left-[50%] translate-x-[-50%] text-black text-[4vw] top-[50%] translate-y-[-50%]">S</p>
                    </div>
                    <div class="smallBlind h-[5vw] w-[5vw] bg-blue-600 rounded-full absolute left-[20%] top-[10%] border-solid border-black border-[0.1vw] hidden">
                        <p class="absolute left-[50%] translate-x-[-50%] text-black text-[4vw] top-[50%] translate-y-[-50%]">B</p>
                    </div>
                    <div class="absolute bottom-[50%] left-[50%] px-[2vw] translate-x-[-50%] text-[3vw] inline-block bg-yellow-200 text-black border-[0.3vw] border-black border-solid rounded-[3.6vw]">0</div>
                    <div class="absolute bottom-[12%] left-[75%] px-[2vw] translate-x-[-50%] text-[3vw] inline-block bg-yellow-200 text-black border-[0.3vw] border-black border-solid rounded-[3.6vw]">2000</div>
                </div>
                <div class="player5 boder-solid h-[25%] w-[50%] absolute -rotate-90 bottom-[12.5%] right-[-12.5%]">
                    <div class="avatar w-[10vw] absolute left-[50%] translate-x-[-50%] bottom-[2.5vw]">
                        <img src="/img/avt5.png" alt="" class="rounded-full">
                    </div>
                    <div class="playerCard select-none font-sans font-medium h-[30%] w-[12%] rounded-sm border-[0.2vh] border-black border-solid bg-blue-600 underline text-center text-[4vh] absolute bottom-[12%] left-[12%]"></div>
                    <div class="playerCard select-none font-sans font-medium h-[30%] w-[12%] rounded-sm border-[0.2vh] border-black border-solid bg-blue-600 underline text-center text-[4vh] absolute bottom-[12%] left-[24%]"></div>
                    <div class="dealer h-[5vw] w-[5vw] bg-gray-200 rounded-full absolute left-[20%] top-[10%] border-solid border-black border-[0.1vw] hidden">
                        <p class="absolute left-[50%] translate-x-[-50%] text-black text-[4vw] top-[50%] translate-y-[-50%]">D</p>
                    </div>
                    <div class="smallBlind h-[5vw] w-[5vw] bg-blue-600 rounded-full absolute left-[20%] top-[10%] border-solid border-black border-[0.1vw] hidden">
                        <p class="absolute left-[50%] translate-x-[-50%] text-black text-[4vw] top-[50%] translate-y-[-50%]">S</p>
                    </div>
                    <div class="smallBlind h-[5vw] w-[5vw] bg-blue-600 rounded-full absolute left-[20%] top-[10%] border-solid border-black border-[0.1vw] hidden">
                        <p class="absolute left-[50%] translate-x-[-50%] text-black text-[4vw] top-[50%] translate-y-[-50%]">B</p>
                    </div>
                    <div class="absolute bottom-[50%] left-[50%] px-[2vw] translate-x-[-50%] text-[3vw] inline-block bg-yellow-200 text-black border-[0.3vw] border-black border-solid rounded-[3.6vw]">0</div>
                    <div class="absolute bottom-[12%] left-[75%] px-[2vw] translate-x-[-50%] text-[3vw] inline-block bg-yellow-200 text-black border-[0.3vw] border-black border-solid rounded-[3.6vw]">2000</div>
                </div>
            </div>
            <div class="w-full h-[7.5vh] absolute bottom-[-7.5vh]">
                <button class="btn border-none bg-blue-500 text-white h-full w-[30%] mt-2 absolute left-0">Fold/Check</button disabled="true" class=>
                <button class="btn border-none bg-blue-500 text-white h-full w-[30%] mt-2 absolute left-[35%]">Call</button disabled="true" class=>
                <input type="number" placeholder="Raise" id="" class="h-full input bg-blue-500 input-bordered w-[30%] mt-2 absolute right-0 text-white rounded-md">
            </div>
        </div>
    </div>
</template>


<style>

</style>