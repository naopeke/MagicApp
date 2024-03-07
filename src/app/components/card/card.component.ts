import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() childCard: Card;
  @Input() templateCard: string;
  @Output() addCardToBuilder = new EventEmitter<Card>();

  // pagina cartas
  onPlusButtonClick(){
    console.log('cliked the plus button');
    this.addCardToBuilder.emit(this.childCard);
  }

  onDeleteButtonClick(){
    console.log('clicked the x button');
  }

  //pagina mis mazos
  onCountPlusButtonClick(){
    console.log('clicked the count plus button');
  }

  onCountMinusButtonClick(){
    console.log('clicked the count minus button');
  }

  onDeleteAllButtonClick(){
    console.log('clicked the delete all button');
  }
}
