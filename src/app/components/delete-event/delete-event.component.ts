import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { EventosService } from 'src/app/shared/eventos.service';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})

export class DeleteEventComponent {

  @Input() eventoAEliminar: Evento; //Variable con el evento que viene del padre
 
  public mostrarNotificacionEvento: boolean; //Variable con el estado de la notificación
  
  constructor(private eventService: EventosService){  

  }

  
  ngOnInit(): void {this.mostrarNotificacionEvento = false;} //Inicializamos la variable de la notificación a false

  //Función para eliminar el evento al pulsar en aceptar
  deleteEvent(idEvent:number){
    this.eventService.deleteEvent(idEvent).subscribe((respuesta: Response) => {
        console.log(respuesta);
    })

    this.mostrarNotificacionEvento = true; //Cambiamos el estado de la notificación para que se muestre
  }
  
  //Funcion para cerrar la modal, llamada desde el icono de la X
  public closeModalDelete():void {
    this.eventService.closeModalDeleteEvent();
  }

}