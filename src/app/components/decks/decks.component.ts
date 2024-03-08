import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Deck } from 'src/app/models/deck';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.css']
})
export class DecksComponent {
public explorar: boolean = false
@Input () dato: Deck
@Output() eventoExplorar = new EventEmitter<number>();

public explora(id_deck:number){
  this.explorar = true
  this.eventoExplorar.emit(id_deck)
  console.log(id_deck);
  
}
}
