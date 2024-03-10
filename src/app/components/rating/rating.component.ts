import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  @Input() maxrating: number = 5;
  @Input() SelectedStar= 0
  previoSelection = 0

  maxRatingArr:any = []
  @Output() onRating = new EventEmitter<number>()

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
  this.SelectedStar = index+1;
  this.previoSelection = this.SelectedStar
  this.onRating.emit(this.SelectedStar)
  
  }
  ngOnInit(): void {
    this.maxRatingArr = Array(this.maxrating).fill(0);
  }
}
