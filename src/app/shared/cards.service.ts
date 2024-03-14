import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Card } from  '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private url = "http://localhost:3000";
  // private url = "https://magy-deck-api.vercel.app/"; 
  private decks: string[][] = [[], [], [], [], []]; //5 mazos, 5 arrays en 1 array


  public card: Card;
  public cards: Card[];
  

  constructor(private http: HttpClient) { }

  // public fetchCardData(cardName: string): Observable<Card[]> {
  //   let urlName = `${this.url}/cartas?cardName=${encodeURIComponent(cardName)}`;
  //   return this.http.get<Card[]>(urlName);
  // }


  public fetchCardData(cardName: string): Observable<Card> {
    let urlName = `${this.url}/cartas?cardName=${encodeURIComponent(cardName)}`;
    return this.http.get<Card>(urlName);
  }

  
  public getByName(cardName:string):Observable<Card[]>{
    let urlName = `${this.url}/cartas?cardName=${encodeURIComponent(cardName)}`;
    return this.http.get<Card[]>(urlName);
  }

// // array de cartas, parcial, lowercase
// public getByName(name:string): Card[] | null {
//   let lowerCaseName = name.toLowerCase();
//   let cards = this.cards.filter(card => card.name.toLowerCase().includes(lowerCaseName));
//   console.log('Obtained info: ', name, cards);
//   if (cards) {
//     return cards; //si se ha encontrado con una carta, devuelve esa carta 
//   } else {
//     return null; // si no, devuelve null
//   }
// }

public getByCollection(collection:string):Observable<Card[]> {
  let urlName = `${this.url}/cartas?cardName=${encodeURIComponent(collection)}`;
    return this.http.get<Card[]>(urlName);
}

// public getByCollection(name:string): Card[] | null {
//   let lowerCaseName = name.toLowerCase();
//   let cards = this.cards.filter(card => card.set_name.toLowerCase().includes(lowerCaseName));
//   console.log('Obtained info: ', name, cards);
//   if (cards) {
//     return cards; //si se ha encontrado con una carta, devuelve esa carta 
//   } else {
//     return null; // si no, devuelve null
//   }
// }

public addCardsToDeck(deckIndex: number, cardIds: string[]): void {
  console.log('Cards added to the deck: ', cardIds);
    cardIds.forEach(cardId => {
      this.decks[deckIndex].push(cardId);
    });
  console.log('Deck index: ', this.decks[deckIndex]);
  console.log('Card Ids added: ', cardIds);
}

}