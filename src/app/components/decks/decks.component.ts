import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Deck } from 'src/app/models/deck';
import { User } from 'src/app/models/user';
import { DeckService } from 'src/app/shared/deck.service';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.css']
})
export class DecksComponent implements OnInit {
@Input () typeRating: number;
@Input () mazo: Deck
@Input() maxrating: number = 5;
@Output() eventoExplorar = new EventEmitter<number>();
@Output() eventoPuntuacion = new EventEmitter<{id_deck:number, score:number}>()

public maxRatingArr:number[] = [1,2,3,4,5]
public explorar: boolean = false
public score: number;
public currentUser: User;
constructor(private deckService:DeckService, private userService:UsersService ){

}

async ngOnInit(): Promise<void> {
  await this.loadCurrentUser();
  this.deckService.getScore(this.currentUser.id_user, this.mazo.id_deck).subscribe((res:any) => {
    if (res.data[0]) {
      console.log(res.data[0].date);
      this.mazo.previousScore = { date: res.data[0].date, id_user: res.data[0].id_user, score: res.data[0].score };
      console.log(this.mazo.previousScore);
    } else {
      this.mazo.previousScore = { date: '', id_user: 0, score: 0 };
    }
  });
 
}

private async loadCurrentUser(): Promise<void> {
  return new Promise<void>((resolve) => {
    this.userService.currentUserChanges().subscribe(user => {
      this.currentUser = user;
      resolve(); 
    });
  });
}

HandleMouseEnter(index:number){
  this.mazo.selectedStar=index+1
}

HandleMouseLeave(){
  if(this.mazo.previousScore.score !== 0){
    this.mazo.selectedStar = this.mazo.previousScore.score
  }
  else {
    this.mazo.selectedStar = 0
  }
}

rating(index:number, id_deck){
  if(this.mazo.previousScore.score == 0 && this.mazo.id_user != this.currentUser.id_user){
    this.mazo.selectedStar= index + 1; 
    this.mazo.previousScore.score= this.mazo.selectedStar
  }
  this.score = this.mazo.selectedStar
  this.eventoPuntuacion.emit({id_deck, score:this.score});
}

roundMediaScore(){
  let resultado;
  if (this.mazo.mediaScore !== undefined) {
    resultado =  Math.round(this.mazo.mediaScore);
  } else {
  resultado = 0
  }
  return resultado
}

public explora(id_deck:number){
  this.explorar = true
  this.eventoExplorar.emit(id_deck)
}
}
