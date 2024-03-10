import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  @Input() maxrating: number = 5;
  @Input() SelectedStar= 0
  @Input() mediaScore: number
  // para ngIf type stars
  @Input () typeRating: number;
  @Output() onRating = new EventEmitter<number>()

  previoSelection:number = 0
  maxRatingArr:any = []

  ngOnInit(): void {
    this.maxRatingArr = Array(this.maxrating).fill(0);
  }

  constructor(){}
  HandleMouseEnter(index:number){
    this.SelectedStar=index+1
  }
  HandleMouseLeave(){
    if(this.previoSelection == 0){
      this.SelectedStar = this.previoSelection
    }
    else {
      this.SelectedStar = 0
    }
  }
  
  rating(index:number){
  this.previoSelection = this.SelectedStar
  this.SelectedStar = index+1;
  console.log(this.mediaScore);
  this.onRating.emit(this.SelectedStar)
  
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
