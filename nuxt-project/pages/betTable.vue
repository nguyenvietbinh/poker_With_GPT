<template>
  <div class="h-full w-full bg-[#2563EB] absolute top-0 left-0">
      <NuxtLink to="/">
          <div class="w-[50px] h-[50px] absolute top-[25px] left-[25px] select-none">
              <img src="/img/logo.png" alt="" class="h-full w-full">
          </div>
      </NuxtLink>

      <div style="left: 35%;"class="h-[75vh] w-[75vh] absolute translate-x-[-50%] translate-y-[-50%] top-[50%] select-none">
      <img src="/img/pokerTable.png" alt="" class="h-full w-full rounded-[2vh] absolute top-0 left-0 z-0">
      <div class="communityCards select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-red-600 absolute underline text-center text-[4vh] top-[50%] left-[32%]"></div>
      <div class="communityCards select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-red-600 absolute underline text-center text-[4vh] top-[50%] left-[39%]"></div>
      <div class="communityCards select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-red-600 absolute underline text-center text-[4vh] top-[50%] left-[46%]"></div>
      <div class="communityCards select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-red-600 absolute underline text-center text-[4vh] top-[50%] left-[54%]"></div>
      <div class="communityCards select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-red-600 absolute underline text-center text-[4vh] top-[50%] left-[61%]"></div>
      <div class="playerCard select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-red-600 underline text-center text-[4vh] absolute top-[87%] left-[44%]"></div>
      <div class="playerCard select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-red-600 underline text-center text-[4vh] absolute top-[87%] left-[50%]"></div>
      <div class="dealer select-none font-sans font-medium rounded-[50%] border-[0.2vh] border-black border-solid bg-white h-[4%] w-[4%] text-[2vh] text-center absolute top-[86%] left-[65%] hidden">D</div>
      <div class="smblind rounded-[50%] border-[0.2vh] border-black border-solid bg-blue-600 absolute top-[86%] left-[60%] select-none font-sans font-medium text-center h-[4%] w-[4%] text-[2vh] hidden">S</div>
      <div class="bigblind rounded-[50%] border-[0.2vh] border-black border-solid bg-red-600 absolute top-[86%] left-[60%] select-none font-sans font-medium text-center h-[4%] w-[4%] text-[2vh] hidden">B</div>
      <div class="playerCard select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-red-600 underline text-center text-[4vh] absolute rotate-90 top-[80%] left-[6%]"></div>
      <div class="playerCard select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-red-600 underline text-center text-[4vh] absolute rotate-90 top-[74%] left-[6%]"></div>
      <div class="dealer select-none font-sans font-medium rounded-[50%] border-[0.2vh] border-black border-solid text-center bg-white h-[4%] w-[4%] text-[2vh] absolute rotate-90 top-[65%] left-[6%] hidden">D</div>
      <div class="smblind rounded-[50%] border-[0.2vh] border-black border-solid bg-blue-600 absolute rotate-90 top-[65%] left-[6%] select-none font-sans font-medium text-center h-[4%] w-[4%] text-[2vh] hidden">S</div>
      <div class="bigblind rounded-[50%] border-[0.2vh] border-black border-solid bg-red-600 absolute rotate-90 top-[65%] left-[6%] select-none font-sans font-medium text-center h-[4%] w-[4%] text-[2vh] hidden">B</div>
      <div class="playerCard select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-red-600 underline text-center text-[4vh] absolute rotate-90 bottom-[80%] left-[6%]"></div>
      <div class="playerCard select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-red-600 underline text-center text-[4vh] absolute rotate-90 bottom-[74%] left-[6%]"></div>
      <div class="dealer select-none font-sans font-medium rounded-[50%] border-[0.2vh] border-black border-solid text-center bg-white h-[4%] w-[4%] text-[2vh] absolute rotate-90 bottom-[65%] left-[6%] hidden">D</div>
      <div class="smblind rounded-[50%] border-[0.2vh] border-black border-solid bg-blue-600 absolute rotate-90 bottom-[65%] left-[6%] select-none font-sans font-medium text-center h-[4%] w-[4%] text-[2vh] hidden">S</div>
      <div class="bigblind rounded-[50%] border-[0.2vh] border-black border-solid bg-red-600 absolute rotate-90 bottom-[65%] left-[6%] select-none font-sans font-medium text-center h-[4%] w-[4%] text-[2vh] hidden">B</div>
      <div class="playerCard select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-red-600 underline text-center text-[4vh] absolute bottom-[87%] left-[44%]"></div>
      <div class="playerCard select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-red-600 underline text-center text-[4vh] absolute bottom-[87%] left-[50%]"></div>
      <div class="dealer select-none font-sans font-medium rounded-[50%] border-[0.2vh] border-black border-solid text-center bg-white h-[4%] w-[4%] text-[2vh]  absolute rotate-180 bottom-[86%] right-[65%] hidden">D</div>
      <div class="smblind rounded-[50%] border-[0.2vh] border-black border-solid bg-blue-600 absolute rotate-180 bottom-[90%] left-[35%] select-none font-sans font-medium text-center h-[4%] w-[4%] text-[2vh] hidden">S</div>
      <div class="bigblind rounded-[50%] border-[0.2vh] border-black border-solid bg-red-600 absolute rotate-180 bottom-[90%] left-[35%] select-none font-sans font-medium text-center h-[4%] w-[4%] text-[2vh] hidden">B</div>
      <div class="playerCard select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-red-600 underline text-center text-[4vh] absolute -rotate-90 bottom-[80%] right-[6%]"></div>
      <div class="playerCard select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-red-600 underline text-center text-[4vh] absolute -rotate-90 bottom-[74%] right-[6%]"></div>
      <div class="dealer select-none font-sans font-medium rounded-[50%] border-[0.2vh] border-black border-solid text-center bg-white h-[4%] w-[4%] text-[2vh]  absolute -rotate-90 bottom-[65%] right-[6%] hidden">D</div>
      <div class="smblind rounded-[50%] border-[0.2vh] border-black border-solid bg-blue-600 absolute -rotate-90 bottom-[65%] right-[6%] select-none font-sans font-medium text-center h-[4%] w-[4%] text-[2vh] hidden">S</div>
      <div class="bigblind rounded-[50%] border-[0.2vh] border-black border-solid bg-red-600 absolute -rotate-90 bottom-[65%] right-[6%] select-none font-sans font-medium text-center h-[4%] w-[4%] text-[2vh] hidden">B</div>
      <div class="playerCard select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-red-600 underline text-center text-[4vh] absolute -rotate-90 top-[80%] right-[6%]"></div>
      <div class="playerCard select-none font-sans font-medium h-[8%] w-[6%] rounded-sm border-[0.2vh] border-black border-solid bg-red-600 underline text-center text-[4vh] absolute -rotate-90 top-[74%] right-[6%]"></div>
      <div class="dealer select-none font-sans font-medium rounded-[50%] border-[0.2vh] border-black border-solid text-center bg-white h-[4%] w-[4%] text-[2vh]  absolute -rotate-90 top-[65%] right-[6%] hidden">D</div>
      <div class="smblind rounded-[50%] border-[0.2vh] border-black border-solid bg-blue-600 absolute -rotate-90 top-[65%] right-[6%] select-none font-sans font-medium text-center h-[4%] w-[4%] text-[2vh] hidden">S</div>
      <div class="bigblind rounded-[50%] border-[0.2vh] border-black border-solid bg-red-600 absolute -rotate-90 top-[65%] right-[6%] select-none font-sans font-medium text-center h-[4%] w-[4%] text-[2vh] hidden">B</div>
      <div class="absolute bottom-[-12%] left-[50%] translate-x-[-50%] w-[12%] h-[12%]">
          <img src="/img/user.png" alt="" class="playerAvatar absolute h-full w-full bg-white rounded-full">
          <div class="absolute bottom-[-20%] left-[50%] px-[1vh] translate-x-[-50%] text-[2vh] inline-block bg-yellow-200 border-[0.3vh] border-black border-solid rounded-[1.8vh]">{{ state.stackList[0] }}.0$ </div>
          <div class="absolute top-[-20%] left-[50%] px-[1vh] translate-x-[-50%] text-[1.8vh] inline-block bg-[#c5bf8b] border-[0.3vh] border-black border-solid rounded-[1.8vh]">You</div>
          <div class="left-[50%] top-[-13.5vh] px-[1vh] translate-x-[-50%] text-[1.8vh] inline-block bg-yellow-200 border-[0.3vh] border-black border-solid rounded-[1.8vh] absolute">{{ state.betTotalList[0] }}.0$</div>
          <div @click="this.checkButtonClick" class="right-[-200%] h-[72%] text-[2.2vh] absolute p-[1.5vh] hidden bg-red-500 rounded-[1vh] border-[0.2vh] border-solid border-black hover:bg-black hover:text-red-500 hover:translate-y-[-0.3vh] transition-all check">Check</div>
          <div @click="this.foldButtonClick" class="right-[-120%] h-[72%] text-[2.2vh] absolute p-[1.5vh] hidden bg-red-500 rounded-[1vh] border-[0.2vh] border-solid border-black hover:bg-black hover:text-red-500 hover:translate-y-[-0.3vh] transition-all fold">Fold</div>
          <div @click="this.callButtonClick" class="right-[-200%] h-[72%] text-[2.2vh] absolute p-[1.5vh] hidden bg-yellow-500 rounded-[1vh] border-[0.2vh] border-solid border-black hover:bg-black hover:text-yellow-500 hover:translate-y-[-0.3vh] transition-all call">Call</div>
          <input @keyup="this.inputCheck" type="text" class="right-[-300%] h-[72%] w-[90%] absolute hidden p-[1vh] bg-green-950 text-white text-[2vh] rounded-[1vh] border-[0.2vh] border-solid border-black hover:bg-black hover:text-green-500 hover:translate-y-[-2px] transition-all raise" placeholder="Raise">
      </div>
      <div class="absolute bottom-[13%] left-[-12%] h-[12%] w-[12%]">
          <img src="/img/user.png" alt="" class="playerAvatar h-full w-full absolute bg-white rounded-[50%]">
          <div class="absolute bottom-[-20%] left-[50%] px-[1vh] translate-x-[-50%] text-[2vh] inline-block bg-yellow-200 border-[0.3vh] border-black border-solid rounded-[1.8vh]">{{ state.stackList[1] }}.0$</div>
          <div class="absolute top-[-20%] left-[50%] px-[1vh] translate-x-[-50%] text-[1.8vh] inline-block bg-[#c5bf8b] border-[0.3vh] border-black border-solid rounded-[1.8vh] whitespace-nowrap">{{ state.botTitle[1] }}</div>
          <div class="top-[50%] right-[-12vh] h-[3.3vh] rotate-90 px-[1vh] translate-y-[-50%] translate-x-[50%] text-[1.8vh] inline-block bg-yellow-200 border-[0.3vh] border-black border-solid rounded-[1.8vh] absolute">{{ state.betTotalList[1] }}.0$</div>
      </div>
      <div class="absolute top-[13%] left-[-12%] h-[12%] w-[12%]">
          <img src="/img/user.png" alt="" class="playerAvatar h-full w-full absolute bg-white rounded-[50%]">
          <div class="absolute bottom-[-20%] left-[50%] px-[1vh] translate-x-[-50%] text-[2vh] inline-block bg-yellow-200 border-[0.3vh] border-black border-solid rounded-[1.8vh]">{{ state.stackList[2] }}.0$</div>
          <div class="absolute top-[-20%] left-[50%] px-[1vh] translate-x-[-50%] text-[1.8vh] inline-block bg-[#c5bf8b] border-[0.3vh] border-black border-solid rounded-[1.8vh] whitespace-nowrap">{{ state.botTitle[2] }}</div>
          <div class="top-[50%] right-[-12vh] h-[3.3vh] rotate-90 px-[1vh] translate-y-[-50%] translate-x-[50%] text-[1.8vh] inline-block bg-yellow-200 border-[0.3vh] border-black border-solid rounded-[1.8vh] absolute">{{ state.betTotalList[2] }}.0$</div>
      </div>
      <div class="absolute top-[-12%] left-[50%] translate-x-[-50%] h-[12%] w-[12%]">
          <img src="/img/user.png" alt="" class="playerAvatar h-full w-full absolute bg-white rounded-[50%]">
          <div class="absolute bottom-[-20%] left-[50%] px-[1vh] translate-x-[-50%] text-[2vh] inline-block bg-yellow-200 border-[0.3vh] border-black border-solid rounded-[1.8vh]">{{ state.stackList[3] }}.0$</div>
          <div class="absolute top-[-20%] left-[50%] px-[1vh] translate-x-[-50%] text-[1.8vh] inline-block bg-[#c5bf8b] border-[0.3vh] border-black border-solid rounded-[1.8vh] whitespace-nowrap">{{ state.botTitle[3] }}</div>
          <div class="left-[50%] bottom-[-15vh] px-[1vh] translate-x-[-50%] translate-y-[-50%] text-[1.8vh] inline-block bg-yellow-200 border-[0.3vh] border-black border-solid rounded-[1.8vh] absolute">{{ state.betTotalList[3] }}.0$</div>
      </div>
      <div class="absolute top-[13%] right-[-12%] h-[12%] w-[12%]">
          <img src="/img/user.png" alt="" class="playerAvatar h-full w-full absolute bg-white rounded-[50%]">
          <div class="absolute bottom-[-20%] left-[50%] px-[1vh] translate-x-[-50%] text-[2vh] inline-block bg-yellow-200 border-[0.3vh] border-black border-solid rounded-[1.8vh]">{{ state.stackList[4] }}.0$</div>
          <div class="absolute top-[-20%] left-[50%] px-[1vh] translate-x-[-50%] text-[1.8vh] inline-block bg-[#c5bf8b] border-[0.3vh] border-black border-solid rounded-[1.8vh] whitespace-nowrap">{{ state.botTitle[4] }}</div>
          <div class="top-[50%] left-[-12vh] -rotate-90 px-[1vh] translate-y-[-50%] translate-x-[-50%] text-[1.8vh] inline-block bg-yellow-200 border-[0.3vh] border-black border-solid rounded-[1.8vh] absolute">{{ state.betTotalList[4] }}.0$</div>
      </div>
      <div class="absolute bottom-[13%] right-[-12%] h-[12%] w-[12%]">
          <img src="/img/user.png" alt="" class="playerAvatar h-full w-full absolute bg-white rounded-[50%]">
          <div class="absolute bottom-[-20%] left-[50%] px-[1vh] translate-x-[-50%] text-[2vh] inline-block bg-yellow-200 border-[0.3vh] border-black border-solid rounded-[1.8vh]">{{ state.stackList[5] }}.0$</div>
          <div class="absolute top-[-20%] left-[50%] px-[1vh] translate-x-[-50%] text-[1.8vh] inline-block bg-[#c5bf8b] border-[0.3vh] border-black border-solid rounded-[1.8vh] whitespace-nowrap">{{ state.botTitle[5] }}</div>
          <div class="top-[50%] left-[-12vh] -rotate-90 px-[1vh] translate-y-[-50%] translate-x-[-50%] text-[1.8vh] inline-block bg-yellow-200 border-[0.3vh] border-black border-solid rounded-[1.8vh] absolute">{{ state.betTotalList[5] }}.0$</div>
      </div>
      <div class="left-[50%] top-[43%] px-[1vh] translate-x-[-50%] text-[2vh] inline-block bg-yellow-200 border-[0.3vh] border-black border-solid rounded-[1.8vh] absolute">Pot: {{ state.pot }}.0$</div>
      </div>   
  </div>
  <BetTableComponentsGameHistory/>
  <BetTableComponentsGameLogic v-if="state.startGame"/>
</template>


<script>
import { state } from '../store/dataStore';
export default {
    setup() {
        return {
            state,
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