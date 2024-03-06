import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Card } from 'src/app/models/card';
import { CardsService } from 'src/app/shared/cards.service';

@Component({
  selector: 'app-loggedout-card',
  templateUrl: './loggedout-card.component.html',
  styleUrls: ['./loggedout-card.component.css']
})
export class LoggedoutCardComponent implements OnInit {
  public cards: Card[]
  public card: Card;
  public parametro: string;
  public searchInput: string = '';
  public resultsCards: Card[] =[]; //para meter datos de resultados

  constructor(
    public cardsService: CardsService,
    private router: Router,
    private rutaActiva: ActivatedRoute
  ){

    //app.routing.module.ts  {path: "cartas/:cardId", component:CartasComponent},
  // this.parametro = this.rutaActiva.snapshot.params.cardId;
  }


// buscar con nombre completa y array
  searchCards(searchParam: string): void {
    const cards = this.cardsService.getByName(searchParam);
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
  // buscar con las palabras completas 1 carta
  // searchCards(searchParam: string): void {
  //   let card = this.cardsService.getByName(searchParam);
  //     if (card) {
  //       console.log('Result: ', card);
  //   this.resultsCards = this.cardsService.getByName(searchParam)
  //       // this.router.navigate(['/cartas', card.id_card]);
  //     } else {
  //       console.log('No hay datos');
  //     }
  // }





  ngOnInit(): void {
      
  }
}
