import { MouseEvent, useState } from "react";
import { TPointUpdate, TRune } from "../utils/types";

interface props {
    rune: TRune,
    remainPoints: number,
    onLearn: (change: TPointUpdate) => void
}

function Rune(props: props) {
    const rune = props.rune;
    const remainPoints = props.remainPoints;
    const onLearn = props.onLearn;

    const [learned, setLearned] = useState(rune.learned);
    const [hover, setHover] = useState(false);

    function handleClick(event: MouseEvent) {
        switch(event.button) {
            case 0:
                //left click to learn
                if (rune.learnable && !rune.learned && remainPoints > 0) {
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
            <div className={`rune ${learned ? "learned" : ""} ${hover && rune.learnable && !rune.learned && remainPoints > 0 ? "learned" : ""}`}>
                <img
                    src={learned || hover ? rune.img_active : rune.img_deactive}
                    onClick={(e) => handleClick(e)}
                    onContextMenu={(e) => handleClick(e)}
                    onMouseEnter={(e) => setHover(true)}
                    onMouseLeave={(e) => setHover(false)}
                />
            </div>
        </>
    )
}

export default Rune;