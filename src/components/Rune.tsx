import { MouseEvent, useState } from "react";
import { TPointUpdate, TRune } from "../utils/types";

function Rune(rune: TRune, onLearn: (change: TPointUpdate) => any) {
    const [learned, setLearned] = useState(rune.learned);

    function handleClick(event: MouseEvent) {
        switch(event.button) {
            case 0:
                //left click to learn
                if (rune.learnable && !rune.learned) {
                    setLearned(true);
                    rune.learned = true;
                    onLearn({
                        rune: rune,
                        point_change: -1
                    });
                }
                break;
            case 2: 
                //right click to unlearn
                //note: 
                // 1. if the rune has not been learned, unlearn is not allowed
                // 2. if the next rune has been learned, unlearn is not allowed
                if (rune.learned) {
                    if (rune.next_rune?.learned) {
                        break;
                    } else {
                        setLearned(false);
                        rune.learned = false;
                        onLearn({
                            rune: rune,
                            point_change: 1
                        });
                    }
                }
                break;
        }
    }
}