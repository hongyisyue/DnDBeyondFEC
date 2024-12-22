import { useState } from "react";
import { pathBuilder } from "../utils/helper";
import { TPointUpdate, TRune, TRunePath } from "../utils/types";
import Rune from "./Rune";

function RunePath(props: { title: string, runes: TRune[], onPointUpdate: (change: number) => number }) {
    const onPointUpdate = props.onPointUpdate;

    const [path, setPath] = useState<TRunePath>(pathBuilder(props.title, props.runes));

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
                if (change.rune.next_rune && remainPoint > 0) {

                    const updatedRune = { ...change.rune.next_rune, learnable: true }; // Create a new object
                    change.rune.next_rune = updatedRune; // Update reference
                    setPath((currentPath) => {
                        const newRunes = [...currentPath.runes];
                        newRunes[updatedRune.index] = updatedRune;
                        return {
                            ...currentPath,
                            runes: newRunes
                        }
                    });
                }
                break;
            case 1:
                //unlearn a rune
                if (change.rune.next_rune) {
                    const updatedRune = { ...change.rune.next_rune, learnable: false };
                    change.rune.next_rune = updatedRune;
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
                {path.runes.map(r => {
                    if (r.next_rune) {
                        return (
                            <>
                                <Rune key={r.id} rune={r} onLearn={hanleLearning}></Rune>
                                <div className="connect-bar"></div>
                            </>
                        )
                    } else {
                        return (
                            <Rune rune={r} onLearn={hanleLearning}></Rune>
                        )
                    }
                })}
            </div>
        </>
    )
}

export default RunePath;