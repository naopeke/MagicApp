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

  public getByCollection(collection:string):Observable<Card[]> {
    let urlName = `${this.url}/cartas?cardName=${encodeURIComponent(collection)}`;
    return this.http.get<Card[]>(urlName);
  }

  public getDeckIdByUserAndIndex(userId: number, selectedDeckIndex:number):Observable<any>{
    let urlDeckId = `${this.url}/cartas?userid=${userId}?deckindex=${selectedDeckIndex}`
    return this.http.get<any>(urlDeckId);
  }

  public cardExists (userId: number, deckId: number):Observable<any>{
    let urlCardExists = `${this.url}/cartas?userid=${userId}?deckindex=${deckId}`
    return this.http.get<any>(urlCardExists);
  }

  public addCardsToDeck(deckIndex: number, cardIds: string[], userId: number): Observable<any> {
    let urlAddToDeck = `${this.url}/cartas`;
    return this.http.post(urlAddToDeck, { id_deck: deckIndex, cardIds: cardIds, user_id: userId });
  }
  
  // public getIdUser(cardId: string): Observable<number> {
  //   let urlGetUserId = `${this.url}/cards/${cardId}/user`;
  //   return this.http.get<number>(urlGetUserId);
  // }

  // public addCardsToDeck(deckIndex: number, cardIds: string[]): void {
  //   console.log('Cards added to deck: ', cardIds);
  //     cardIds.forEach(cardIdApi => {
  //       // this.decks[deckIndex].push(cardId);
  //       let urlAddToDeck = `${this.url}/cartas`;
  //       this.http.post(urlAddToDeck, {id_deck: deckIndex, id: cardIdApi}).subscribe({
  //         next: (response) => console.log('Cards added to deck in DB: ', response),
  //         error: (err) => console.log('Error adding: ', err)
  //       })
  //     });
  //   // console.log('Deck index: ', this.decks[deckIndex]);
  //   // console.log('Card Ids added: ', cardIds);
  // }

}