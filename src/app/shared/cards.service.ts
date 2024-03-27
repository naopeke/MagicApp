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

 
  public addCardsToDeck(cardApiIds: string[], userId: number, indexDeck: number): Observable<any> {
    let urlAddToDeck = `${this.url}/cartas`;
    return this.http.post(urlAddToDeck, { ids: cardApiIds, id_user: userId, indexDeck: indexDeck });
  }  


  public fetchCardSymbols(): Observable<any> {
    let urlSymbols = `${this.url}/cartas/symbols`;
    return this.http.get(urlSymbols);
  }

}