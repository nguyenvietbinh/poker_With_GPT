import { funcStore } from "./serverFuncStore";
export default defineEventHandler(async (event) => {
    const req = await readBody(event);
    const betTableState = req.message
    try {
        const { getPlayerWinRate } = funcStore(betTableState)
        const hand = [betTableState.cards[0], betTableState.cards[1]]
        const n = betTableState.numberOfPlayer + betTableState.numberOfAllinPlayer
        const winRate = getPlayerWinRate(hand , betTableState.communityCards, n)
        return winRate
    } catch (error) {
        console.error(error);
        return { error: error };
    }
});