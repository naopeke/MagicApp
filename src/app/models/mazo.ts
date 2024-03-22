import { Card } from "./card";

export class Mazo {
    constructor(
        public id_deckCard?: number,
        public id_deck?: number,
        public indexDeck?: number,
        public nameDeck?: string,
        public share?: number,
        public cards?: Card[]
       ){}
}