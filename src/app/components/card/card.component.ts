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
  @Output() addCardToBuilder = new EventEmitter<Card>();
  @Output() deleteFromChild = new EventEmitter<string>();
  @Output() countPlusFromChild = new EventEmitter<string>();
  @Output() countMinusFromChild = new EventEmitter<string>();
  @Output() deteleAllQuantityFromChild = new EventEmitter<string>();

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
  onCountPlusButtonClick(){
    console.log('clicked the count plus button');
    this.countPlusFromChild.emit(this.childCard.id_card);
  }

  onCountMinusButtonClick(){
    console.log('clicked the count minus button');
    this.countMinusFromChild.emit(this.childCard.id_card);
  }

  onDeleteAllButtonClick(){
    console.log('clicked the delete all button');
    this.deteleAllQuantityFromChild.emit(this.childCard.id_card);
  }
}
