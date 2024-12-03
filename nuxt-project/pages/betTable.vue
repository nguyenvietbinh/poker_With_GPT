<template>
  <div class="banner2 h-full w-full bg-blue-600 absolute top-0 left-0">
      <NuxtLink to="/">
          <div class="w-[50px] h-[50px] absolute top-[25px] left-[25px]">
              <img src="/img/logo.png" alt="" class="h-full w-full">
          </div>
      </NuxtLink>
      <div style="top: calc(50% - 250px); left: calc(50% - 250px);" class="h-[500px] w-[500px] absolute select-none">
      <img src="/img/pokerTable.png" alt="" class="h-[500px] w-auto rounded-[20px] absolute top-0 left-0 z-0">
      <div class="communityCards select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 absolute underline text-center text-[20px] top-[230px] left-[160px]"></div>
      <div class="communityCards select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 absolute underline text-center text-[20px] top-[230px] left-[195px]"></div>
      <div class="communityCards select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 absolute underline text-center text-[20px] top-[230px] left-[230px]"></div>
      <div class="communityCards select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 absolute underline text-center text-[20px] top-[230px] left-[270px]"></div>
      <div class="communityCards select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 absolute underline text-center text-[20px] top-[230px] left-[310px]"></div>
      <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute top-[430px] left-[220px]"></div>
      <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute top-[430px] left-[250px]"></div>
      <div class="dealer select-none font-sans font-medium rounded-[50%] border-[1px] border-black border-solid text-center bg-white text-[13px] px-[5px] absolute top-[430px] left-[300px] hidden">D</div>
      <div class="smblind h-[20px] w-[20px] rounded-[50%] border-[1px] border-black border-solid bg-blue-600 absolute top-[430px] left-[300px] hidden"></div>
      <div class="bigblind h-[20px] w-[20px] rounded-[50%] border-[1px] border-black border-solid bg-red-600 absolute top-[430px] left-[300px] hidden"></div>
      <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute rotate-90 top-[400px] left-[30px]"></div>
      <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute rotate-90 top-[370px] left-[30px]"></div>
      <div class="dealer select-none font-sans font-medium rounded-[50%] border-[1px] border-black border-solid text-center bg-white text-[13px] px-[5px] absolute rotate-90 top-[330px] left-[30px] hidden">D</div>
      <div class="smblind h-[20px] w-[20px] rounded-[50%] border-[1px] border-black border-solid bg-blue-600 absolute rotate-90 top-[330px] left-[30px] hidden"></div>
      <div class="bigblind h-[20px] w-[20px] rounded-[50%] border-[1px] border-black border-solid bg-red-600 absolute rotate-90 top-[330px] left-[30px] hidden"></div>
      <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute rotate-90 bottom-[400px] left-[30px]"></div>
      <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute rotate-90 bottom-[370px] left-[30px]"></div>
      <div class="dealer select-none font-sans font-medium rounded-[50%] border-[1px] border-black border-solid text-center bg-white text-[13px] px-[5px] absolute rotate-90 bottom-[330px] left-[30px] hidden">D</div>
      <div class="smblind h-[20px] w-[20px] rounded-[50%] border-[1px] border-black border-solid bg-blue-600 absolute rotate-90 bottom-[330px] left-[30px] hidden"></div>
      <div class="bigblind h-[20px] w-[20px] rounded-[50%] border-[1px] border-black border-solid bg-red-600 absolute rotate-90 bottom-[330px] left-[30px] hidden"></div>
      <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute bottom-[430px] left-[220px]"></div>
      <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute bottom-[430px] left-[250px]"></div>
      <div class="dealer select-none font-sans font-medium rounded-[50%] border-[1px] border-black border-solid text-center bg-white text-[13px] px-[5px] absolute rotate-180 bottom-[430px] left-[170px] hidden">D</div>
      <div class="smblind h-[20px] w-[20px] rounded-[50%] border-[1px] border-black border-solid bg-blue-600 absolute rotate-180 bottom-[430px] left-[170px] hidden"></div>
      <div class="bigblind h-[20px] w-[20px] rounded-[50%] border-[1px] border-black border-solid bg-red-600 absolute rotate-180 bottom-[430px] left-[170px] hidden"></div>
      <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute -rotate-90 bottom-[400px] right-[30px]"></div>
      <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute -rotate-90 bottom-[370px] right-[30px]"></div>
      <div class="dealer select-none font-sans font-medium rounded-[50%] border-[1px] border-black border-solid text-center bg-white text-[13px] px-[5px] absolute -rotate-90 bottom-[330px] right-[30px] hidden">D</div>
      <div class="smblind h-[20px] w-[20px] rounded-[50%] border-[1px] border-black border-solid bg-blue-600 absolute -rotate-90 bottom-[330px] right-[30px] hidden"></div>
      <div class="bigblind h-[20px] w-[20px] rounded-[50%] border-[1px] border-black border-solid bg-red-600 absolute -rotate-90 bottom-[330px] right-[30px] hidden"></div>
      <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute -rotate-90 top-[400px] right-[30px]"></div>
      <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute -rotate-90 top-[370px] right-[30px]"></div>
      <div class="dealer select-none font-sans font-medium rounded-[50%] border-[1px] border-black border-solid text-center bg-white text-[13px] px-[5px] absolute -rotate-90 top-[330px] right-[30px] hidden">D</div>
      <div class="smblind h-[20px] w-[20px] rounded-[50%] border-[1px] border-black border-solid bg-blue-600 absolute -rotate-90 top-[330px] right-[30px] hidden"></div>
      <div class="bigblind h-[20px] w-[20px] rounded-[50%] border-[1px] border-black border-solid bg-red-600 absolute -rotate-90 top-[330px] right-[30px] hidden"></div>
      <div class="absolute bottom-[-50px] left-[225px] w-[50px] h-[50px]">
          <img src="/img/user.png" alt="" class="playerAvatar absolute h-[50px] w-[50px] bg-white rounded-full">
          <div class="absolute bottom-[-10px] left-[50%] px-2 pr-2 translate-x-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px]">{{ state.stackList[0] }}.0$ </div>
          <div class="left-[50%] top-[-95px] px-2 pr-2 translate-x-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px] absolute">{{ state.betTotalList[0] }}.0$</div>
          <div @click="this.checkButtonClick" class="right-[-70px] absolute p-2 m-1 hidden bg-red-500 rounded-md border-[1px] border-solid border-black hover:bg-black hover:text-red-500 hover:translate-y-[-2px] transition-all check">Check</div>
          <div @click="this.foldButtonClick" class="right-[-70px] absolute p-2 m-1 hidden bg-red-500 rounded-md border-[1px] border-solid border-black hover:bg-black hover:text-red-500 hover:translate-y-[-2px] transition-all fold">Fold</div>
          <div @click="this.callButtonClick" class="right-[-120px] absolute p-2 m-1 hidden bg-yellow-500 rounded-md border-[1px] border-solid border-black hover:bg-black hover:text-yellow-500 hover:translate-y-[-2px] transition-all call">Call</div>
          <input @keyup="this.inputCheck" type="text" class="right-[-180px] w-[55px] absolute hidden p-2 m-1 bg-green-950 text-white rounded-md border-[1px] border-solid border-black hover:bg-black hover:text-green-500 hover:translate-y-[-2px] transition-all raise" placeholder="Raise">
      </div>
      <div class="absolute bottom-[70px] left-[-50px] h-[50px] w-[50px]">
          <img src="/img/user.png" alt="" class="playerAvatar h-[50px] w-[50px] absolute bg-white rounded-[50%]">
          <div class="absolute bottom-[-10px] left-[50%] px-2 pr-2 translate-x-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px]">{{ state.stackList[1] }}.0$</div>
          <div class="top-[50%] right-[-100px] rotate-90 px-2 pr-2 translate-y-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px] absolute">{{ state.betTotalList[1] }}.0$</div>
      </div>
      <div class="absolute top-[70px] left-[-50px] h-[50px] w-[50px]">
          <img src="/img/user.png" alt="" class="playerAvatar h-[50px] w-[50px] absolute bg-white rounded-[50%]">
          <div class="absolute bottom-[-10px] left-[50%] px-2 pr-2 translate-x-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px]">{{ state.stackList[2] }}.0$</div>
          <div class="top-[50%] right-[-100px] rotate-90 px-2 pr-2 translate-y-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px] absolute">{{ state.betTotalList[2] }}.0$</div>
      </div>
      <div class="absolute top-[-50px] left-[225px] h-[50px] w-[50px]">
          <img src="/img/user.png" alt="" class="playerAvatar h-[50px] w-[50px] absolute bg-white rounded-[50%]">
          <div class="absolute bottom-[-10px] left-[50%] px-2 pr-2 translate-x-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px]">{{ state.stackList[3] }}.0$</div>
          <div class="left-[50%] bottom-[-95px] px-2 pr-2 translate-x-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px] absolute">{{ state.betTotalList[3] }}.0$</div>
      </div>
      <div class="absolute top-[70px] right-[-50px] h-[50px] w-[50px]">
          <img src="/img/user.png" alt="" class="playerAvatar h-[50px] w-[50px] absolute bg-white rounded-[50%]">
          <div class="absolute bottom-[-10px] left-[50%] px-2 pr-2 translate-x-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px]">{{ state.stackList[4] }}.0$</div>
          <div class="top-[50%] left-[-100px] -rotate-90 px-2 pr-2 translate-y-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px] absolute">{{ state.betTotalList[4] }}.0$</div>
      </div>
      <div class="absolute bottom-[70px] right-[-50px] h-[50px] w-[50px]">
          <img src="/img/user.png" alt="" class="playerAvatar h-full w-full absolute bg-white rounded-[50%]">
          <div class="absolute bottom-[-10px] left-[50%] px-2 pr-2 translate-x-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px]">{{ state.stackList[5] }}.0$</div>
          <div class="top-[50%] left-[-100px] -rotate-90 px-2 pr-2 translate-y-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px] absolute">{{ state.betTotalList[5] }}.0$</div>
      </div>
      <div class="left-[50%] top-[200px] px-2 pr-2 translate-x-[-50%] text-[12px] inline-block bg-yellow-200 border-[2px] border-black border-solid rounded-[10px] absolute">Pot: {{ state.pot }}.0$</div>
      </div>      
  </div>
  <BetTableComponentsGameLogic/>
