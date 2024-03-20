import { Card } from "./card";

export class Deck {
    constructor(
        public id_deck?: number,
        public id_user?: number,
        public indexDeck?: number,
        public nameDeck?: string,
        public id_photoDeck?: number,
        public share?: number, 
        public sumScores?: number,
        public nScores?: number
       ){}
}

// en realidad deberia ser el id_user, pero pongo name por ahora hasta BBDD
