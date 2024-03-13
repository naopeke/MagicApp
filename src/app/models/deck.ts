import { Card } from "./card";

export class Deck {
    constructor(
        public id_deck?: number,
        public id_user?:number,
        public nameDeck?: string,
        public cards?: Card[],
        public share?: boolean,
        public scores?: number[], 
        public mediaScore?: number,

       ){}
}

// en realidad deberia ser el id_user, pero pongo name por ahora hasta BBDD
