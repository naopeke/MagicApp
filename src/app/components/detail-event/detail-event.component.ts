import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.css']
})
export class DetailEventComponent {
  @Output() eventCloseDetail = new EventEmitter<boolean>();
  public openModal:boolean = false
  constructor(){}
  
  closeDetail(){
    this.eventCloseDetail.emit(false)
  }
}
