import { useMyHandLvFunc } from "~/store/functions/handLvFuncStore";
import { state } from "~/store/data/dataStore";
export default defineEventHandler(async (event) => {
    const res = await readBody(event);
    const { genRandomCase } = useMyHandLvFunc()
    const { handRanking } = useMyHandLvFunc()
    const hand = res[0]
    const communityCards = res[1]
    const n = res[2]
    try {
        let win = 0
        if ((!state.playerStatus[0]) && (!state.allin[0])) {
            return 0
        }
        for (let i = 0; i < 1000; i ++) {
            let hands = genRandomCase(hand, communityCards, n)
            if (hands.length === 1) {
                return 100
            } else {
                let winner = handRanking(hands)
                if (winner.includes(hands[0])) {
                    win ++
                }
            }
        }
        return Math.round(win/10)
    } catch (error) {
        console.error(error);
        return { error: error };
    }
});