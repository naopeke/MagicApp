import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Deck } from 'src/app/models/deck';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent{
  // @Input() id_deck:number
  @Input() mazo: Deck
  @Input() mediaScore: number;
  @Input () typeRating: number;
  @Output() onRating = new EventEmitter<number>()
  public selectedStar: number
  public showStar: number = 0
  public previoSelection:number = 0
  public maxRatingArr:number[] = [1,2,3,4,5]
  

  constructor(){
  }
  HandleMouseEnter(index:number){
    this.selectedStar = index +1
  }
  HandleMouseLeave(){
    // if(this.previoSelection != 0){
    //   this.selectedStar = this.previoSelection
    // }else 
    this.selectedStar = 0
  }
  
  rating(index:number){
    
    this.selectedStar = index + 1; 
    this.previoSelection = this.selectedStar
    console.log(this.mazo);
    
    console.log(this.previoSelection);
    this.onRating.emit(this.selectedStar);
 
  
  
  }

  roundMediaScore(){
    let resultado;
    if (this.mediaScore !== undefined) {
      resultado =  Math.round(this.mediaScore);
    } else {
    resultado = 0
    }
    return resultado
  }
  
}