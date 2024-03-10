import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Deck } from 'src/app/models/deck';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.css']
})
export class DecksComponent {
public explorar: boolean = false
public score: number;

@Input () dato: Deck
// para ngIf type stars
@Input () rating: string;
@Output() eventoExplorar = new EventEmitter<number>();
@Output() eventoPuntuacion = new EventEmitter<{id_deck:number, score:number}>()

public explora(id_deck:number){
  this.explorar = true
  this.eventoExplorar.emit(id_deck)
  console.log(id_deck);
  
}

Handle(id_deck:number, score:number){
  this.eventoPuntuacion.emit({id_deck, score})

}
}