</template>


<script>
import { state } from '../store/dataStore';
export default {
    setup() {
        return {
            state
        }
    },
    data() {
        return {
            fold: null,
            check: null,
            call: null,
            raise: null,
            actionPos: null,
            playerAvatar: null,
        }
    },
    mounted() {
        this.playerAvatar = document.querySelectorAll('.playerAvatar')
        this.fold = document.querySelector('.fold')
        this.check = document.querySelector('.check')
        this.call = document.querySelector('.call')
        this.raise = document.querySelector('.raise')
    },
    methods: {
        inputCheck() {
            if (parseInt(event.target.value)) {
                event.target.value = parseInt(event.target.value)
            } else {
                event.target.value = ''
            }
            if (event.key === 'Enter') {
                this.state.playerAct = parseInt(event.target.value)
                this.state.numberOfAction ++
                this.disAbleButton()
            }
        },
        checkButtonClick() {
            this.state.playerAct = 'Check'
            this.state.numberOfAction ++
            this.disAbleButton()
        },
        foldButtonClick() {               
            this.state.playerAct = 'Fold'
            this.state.numberOfAction ++
            this.disAbleButton()
            this.playerAvatar[0].style.backgroundColor = 'gray'
        },
        callButtonClick() {
            this.state.playerAct = 'Call'
            this.state.numberOfAction ++
            this.disAbleButton()
        },
        disAbleButton() {
            this.playerAvatar[0].style.backgroundColor = 'white'
            this.check.style.display = 'none'
            this.fold.style.display = 'none'
            this.call.style.display = 'none'
            this.raise.style.display = 'none'
        }
    },
}
</script>