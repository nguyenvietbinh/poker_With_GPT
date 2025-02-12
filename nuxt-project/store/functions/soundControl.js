import { Howl } from 'howler'
import { audio } from '../data/audioStore'
export function useSounds() {

    const playCoinDrop = () => {
        audio.coinDropSound.play()
    }
    const stopCoinDrop = () => {
        audio.coinDropSound.stop()
    }
    const playFoldingSound = () => {  
        audio.foldingSound.play()
    }
    const playAllInSound = () => {
        audio.allIn.play()
    }
    const playCallSound = () => {
        let a = Math.floor(Math.random() * 3)
        if (a === 0) {
           audio.call1.play()
        } else if (a === 1) {
            audio.call2.play()
        } else {
            audio.call3.play()
        }
    }
    const playCheckSound = () => {
        let a = Math.floor(Math.random() * 3)
        if (a === 0) {
            audio.check1.play()
        } else if (a === 1) {
            audio.check2.play()
        } else {
            audio.check3.play()
        }
    }
    return {
        playFoldingSound,
        playCallSound,
        playAllInSound,
        playCheckSound,
        playCoinDrop,
        stopCoinDrop,
    }
}