<template>
    <div  :style="{ width: `${state.historyBarWith}px` }" class="h-full bg-slate-400 absolute right-0 top-0">
        <div @mousedown="mouseDown" class="resizehandler h-full w-[5px] bg-black absolute left-0 cursor-ew-resize"></div>
        <p class="absolute text-center left-[50%] translate-x-[-50%]">Game history.</p>
    </div>
</template>


<script>
import { state } from '../../store/dataStore';
export default{
    setup() {
        return {
            state
        }
    },
    data() {
        return {
            startDrag: false,
            startX: 0,
            startBarWith: 0,
        }
    },
    mounted() {
        
    },
    methods: {
        mouseDown(event) {
            console.log(state.historyBarWith)
            this.startX = event.clientX
            this.startBarWith = state.historyBarWith
            document.addEventListener('mousemove', this.mouseMove)
            document.addEventListener('mouseup', this.mouseUp)
        },
        mouseMove(event) {
            if ((state.historyBarWith >= 5) && (state.historyBarWith <= 500)) {
                console.log(this.startX, event.clientX)
                state.historyBarWith = this.startBarWith - (event.clientX - this.startX)
            } else {
                this.mouseUp()
                if (state.historyBarWith < 5) {
                    state.historyBarWith = 5
                } else if (state.historyBarWith > 500) {
                    state.historyBarWith = 500
                }
            }
        },
        mouseUp() {
            if (state.historyBarWith < 5) {
                state.historyBarWith = 5
            } else if (state.historyBarWith > 500) {
                state.historyBarWith = 500
            }  
            document.removeEventListener('mousemove', this.mouseMove)
            document.removeEventListener('mouseup', this.mouseUp)
        }
    }
}
</script>