import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Deck } from 'src/app/models/deck';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() mazo:Deck
  @Input() mediaScore: number;
  @Input () typeRating: number;
  @Output() onRating = new EventEmitter<number>()


  public selectedStarsMap: { [key: number]: number } = {}
  public showStar: number = 0
  public previoSelection:number = 0
  public maxRatingArr:number[] = [1,2,3,4,5]
  // public maxRatingArr = Array(this.maxrating).fill(0);
  // public maxRatingArr2 = Array(this.maxrating).fill(0);
  // public maxRatingArr3 = Array(this.maxrating).fill(0);

  ngOnInit(): void {
 
    
    console.log(this.selectedStarsMap[this.mazo.id_deck]);
    
 
  }

  constructor(){
    // this.maxRatingArr = Array(this.maxrating).fill(0);
  }
  HandleMouseEnter(index:number){
    this.showStar = index +1
  }
  HandleMouseLeave(){
    if(this.previoSelection != 0){
      this.showStar = this.previoSelection
    }else 
    this.showStar = 0
  }
  
  rating(index:number, mazoId:number){
    console.log(mazoId);
    this.selectedStarsMap[mazoId] = index + 1; 
    this.previoSelection = this.selectedStarsMap[mazoId];
    console.log(this.previoSelection);
    console.log(this.selectedStarsMap[mazoId]);
    this.onRating.emit(this.selectedStarsMap[mazoId]);
 
  
  
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
