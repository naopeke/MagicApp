import { Injectable } from '@angular/core';
import { Card } from  '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private url = "http://localhost:3000/cartas";


  public card: Card;
  // public cards: Card[];
  
  //hard-coding
  public cards: Card[] = [
    new Card("175b3d28-5c74-4972-9b5c-5e39762c78f4", 
    1, 
    "https://cards.scryfall.io/png/front/1/7/175b3d28-5c74-4972-9b5c-5e39762c78f4.png?1686964447",
    "Relic of Sauron",
    "{4}",
    "Artifact",
    "{T}: Add two mana in any combination of {U}, {B}, and/or {R}.\n{3}, {T}: Draw two cards, then discard a card.",
  {"standard": "not_legal",
    "future": "not_legal",
    "historic": "not_legal",
    "timeless": "not_legal",
    "gladiator": "not_legal",
    "pioneer": "not_legal",
    "explorer": "not_legal",
    "modern": "not_legal",
    "legacy": "legal",
    "pauper": "not_legal",
    "vintage": "legal",
    "penny": "not_legal",
    "commander": "legal",
    "oathbreaker": "legal",
    "standardbrawl": "not_legal",
    "brawl": "not_legal",
    "alchemy": "not_legal",
    "paupercommander": "not_legal",
    "duel": "legal",
    "oldschool": "not_legal",
    "premodern": "not_legal",
    "predh": "not_legal"},
    3.63,
    ),
    new Card("e57815d4-b21f-4ceb-a3f1-73cff5f0e612", 
    2, 
    "https://cards.scryfall.io/large/front/e/5/e57815d4-b21f-4ceb-a3f1-73cff5f0e612.jpg?1686968563",
    "March from the Black Gate",
    "{4}",
    "Enchantment",
    "When March from the Black Gate enters the battlefield and whenever an Army you control attacks, amass Orcs 1. (Put a +1/+1 counter on an Army you control. It's also an Orc. If you don't control an Army, create a 0/0 black Orc Army creature token first.)",
  {"standard": "not_legal",
    "future": "not_legal",
    "historic": "not_legal",
    "timeless": "not_legal",
    "gladiator": "not_legal",
    "pioneer": "not_legal",
    "explorer": "not_legal",
    "modern": "not_legal",
    "legacy": "legal",
    "pauper": "not_legal",
    "vintage": "legal",
    "penny": "not_legal",
    "commander": "legal",
    "oathbreaker": "legal",
    "standardbrawl": "not_legal",
    "brawl": "not_legal",
    "alchemy": "not_legal",
    "paupercommander": "not_legal",
    "duel": "legal",
    "oldschool": "not_legal",
    "premodern": "not_legal",
    "predh": "not_legal"},
    0.11,
    ),
    new Card("123e", 
    3, 
    "https://cards.scryfall.io/large/front/d/5/d5806e68-1054-458e-866d-1f2470f682b2.jpg?1696020224",
    "The One Ring",
    "{4}",
    "Enchantment",
    "When the One Ring enters the battlefield...",
  {"standard": "not_legal",
    "future": "not_legal",
    "historic": "not_legal",
    "timeless": "not_legal",
    "gladiator": "not_legal",
    "pioneer": "not_legal",
    "explorer": "not_legal",
    "modern": "not_legal",
    "legacy": "legal",
    "pauper": "not_legal",
    "vintage": "legal",
    "penny": "not_legal",
    "commander": "legal",
    "oathbreaker": "legal",
    "standardbrawl": "not_legal",
    "brawl": "not_legal",
    "alchemy": "not_legal",
    "paupercommander": "not_legal",
    "duel": "legal",
    "oldschool": "not_legal",
    "premodern": "not_legal",
    "predh": "not_legal"},
    5.11,
    )    
  ]

  public getByName(name:string): Card | null {
    let card = this.cards.find(card => card.name === name);
    console.log('Obtained info: ', name, card);
    if (card) {
      return card; //si se ha encontrado con una carta, devuelve esa carta 
    } else {
      return null; // si no, devuelve null
    }
  }


  constructor() { }
}

