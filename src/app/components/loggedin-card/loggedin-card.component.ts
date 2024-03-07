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

  constructor(
    public cardsService: CardsService,
    private router: Router,
    private rutaActiva: ActivatedRoute
  ){

    //app.routing.module.ts  {path: "cartas/:cardId", component:CartasComponent},
  this.parametro = this.rutaActiva.snapshot.params.cardId;
  }

  // buscar con las palabras completas
  searchCards(searchParam: string): void {
    let card = this.cardsService.getByName(searchParam);
      if (card) {
        console.log('Result: ', card);
        // this.router.navigate(['/cartas', card.id_card]);
      } else {
        console.log('No hay datos');
      }
  }

  ngOnInit(): void {
      
  }
}
