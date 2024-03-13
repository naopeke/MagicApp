import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Events } from 'src/app/models/event';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.css']
})
export class DetailEventComponent {
  @Input() evento:Events

  @Output() eventCloseDetail = new EventEmitter<boolean>();
  public openModal:boolean = false
  constructor(){}
  
  closeDetail(){
    this.eventCloseDetail.emit(false)
  }

  participar(){
    console.log(this.evento);
    // añadir el id user de la persona que está logueada, traermelo desde el servicio
    // this.evento.participants.push(user.id_user)
  }
}
