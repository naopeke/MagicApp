import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Eventos } from 'src/app/models/eventos';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.css']
})
export class DetailEventComponent {
  @Input() evento:Eventos

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
