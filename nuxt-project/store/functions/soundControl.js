import { Howl } from 'howler'
import { audio } from '../data/audioStore'
export function useSounds() {
    const defSoundVal = () => {
        audio.call1 = new Audio('/sounds/call1.mp3')
        audio.call2 = new Audio('/sounds/call2.mp3')
        audio.call3 = new Audio('/sounds/call3.mp3')
        audio.check1 = new Audio('/sounds/check3.mp3')
        audio.check2 = new Audio('/sounds/check3.mp3')
        audio.check3 = new Audio('/sounds/check3.mp3')
        audio.allIn = new Audio('/sounds/allin.mp3')
        audio.coinDropSound = new Howl({
            src: ['/sounds/coinsDrop.mp3'],
            autoplay: false,
            volume: 1.0
        })
        audio.foldingSound = new Howl({
            src: ['/sounds/foldingSound.mp3'],
            volume: 1.0
        })
    }
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
        defSoundVal,
    }
}