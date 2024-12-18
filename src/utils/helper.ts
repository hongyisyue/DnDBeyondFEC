import { TRune, TRunePath } from "./types";

export function pathBuilder(runes: TRune[]): TRunePath {
    /**
     * 1. the order of runes matters,
     * the order of the rune path is the order of the passed in array of Runes
     * 2. the id of the RunePath depends on the order of the passed in array (so that it can be unique but not random)
     */
    if (runes?.length > 0) {
        let pathId = `p${runes[0].id}`;
        const pathRunes = [runes[0]];

        for (let i=1; i<runes.length; i++) {
            pathId += `-${runes[i].id}`;
            runes[i].prereq_id = runes[i-1].id;
            pathRunes.push(runes[i]);
        }
        return {
            id: pathId,
            runes: pathRunes
        } as TRunePath
    } else {
        throw new Error("input array is empty");
    }
}