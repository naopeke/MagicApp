import { Component, OnInit } from '@angular/core';
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
  public errorMessage: string | null = null; // si sale error en back, meter aquí. default null


  public darkenOverlay:boolean = false; // modal de xisca
  public show_cardinfo:boolean = false; // modal de xisca
  public selectedCard: Card | null = null; // selectedCard sea Card o null, default null

  constructor(
    public cardsService: CardsService
  ){


  }


  searchCards(cardName: string): void {
    this.searchPerformed = true;
    this.errorMessage = null; // cada vez busca, refresh

    this.cardsService.getByName(cardName).subscribe({
      next: (data:any) => {
        this.resultsCards = [data]; // como dato desde back(axios) es un object y no es array...
        this.errorMessage = null; // refresh errorMessage
      },
      error: (err) => {
        this.resultsCards = [];
        console.log('Error in fetching cards:', err);
        this.errorMessage = 'Hay demasiadas cartas o el título es incorrecto. Por favor, intenta una búsqueda más detallada con un título más específico.';
        console.log('Error message', this.errorMessage);
      }
    });
  }


  public onCardInfoOpen(card:Card):void{
    this.selectedCard = card;
    this.darkenOverlay=true; 
    this.show_cardinfo = true; 
  }

  public onCardInfoClose():void{
    this.selectedCard = null; // resetear selectedCard
    this.darkenOverlay = false;
    this.show_cardinfo = false;
  }

  ngOnInit(): void {
  }
}
