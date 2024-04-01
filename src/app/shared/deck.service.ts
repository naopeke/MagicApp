import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Deck } from '../models/deck';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DeckService {
  // private urlExplora :string = 'http://localhost:3000/explora'
  // private urlExplora :string = "https://magy-deck-api.vercel.app/explora"; 

  // private url:string = 'http://localhost:3000';
  // private url = "https://magy-deck-api.vercel.app/"; 
  private url = environment.url;

  constructor(private http: HttpClient) { }

  // belen explora
  public getSharedDecks(){
    return this.http.get(this.url + '/explora')
  }

  public getVotedDeck(){
    return this.http.get(this.url + '/explora' + '/votados')
  }

  public getDeck(filter:string, input:string){
    let route;
    if(filter == 'nameUser')
      route = this.http.get(this.url + '/explora' + '/search/?nameUser=' + input)
    //      route = this.http.get(this.urlExplora + '/search/?nameUser=' + input)
    else if (filter == 'nameDeck')
      route = this.http.get(this.url + '/explora' + '/search/?nameDeck=' + input)
    // route = this.http.get(this.urlExplora + '/search/?nameDeck=' + input)
    else 
    route = this.http.get(this.url + '/explora' + '/search')
  //    route = this.http.get(this.urlExplora + '/search')
    return route
  }

  public getDeckByDeck(nameDeck:string){
    return this.http.get(this.url + '/explora' + '/deck/' + nameDeck)
    //    return this.http.get(this.urlExplora + '/deck/' + nameDeck)
  }

  public putMediaScore(id_user:number,id_deck:number, score:number){
    const body = {
      id_user: id_user,
      id_deck: id_deck,
      score: score
    }
    return this.http.put(this.url + '/explora' + '/mediaScore', body)
    //    return this.http.put(this.urlExplora + '/mediaScore', body)
  }

  public getDeckById(id_deck:number,filter:string){
    let route;
    if(filter)
      route = this.http.get(`${this.url}/explora/deck?id_deck=${id_deck}&type_line=${filter}`)
      // route = this.http.get(`${this.urlExplora}/deck?id_deck=${id_deck}&type_line=${filter}`)
      else 
      route = this.http.get(`${this.url}/explora/deck?id_deck=${id_deck}`)
      // route = this.http.get(`${this.urlExplora}/deck?id_deck=${id_deck}`)
      return route
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
