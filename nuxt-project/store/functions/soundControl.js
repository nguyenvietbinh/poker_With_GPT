import { Howl } from 'howler'
export function useSounds() {
    const call1 = new Audio('/sounds/call1.mp3')
    const call2 = new Audio('/sounds/call2.mp3')
    const call3 = new Audio('/sounds/call3.mp3')
    const playFoldingSound = () => {  
        const foldingSound = new Howl({
            src: ['/sounds/foldingSound.mp3'],
            volume: 1.0
        })
        foldingSound.play()
    }
    const playCallSound = () => {
        let a = Math.floor(Math.random() * 3)
        if (a === 0) {
            call1.play()
        } else if (a === 1) {
            call2.play()
        } else {
            call3.play()
        }
    }
    return {
        playFoldingSound,
        playCallSound,
    }
}