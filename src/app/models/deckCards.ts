import { Card } from "./card";

export class DeckCard {
    constructor(
        public id_deck?: number,
        public indexDeck?: number,
        public nameDeck?: string,
        public card?: Card,
        public share?: number,
        public quantity?: number
       ){}
}