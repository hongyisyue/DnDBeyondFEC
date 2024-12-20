import { TPointUpdate, TRune, TRunePath } from "../utils/types";

function RunePath(runes: TRune[], onPointUpdate: (change: number) => number) {
    function hanleLearning(change: TPointUpdate) {
        /**
         * hanle learning rune should do the following things:
         * 1. update point usage
         * 2. update learnable of next rune
         */
        const remainPoint = onPointUpdate(change.point_change);
        switch(change.point_change) {
            case -1:
                //learn a rune
                if (change.rune.next_rune && remainPoint > 1) {
                    change.rune.next_rune.learnable = true;
                }
                break;
            case 1:
                //unlearn a rune
                if (change.rune.next_rune) {
                    change.rune.next_rune.learnable = false;
                }
                break;

        }
    }
}