<template>
    <div :class="`h-[50%] w-[50%] absolute top-[25%] left-[25%]`">
        <p v-if="state.loadingDone" @click="startCounting" class="text-black text-[3vw] md:text-[2.5vh] hover:underline cursor-pointer font-bold text-center whitespace-nowrap absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">Click here to play.</p>
        <p v-if="!state.loadingDone" class="text-black text-[3vw] md:text-[2.5vh] font-bold text-center whitespace-nowrap absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">loading...</p>
        <div v-if="counting && !state.startGame" class="text-black text-[20vw] md:text-[20vh] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">{{ count }}</div>
        <div v-if="state.startGame" :class="`absolute bottom-[30%] left-[50%] ${style.chipDisplay}`">Pot: {{ pot }}</div>
        <div v-if="state.startGame" class="inline-block relative left-[50%] translate-x-[-50%] top-[30%]">
            <div  v-for="n in 5" :key="n" :class="`h-auto w-[7.5vw] mx-[1px] inline-block md:w-[6.5vh] bottom-[50%] ${blabla[n - 1]}`">
                <img class="communityCards" src="~/public/img/cards/back.png" loading="lazy" alt="card">
            </div>
        </div>

    </div>
</template>


<script>
import { style } from '~/store/data/taildwindStyle';
import { state } from '~/store/data/betTableState';
import { audio } from '~/store/data/audioStore';
import { Howl } from 'howler'
export default {
    setup() {
        return {
            style,
            state,
            audio
        }
    },
    data() {
        return {
            count: 4,
            counting: false,
            pot: 0,
            blabla: ['left-[8%]', 'left-[25%]', 'left-[42%]', 'left-[59%]', 'left-[76%]'],
            bla: null
        }
    },
    mounted() {
        this.bla = document.querySelectorAll('.bla')
        watch(() => this.count, (newval, oldval) => {
            if (this.count !== 0) {
                setTimeout(() => {
                    this.count -= 1
                }, 1000);
            } else {
                state.startGame = true
            }
        })
        watch(() => state.pot, (newval, oldval) => {
            let currentValue = this.pot
            let targetValue = newval
            const step = Math.ceil((targetValue - currentValue) / 50)
            const interval = setInterval(() => {
                currentValue += step
                if (step >= 0) {
                    if (currentValue >= targetValue) {
                        currentValue = targetValue;
                        clearInterval(interval);
                    }
                } else {
                    if (currentValue <= targetValue) {
                        currentValue = targetValue;
                        clearInterval(interval);
                    }
                }
                this.pot = currentValue;
            }, 20)
        })
    },
    methods: {
        startCounting() {
            this.counting = true
            this.count -= 1
            event.target.style.display = 'none'
            this.createAudio()
        },
        createAudio() {
            audio.call1 = new Howl({
                src: ['/sounds/call1.mp3'],
                autoplay: false,
                volume: 1.0
            })
            audio.call2 = new Howl({
                src: ['/sounds/call2.mp3'],
                autoplay: false,
                volume: 1.0
            })
            audio.call3 = new Howl({
                src: ['/sounds/call3.mp3'],
                autoplay: false,
                volume: 1.0
            })
            audio.check1 = new Howl({
                src: ['/sounds/check1.mp3'],
                autoplay: false,
                volume: 1.0
            })
            audio.check2 = new Howl({
                src: ['/sounds/check2.mp3'],
                autoplay: false,
                volume: 1.0
            })
            audio.check3 = new Howl({
                src: ['/sounds/check3.mp3'],
                autoplay: false,
                volume: 1.0
            })
            audio.allIn = new Howl({
                src: ['/sounds/allin.mp3'],
                autoplay: false,
                volume: 1.0
            })
            audio.coinDrop = new Howl({
                src: ['/sounds/coinsDrop.mp3'],
                autoplay: false,
                volume: 1.0
            })
            audio.foldingSound = new Howl({
                src: ['/sounds/foldingSound.mp3'],
                volume: 1.0
            })
        }
    }
}
</script>