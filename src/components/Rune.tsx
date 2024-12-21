import { MouseEvent, useState } from "react";
import { TPointUpdate, TRune } from "../utils/types";

function Rune(props: {rune: TRune, onLearn: (change: TPointUpdate) => void}) {
    const rune = props.rune;
    const onLearn = props.onLearn;

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
                    } as TPointUpdate);
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
                        } as TPointUpdate);
                    }
                }
                break;
        }
    }

    return (
        <>
            <div className="rune">
                <img
                    src={learned ? rune.img_active : rune.img_deactive}
                    onClick={(e) => handleClick(e)}    
                />
            </div>
        </>
    )
}

export default Rune;