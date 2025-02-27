import { funcStore } from "./serverFuncStore";
export default defineEventHandler(async (event) => {
    const req = await readBody(event);
    const betTableState = req.message
    try {
        const { getPlayerWinRate } = funcStore(betTableState)
        const winRate = getPlayerWinRate([betTableState.cards[0], betTableState.cards[1]], betTableState.communityCards, betTableState.numberOfPlayer)
        
        return winRate
    } catch (error) {
        console.error(error);
        return { error: error };
    }
});