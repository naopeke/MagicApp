import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from 'src/app/models/evento';
import { EventosService } from 'src/app/shared/eventos.service';


@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent {

  @Input() idEvent: number;
  public events:Evento[];
  
  constructor(private eventService: EventosService){
    
  }
  //Función elimiar evento
  deleteEvent(idEvent:number){
    console.log(idEvent);
    console.log(this.eventService.deleteEvent(idEvent));
    console.log("evento eliminado correctamente");
  }
// funcion cerrar modal
  public closeModalDelete():void {
    this.eventService.closeModalDeleteEvent();
  }
}