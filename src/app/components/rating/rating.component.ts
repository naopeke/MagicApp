import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {

  @Input() mediaScore: number;
  @Input () typeRating: number;
  @Output() onRating = new EventEmitter<number>()

  public maxrating: number = 5;
  public selectedStar:number  = 0
  public previoSelection:number = 0
  public maxRatingArr:any = []

  ngOnInit(): void {
    this.maxRatingArr = Array(this.maxrating).fill(0);
 
  }

  constructor(){}
  HandleMouseEnter(index:number){
    this.selectedStar=index+1
  }
  HandleMouseLeave(){
    if(this.previoSelection !== 0){
      this.selectedStar = this.previoSelection
    }
    else {
      this.selectedStar = 0
    }
  }
  
  rating(index:number){

  this.selectedStar = index+1;
  this.previoSelection = this.selectedStar
 
  this.onRating.emit(this.selectedStar)
  
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
