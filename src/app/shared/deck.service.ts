import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Deck } from '../models/deck';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private urlExplora :string = 'http://localhost:3000/explora'
  private url:string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // belen explora
  public getSharedDecks(){
    return this.http.get(this.urlExplora)
  }

  public getVotedDeck(){
    return this.http.get(this.urlExplora + '/votados')
  }

  public getDeckByUser(nameUser:string){
    return this.http.get(this.urlExplora + '/user/' + nameUser)
  }

  public getDeckByDeck(nameDeck:string){
    return this.http.get(this.urlExplora + '/deck/' + nameDeck)
  }

  public putMediaScore(score:number, id_deck:number){
    const body = {
      score: score,
      id_deck: id_deck
    }
    return this.http.put(this.urlExplora + '/mediaScore', body)
  }

  public getDeckById(id_deck:number){
    return this.http.get(this.urlExplora +'/' + id_deck) 
  }
  // belen explora


  
  // nao mismazos
  public getMyDecks(userId: number): Observable<any> {
    let urlGetMyDecks = `${this.url}/mis-mazos/${userId}`;
    return this.http.get(urlGetMyDecks);
}


  public editDeckName(nameDeck: string, id_deck: number): Observable<any> {
    let urlEditDeckName = `${this.url}/mis-mazos/${id_deck}`;
    return this.http.put(urlEditDeckName, { nameDeck }); // nameDeck como Object
  }

  public toggleShare(id_deck: number): Observable<any> {
    let urlToggleShare = `${this.url}/mis-mazos/compartir/${id_deck}`;
    return this.http.put(urlToggleShare, {});
  }

  public updateCardQuantity(id_deckCard: number, action: string): Observable<any> {
    return this.http.put(`${this.url}/mis-mazos/cantidad/${id_deckCard}`, { action });
  }

  public deleteCardQuantity(id_deckCard: number): Observable<any> {
    return this.http.delete(`${this.url}/mis-mazos/cantidad/${id_deckCard}`);
  }

  // nao mismazos


  }
