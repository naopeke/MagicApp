import { Component, Input } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { EventosService } from 'src/app/shared/eventos.service';


@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})

export class DeleteEventComponent {

  //Variable con el evento que viene del padre
  @Input() eventoAEliminar: Evento;
  //Variable con el estado de la notificación
  public mostrarNotificacionEvento: boolean;
  
  constructor(private eventService: EventosService){  }

  //Inicializamos la variable de la notificación a false
  ngOnInit(): void {this.mostrarNotificacionEvento = false;}

  //Función para eliminar el evento al pulsar en aceptar
  deleteEvent(idEvent:number){
    //Llamamos al service para elimine el evento
    this.eventService.deleteEvent(idEvent);
    //Cambiamos el estado de la notificación para que se muestre
    this.mostrarNotificacionEvento = true;
  }
  //Funcion para cerrar la modal, llamada desde el icono de la X
  public closeModalDelete():void {
    this.eventService.closeModalDeleteEvent();
  }

}