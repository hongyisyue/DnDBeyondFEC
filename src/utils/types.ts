
export type TRune = {
    id: string;
    img: string;
    //cost of points to learn this rune
    cost: number;
    //the id of pre-request rune of this rune, if there is any 
    prereq_id?: string
}

export type TRunePath = {
    id: string;
    runes: TRune[];
}