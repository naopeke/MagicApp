import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card';
import { CardsService } from 'src/app/shared/cards.service';
import { Respuesta } from 'src/app/models/respuesta';

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
  @Output() childCardClicked = new EventEmitter<Card>(); // añadido para modal de xisca

  constructor(private cardsService: CardsService){

  }

  // pagina cartas
  onPlusButtonClick(event:Event){
    console.log('cliked the plus button');
    event.stopPropagation(); //para resolver bubbling
    this.addCardToBuilder.emit(this.childCard);
  }

  onDeleteButtonClick() {
    console.log('childCard :', this.childCard);
    console.log('childCard api :', this.childCard.id);
    if(this.childCard && this.childCard.id) {
      console.log(this.childCard.id);
        this.deleteFromChild.emit(this.childCard.id);
    } else {
        console.error('No card ID available for deletion');
    }
}


  //pagina mis mazos
  onCountPlusButtonClick(event:Event){
    console.log('clicked the count plus button');
    event.stopPropagation(); //para resolver bubbling
    this.countPlusFromChild.emit(this.childCard.id);
  }

  onCountMinusButtonClick(event:Event){
    console.log('clicked the count minus button');
    event.stopPropagation(); //para resolver bubbling
    this.countMinusFromChild.emit(this.childCard.id);
  }

  onDeleteAllButtonClick(event:Event){
    console.log('clicked the delete all button');
    event.stopPropagation(); //para resolver bubbling
    this.deleteAllQuantityFromChild.emit(this.childCard.id);
  }

  onCardClick():void {
    console.log('clicked for cardinfo');
    this.childCardClicked.emit(this.childCard); // añadido para modal de xisca
  }

  idCard(id_card:number){
    this.eventoidCard.emit(id_card)
    console.log(id_card); 
  }
}
