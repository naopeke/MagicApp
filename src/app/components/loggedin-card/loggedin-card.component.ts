import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Card } from 'src/app/models/card';
import { CardsService } from 'src/app/shared/cards.service';

@Component({
  selector: 'app-loggedin-card',
  templateUrl: './loggedin-card.component.html',
  styleUrls: ['./loggedin-card.component.css']
})
export class LoggedinCardComponent {
  public cards: Card[]
  public card: Card;
  public parametro: string;
  public searchInput: string = '';
  public resultsCards: Card[] =[]; //para meter datos de resultados
  public searchType: string = 'nombre' //default searchtype es nombre
  public builderCards: Card[] = []; // para meter datos en builder(constcucción)

  constructor(
    public cardsService: CardsService,
    private router: Router,
    private rutaActiva: ActivatedRoute
  ){

    //app.routing.module.ts  {path: "cartas/:cardId", component:CartasComponent},
  this.parametro = this.rutaActiva.snapshot.params.cardId;
  }

  searchCards(searchParam: string): void {
    let cards = [];
    if (this.searchType == 'nombre'){
      cards = this.cardsService.getByName(searchParam);
    } else if (this.searchType === 'colleccion'){
      cards = this.cardsService.getByCollection(searchParam);
    }

    // si hay 1 o más cartas en array, meter datos en resultsCards
    if (cards && cards.length > 0) {
      this.resultsCards = cards;
      console.log('Results:', cards);
      console.log('resultsCards: ', this.resultsCards);
    } else {
      this.resultsCards = [];
      console.log('No hay datos en resultsCards');
    }
  }

  onAddCardToBuilder(card:Card){
    this.builderCards.push(card);
    console.log('Added to Builder: ', this.builderCards);
  }

  ngOnInit(): void {
      
  }
}
