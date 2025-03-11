import { reactive } from 'vue'

export const style = reactive({
    card: 'select-none font-sans font-medium rounded-sm absolute',
    blindText: 'absolute left-[50%] translate-x-[-50%] text-black text-[4vw] md:text-[2vh] top-[50%] translate-y-[-50%]',
    blindDiv: 'h-[5vw] md:h-[3vh] w-[5vw] md:w-[3vh] rounded-full absolute left-[20%] top-[10%] border-solid border-black border-[0.1vw] hidden',
    playerAreaDirection: ['rotate-0', 'rotate-90', 'rotate-90', 'rotate-180', '-rotate-90', '-rotate-90'],
    playerAreaXPosition: ['left-[25%]', 'left-[-12.5%]', 'left-[-12.5%]', 'left-[25%]', 'right-[62.5%]', 'right-[62.5%]'],
    playerAreaYPosition: ['top-75', 'top-[62.5%]', 'top-[12.5%]', 'top-0', 'top-[12.5%]', 'top-[62.5%]'],
    chipDisplay: 'px-[2vw] md:px-[2vh] translate-x-[-50%] text-[3vw] md:text-[1.5vh] inline-block bg-blue-200 text-black border-[0.5vw] md:border-[0.3vh] border-neutral border-solid rounded-[3.6vw]',
    border: 'border-[0.3vh] border-white',
    button: 'border-none bg-blue-500 hover:bg-blue-600 text-white h-full w-[30%] mt-[1vw] md:mt-[0.5vh] absolute',
    communityCardsXPos: [30, 38, 46, 54, 62, 70],
    communityCardsYPos: 44,
    playerCardsRotage: [0, 90, 90, 180, -90, -90],
    playerCardsPos: [[28, 86.5, 36, 86.5], [3.5, 51, 3.5, 59], [3.5, 1, 3.5, 9], [56, 1.5, 64, 1.5], [88.5, 37, 88.5, 29], [88.5, 87, 88.5, 79]],
    stackPos: [[75, 138], [-38, 125], [-38, 25], [25, -38], [138, -25], [138, 75]],
})
