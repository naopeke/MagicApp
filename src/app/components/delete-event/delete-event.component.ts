import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/evento';
import { Eventos } from 'src/app/models/eventos';
import { User } from 'src/app/models/user';
import { EventosService } from 'src/app/shared/eventos.service';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})

export class DeleteEventComponent {

  @Input() eventoAEliminar: Evento; //Variable con el evento que viene del padre
  @Input() evento:Eventos
  @Input() user:User;
  @Output() eventClose = new EventEmitter<boolean>();
 
  public mostrarNotificacionEvento: boolean; //Variable con el estado de la notificación
  
  constructor(private eventoService: EventosService, private toastr: ToastrService){  

  }

  
  ngOnInit(): void {this.mostrarNotificacionEvento = false;} //Inicializamos la variable de la notificación a false

  deleteEvent(){
    console.log(this.evento);
    
    if(this.evento){
      this.eventoService.deleteParticipacion(this.user.id_user, this.evento.id_event).subscribe((res:any) =>{
        if(!res.error){
          this.toastr.success(res.mensaje, 'Éxito')
          this.closeDelete();
        
        }
      })
    }
    if(this.eventoAEliminar){
      this.eventoService.deleteEvent(this.eventoAEliminar.id).subscribe((respuesta: Response) => {
            console.log(respuesta);
            this.toastr.success('Evento eliminado correctamente', "")
          })
          this.mostrarNotificacionEvento = true;
          setTimeout(() => {
            this.closeDelete();
          },500)
          
    }
  }

  public closeDelete(){
    this.eventClose.emit(false)

  }

}