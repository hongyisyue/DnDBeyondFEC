import { useState } from "react";
import { TRune } from '../utils/types'
import deck_img_b from '../assets/deck_icon-bright.png'
import deck_img_d from '../assets/deck_icon-dark.png'
import fork_img_b from '../assets/fork_icon-bright.png'
import fork_img_d from '../assets/fork_icon-dark.png'
import cake_img_b from '../assets/cake_icon-bright.png'
import cake_img_d from '../assets/cake_icon-dark.png'
import crown_img_b from '../assets/crown_icon-bright.png'
import crown_img_d from '../assets/crown_icon-dark.png'
import cruise_img_d from '../assets/cruise_icon-dark.png'
import cruise_img_b from '../assets/cruise_icon-bright.png'
import snorkel_img_d from '../assets/snorkel_icon-dark.png'
import snorkel_img_b from '../assets/snorkel_icon-bright.png'
import thunder_img_d from '../assets/thunder_icon-dark.png'
import thunder_img_b from '../assets/thunder_icon-bright.png'
import skeleton_img_d from '../assets/skeleton_icon-dark.png'
import skeleton_img_b from '../assets/skeleton_icon-bright.png'
import RunePath from '../components/RunePath'

const totalPoints: Readonly<number> = 6;

function Calculator() {
    const deck: TRune = {
        id: '1',
        index: 0,
        img_active: deck_img_b,
        img_deactive: deck_img_d,
        learnable: false,
        learned: false,
    }
    const fork: TRune = {
        id: '2',
        index: 0,
        img_active: fork_img_b,
        img_deactive: fork_img_d,
        learnable: false,
        learned: false,
    }
    const cake: TRune = {
        id: '3',
        index: 0,
        img_active: cake_img_b,
        img_deactive: cake_img_d,
        learnable: false,
        learned: false,
    }
    const crown: TRune = {
        id: '4',
        index: 0,
        img_active: crown_img_b,
        img_deactive: crown_img_d,
        learnable: false,
        learned: false,
    }
    const cruise: TRune = {
        id: '5',
        index: 0,
        img_active: cruise_img_b,
        img_deactive: cruise_img_d,
        learnable: false,
        learned: false,
    }
    const snorkel: TRune = {
        id: '6',
        index: 0,
        img_active: snorkel_img_b,
        img_deactive: snorkel_img_d,
        learnable: false,
        learned: false,
    }
    const thunder: TRune = {
        id: '7',
        index: 0,
        img_active: thunder_img_b,
        img_deactive: thunder_img_d,
        learnable: false,
        learned: false,
    }
    const skeleton: TRune = {
        id: '8',
        index: 0,
        img_active: skeleton_img_b,
        img_deactive: skeleton_img_d,
        learnable: false,
        learned: false,
    }

    const [points, setPoints] = useState(totalPoints);
    function onPointUsage(change: number): boolean {
        setPoints((prevPoints) => (prevPoints + change) <= 0 ? 0 : prevPoints + change);
        return (points + change) <= 0 ? false : true;
    }

    return (
        <>
            <div className="calculator">
                <div className="row big-title">
                    TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000
                </div>
                <div className="row">
                    <div className="col-9">
                        <div className="row">
                            <RunePath
                                title='TALENT PATH 1'
                                runes={[deck, fork, cake, crown]}
                                onPointUsage={onPointUsage}
                                remainPoint={points}
                            >
                            </RunePath>

                        </div>
                        <div className="row">
                            <RunePath
                                title='TALENT PATH 2'
                                runes={[cruise, snorkel, thunder, skeleton]}
                                onPointUsage={onPointUsage}
                                remainPoint={points}
                            >
                            </RunePath>
                        </div>
                    </div>
                    <div className="col-3 point-session">
                        <div>{`${totalPoints - points} / ${totalPoints}`}</div>
                        <div className='point-spent'>Points Spent</div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Calculator;