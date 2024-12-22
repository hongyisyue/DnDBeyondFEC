import { useState } from "react";
import { pathBuilder } from "../utils/helper";
import { TPointUpdate, TRune, TRunePath } from "../utils/types";
import Rune from "./Rune";

interface props {
    title: string, runes: TRune[],
    onPointUsage: (change: number) => boolean,
    remainPoint: number
}

function RunePath(props: props) {
    const onPointUpdate = props.onPointUsage;

    const [path, setPath] = useState<TRunePath>(pathBuilder(props.title, props.runes));

    function updatePath(updatedRune: TRune): void {
        setPath((currentPath) => {
            const newRunes = [...currentPath.runes];
            newRunes[updatedRune.index] = updatedRune;
            return {
                ...currentPath,
                runes: newRunes
            }
        });
    }

    function hanleLearning(change: TPointUpdate) {
        /**
         * this function only does the following things:
         * 1. update point usage
         * 2. update learnable of next rune
         */
        onPointUpdate(change.point_change);
        switch (change.point_change) {
            case -1:
                //learn a rune
                if (change.rune.next_rune) {
                    const updatedRune = { ...change.rune.next_rune, learnable: true };
                    change.rune.next_rune = updatedRune;
                    updatePath(updatedRune);
                }
                break;
            case 1:
                //unlearn a rune
                if (change.rune.next_rune) {
                    const updatedRune = { ...change.rune.next_rune, learnable: false };
                    change.rune.next_rune = updatedRune;
                    updatePath(updatedRune);
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
                                <Rune
                                    key={r.id}
                                    rune={r}
                                    onLearn={hanleLearning}
                                    remainPoints={props.remainPoint}
                                ></Rune>
                                <div className="connect-bar" key={`${r.id}-bar`}></div>
                            </>
                        )
                    } else {
                        return (
                            <Rune
                                key={r.id}
                                rune={r}
                                onLearn={hanleLearning}
                                remainPoints={props.remainPoint}
                            ></Rune>
                        )
                    }
                })}
            </div>
        </>
    )
}

export default RunePath;