import { TRune, TRunePath } from "./types";

export function pathBuilder(title: string, runes: TRune[]): TRunePath {
    /**
     * 1. the order of runes matters,
     * the order of the rune path is the order of the passed in array of Runes
     * 2. the id of the RunePath depends on the order of the passed in array (so that it can be unique but not random)
     */
    if (runes?.length > 0) {
        //set up the first rune
        let pathId = `p${runes[0].id}`;
        const pathRunes = [runes[0]];
        runes[0].learnable = true;
        runes[0].index = 0;

        //connect the rest of the rune
        for (let i=1; i<runes.length; i++) {
            pathId += `-${runes[i].id}`;
            runes[i].prereq_rune = runes[i-1];
            runes[i].index = i;
            runes[i-1].next_rune = runes[i];
            pathRunes.push(runes[i]);
        }

        return {
            title: title,
            id: pathId,
            runes: pathRunes
        } as TRunePath
    } else {
        throw new Error("input array is empty");
    }
}