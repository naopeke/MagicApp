import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() mediaScore: number;
  @Input () typeRating: number;
  @Output() onRating = new EventEmitter<number>()

  public maxrating: number = 5;
  public selectedStar:number = 0;
  public showStar: number = 0
  public previoSelection:number = 0
  // public maxRatingArr:any = []
  public maxRatingArr = Array(this.maxrating).fill(0);

  ngOnInit(): void {
    // this.maxRatingArr = Array(this.maxrating).fill(0);
    // console.log(this.maxRatingArr);
    
    // console.log(this.selectedStar);
    
 
  }

  constructor(){
    // this.maxRatingArr = Array(this.maxrating).fill(0);
  }
  HandleMouseEnter(index:number){
    this.showStar = index +1
  }
  HandleMouseLeave(){
    this.showStar = 0
  }
  
  rating(index:number){
  this.selectedStar = index + 1;
  console.log(this.selectedStar);
  this.onRating.emit(this.selectedStar)
  console.log(this.selectedStar);
  
  
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
