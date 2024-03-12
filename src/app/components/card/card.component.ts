import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card';
import { CardsService } from 'src/app/shared/cards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() childCard: Card;
  @Input() templateCard: string;
  @Output() eventoidCard = new EventEmitter<number>()
  @Output() addCardToBuilder = new EventEmitter<Card>();
  @Output() deleteFromChild = new EventEmitter<string>();
  @Output() countPlusFromChild = new EventEmitter<string>();
  @Output() countMinusFromChild = new EventEmitter<string>();
  @Output() deleteAllQuantityFromChild = new EventEmitter<string>();

  constructor(private cardsService: CardsService){

  }

  // pagina cartas
  onPlusButtonClick(event:Event){
    console.log('cliked the plus button');
    event.stopPropagation(); //para resolver bubbling
    this.addCardToBuilder.emit(this.childCard);
  }

  onDeleteButtonClick(){
    console.log('clicked the x button');
    this.deleteFromChild.emit(this.childCard.id_card);
  }

  //pagina mis mazos
  onCountPlusButtonClick(event:Event){
    console.log('clicked the count plus button');
    event.stopPropagation(); //para resolver bubbling
    this.countPlusFromChild.emit(this.childCard.id_card);
  }

  onCountMinusButtonClick(event:Event){
    console.log('clicked the count minus button');
    event.stopPropagation(); //para resolver bubbling
    this.countMinusFromChild.emit(this.childCard.id_card);
  }

  onDeleteAllButtonClick(event:Event){
    console.log('clicked the delete all button');
    event.stopPropagation(); //para resolver bubbling
    this.deleteAllQuantityFromChild.emit(this.childCard.id_card);
  }

  idCard(id_card:number){
    this.eventoidCard.emit(id_card)
    console.log(id_card); 
  }
}
