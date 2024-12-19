
export type TRune = {
    /**
     * TRune is like a double linked list with other properties we need.
     * reason:
     * we need 'prereq_id' to determind 'learnable' and when unlearn happens
     * we need 'next_rune_id' for effiency update
     */
    id: string;
    img: string;
    learnable: boolean;
    learned: boolean;
    //id of pre-request rune of this rune, if there is any 
    prereq_rune?: TRune;
    //id of next rune, if there is any
    next_rune?: TRune
}

export type TPointUpdate = {
    /**
     * communication interface to update rune statusand points
     */
    rune: TRune;
    point_change: number;
}

export type TRunePath = {
    id: string;
    runes: TRune[];
}