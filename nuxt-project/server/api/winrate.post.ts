import { useMyServerFunc } from "./serverFuncStore";
import { sharedState } from "./utils/state";
const { blabla } = useMyServerFunc()
export default defineEventHandler(async (event) => {
    const res = await readBody(event);
    try {
        let a = blabla()
        return a
    } catch (error) {
        console.error(error);
        return { error: error };
    }
});