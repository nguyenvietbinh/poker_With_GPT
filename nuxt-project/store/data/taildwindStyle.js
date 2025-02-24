import { reactive } from 'vue'

export const style = reactive({
    card: 'select-none font-sans font-medium rounded-sm absolute',
    commmunityCardXPosition: ['left-[20%]', 'left-[34%]', 'left-[44%]', 'left-[56%]', 'left-[68%]'],
    blindText: 'absolute left-[50%] translate-x-[-50%] text-black text-[4vw] md:text-[2vh] top-[50%] translate-y-[-50%]',
    blindDiv: 'h-[5vw] md:h-[3vh] w-[5vw] md:w-[3vh] rounded-full absolute left-[20%] top-[10%] border-solid border-black border-[0.1vw] hidden',
    playerAreaDirection: ['rotate-0', 'rotate-90', 'rotate-90', 'rotate-180', '-rotate-90', '-rotate-90'],
    playerAreaXPosition: ['left-[25%]', 'left-[-12.5%]', 'left-[-12.5%]', 'left-[25%]', 'right-[-12.5%]', 'right-[-12.5%]'],
    playerAreaYPosition: ['bottom-0', 'bottom-[12.5%]', 'top-[12.5%]', 'top-0', 'top-[12.5%]', 'bottom-[12.5%]'],
    chipDisplay: 'px-[2vw] md:px-[2vh] translate-x-[-50%] text-[3vw] md:text-[1.5vh] inline-block bg-blue-200 text-black border-[0.5vw] md:border-[0.3vh] border-neutral border-solid rounded-[3.6vw]',
    border: 'border-[0.3vh] border-white',
    button: 'border-none bg-blue-500 hover:bg-blue-600 text-white h-full w-[30%] mt-[1vw] md:mt-[0.5vh] absolute'
})
