import { MouseEvent, useState } from "react";
import { TPointUpdate, TRune } from "../utils/types";

function Rune(rune: TRune, onLearn: (change: TPointUpdate) => any) {
    const [learned, setLearned] = useState(false);

    function handleClick(event: MouseEvent) {
        switch(event.button) {
            case 0:
                //left click
                if (rune.learnable && !rune.learned) {
                    setLearned(true);
                    onLearn({
                        rune: rune,
                        point_change: -1
                    });
                }
                break;
            case 2: 
                //right click
                if (rune.learned) {
                    setLearned(false);
                    onLearn({
                        rune: rune,
                        point_change: 1
                    });
                }
                break;
        }
    }
}