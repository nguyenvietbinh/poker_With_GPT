import { svBetTbState } from "./utils/betTableState";
export default defineEventHandler(async (event) => {
    const res = await readBody(event);
    try {
        Object.assign(svBetTbState, res)
    } catch (error) {
        console.error(error);
        return { error: error };
    }
});