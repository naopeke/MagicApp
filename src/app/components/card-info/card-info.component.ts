import { Component, OnInit, Input } from '@angular/core';
import { CardsService } from 'src/app/shared/cards.service';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.css']
})
export class CardInfoComponent implements OnInit{
  @Input() origin: string;
  @Input() id_card: number;
  public card: Card;
  
  constructor(public cardsService: CardsService){}

  ngOnInit(): void {
    //TODO: llamar a servicio por id y incializar "card" con los datos

    //Es necesario que las legalities sean un array de objetos legality
    // [
    //   {"key": "standard", "value": "not_legal"},
    //   {"key": "future", "value": "not_legal"},
    //   {"key": "commander", "value": "legal"},
    // ]

    this.card = new Card("175b3d28-5c74-4972-9b5c-5e39762c78f4", 
    1, 
    "https://cards.scryfall.io/png/front/1/7/175b3d28-5c74-4972-9b5c-5e39762c78f4.png?1686964447",
    "Relic of Sauron",
    "{4}",
    "Artifact",
    "{T}: Add two mana in any combination of {U}, {B}, and/or {R}.\n{3}, {T}: Draw two cards, then discard a card.",
    [
      {"key": "standard", "value": "not_legal"},
      {"key": "future", "value": "not_legal"},
      {"key": "commander", "value": "legal"},
    ],
    3.63,
    "Murders at Karlov Manor Commander",
    "commander"
    );
  }
}
