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

