import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() childCard: Card;
  @Input() templateCard: string;

  onPlusButtonClick(){
    console.log('cliked the plus button');
  }

  onDeleteButtonClick(){
    console.log('clicked the x button');
  }

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
