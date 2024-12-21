import { TPointUpdate, TRunePath } from "../utils/types";
import Rune from "./Rune";

function RunePath(props: { runePath: TRunePath, onPointUpdate: (change: number) => number }) {
    const onPointUpdate = props.onPointUpdate;
    const path = props.runePath

    function hanleLearning(change: TPointUpdate) {
        /**
         * hanle learning rune should do the following things:
         * 1. update point usage
         * 2. update learnable of next rune
         */
        const remainPoint = onPointUpdate(change.point_change);
        switch (change.point_change) {
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

    return (
        <>
            <div className="row">
                <div className="col-3 title">
                    {path.title}
                </div>
                <div className="col-9">

                </div>
            </div>
            {path.runes.map(r => {
                if (r.next_rune) {
                    return (
                        <>
                            <Rune rune={r} onLearn={hanleLearning}></Rune>
                            <div className="connect-bar"></div>
                        </>
                    )
                } else {
                    return (
                        <Rune rune={r} onLearn={hanleLearning}></Rune>
                    )
                }
            })}
        </>
    )
}

export default RunePath;