import { funcStore } from "./serverFuncStore";
export default defineEventHandler(async (event) => {
    const req = await readBody(event);
    const hands = req.message[0]
    const betTableState = req.message[1]
    try {
        const { getAllInWinRate } = funcStore(betTableState)
        const winRate = getAllInWinRate(hands , betTableState.communityCards)
        return winRate
    } catch (error) {
        console.error(error);
        return { error: error };
    }
});