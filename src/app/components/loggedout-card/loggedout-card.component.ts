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
  public searchType: string = 'nombre' //default searchtype es nombre
  public searchPerformed: boolean = false; // si ha hecho la busqueda o no  default false

  public darkenOverlay:boolean = false; // modal de xisca
  public show_cardinfo:boolean = false; // modal de xisca


  constructor(
    public cardsService: CardsService,
    private router: Router,
    private rutaActiva: ActivatedRoute
  ){

    //app.routing.module.ts  {path: "cartas/:cardId", component:CartasComponent},
  // this.parametro = this.rutaActiva.snapshot.params.cardId;
  }

  // searchCards(searchParam: string): void {
  //   this.searchPerformed = true;
  //   this.cardsService.fetchCardData(searchParam).subscribe({
  //     next: (cards) => {
  //       this.resultsCards = cards;
  //       console.log('Results:', cards);
  //     },
  //     error: (err) => {
  //       this.resultsCards = [];
  //       console.log('Error in fetching cards:', err);
  //     }
  //   });
  // }

  searchCards(searchParam: string): void {
    this.searchPerformed = true;
    this.cardsService.fetchCardData(searchParam).subscribe({
      next: (card) => {
        this.resultsCards = [card]; // como dato desde back(axios) es un object y no es array...
        console.log('Results:', card);
      },
      error: (err) => {
        this.resultsCards = [];
        console.log('Error in fetching cards:', err);
      }
    });
  }
  
  // searchCards(searchParam: string): void {
  //   this.searchPerformed = true;
  
  //   let searchObservable;
  //   if (this.searchType === 'nombre') {
  //     searchObservable = this.cardsService.getByName(searchParam);
  //   } else if (this.searchType === 'colleccion') {
  //     searchObservable = this.cardsService.getByCollection(searchParam);
  //   }
  
  //   if (searchObservable) {
  //     searchObservable.subscribe({
  //       next: (cards) => {
  //         si hay más results, meterlas en resultsCards
  //         this.resultsCards = cards;
  //         console.log('Results:', cards);
  //       },
  //       error: (err) => {
  //         vaciar resultsCards cuando hay error
  //         this.resultsCards = [];
  //         console.log('Error in fetching cards:', err);
  //       }
  //     });
  //   } else {
  //     console.log('Invalid search type');
  //   }
  // }
  
  
// // buscar con nombre completa y array
//   searchCards(searchParam: string): void {
//     this.searchPerformed = true;
//     let cards = [];
//     if (this.searchType == 'nombre'){
//       cards = this.cardsService.getByName(searchParam);
//     } else if (this.searchType === 'colleccion'){
//       cards = this.cardsService.getByCollection(searchParam);
//     }

//     // si hay 1 o más cartas en array, meter datos en resultsCards
//     if (cards && cards.length > 0) {
//       this.resultsCards = cards;
//       console.log('Results:', cards);
//       console.log('resultsCards: ', this.resultsCards);
//     } else {
//       this.resultsCards = [];
//       console.log('No hay datos en resultsCards');
//     }
//   }


  public onCardInfoOpen(){
    this.darkenOverlay=true; 
    this.show_cardinfo = true; 
  }

  public onCardInfoClose(show: boolean){
    this.darkenOverlay = show;
    this.show_cardinfo = show;
  }

  public card_info_close() {
    this.darkenOverlay = false;
    this.show_cardinfo = false;
  }

  ngOnInit(): void {
      
  }
}
