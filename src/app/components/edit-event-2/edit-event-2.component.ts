import { DatePipe  } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { User } from 'src/app/models/user';
import { EventosService } from 'src/app/shared/eventos.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event-2.component.html',
  styleUrls: ['./edit-event-2.component.css']
})

export class EditEventComponent {

  @Input() eventoAEditar: Evento;
  public mostrarNotificacionEvento: boolean;
  public dateEvent:string;

  constructor(private eventService: EventosService){
    
  }

  public closeModalEditEvent():void {
    this.eventService.closeModalEditEvent();
  }

  ngOnInit(): void {
    this.mostrarNotificacionEvento = false;
  }
  editEvent(id:number,title:string, description:string, date:string, hour:string, place:string, creator:User) {
    //El creador se tiene que coger del login que este en el service de usuario
    const event:Evento = new Evento(id, title, description, new Date(date), hour, place, creator);
    this.mostrarNotificacionEvento = true;
  }
}
