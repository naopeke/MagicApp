import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Eventos } from 'src/app/models/eventos';
import { User } from 'src/app/models/user';
import { EventosService } from 'src/app/shared/eventos.service';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.css']
})
export class DetailEventComponent implements OnInit{
  @Input() evento:Eventos
  @Input() type: number
  @Input() id_user:number;
  @Output() eventCloseDetail = new EventEmitter<boolean>();

  public openModal:boolean = false
  public creator: string
  public participantes: User[] = []
  // sacar de servico cuando login
 

  constructor(public eventoService: EventosService,
              private toastr: ToastrService){}


  ngOnInit() {
    this.getparticipantes();
  }

  getparticipantes(){
    this.eventoService.getParticipantes(this.evento.id_event).subscribe((res:any) => {
   
      if(!res.error){
        res.data.forEach(evento => {
          if(evento.creator == 1){
            this.creator = evento.nameUser
          } else {
            this.participantes.push(evento.nameUser);
          }
        });
      } else{
        console.log(res.error);
        console.log(res.mensaje);
      }
    })
  }

  closeDetail(){
    this.eventCloseDetail.emit(false)
  }

  participar(){
    this.eventoService.postPartipacion(this.id_user, this.evento.id_event).subscribe((res:any) =>{
      if(!res.error){
        this.toastr.success(res.mensaje, '¡Bienvenido al evento!')
        
      } else{
        this.toastr.error(res.mensaje, '¡Ups!' )
      }
    })

  }

  abandonar(){
    this.eventoService.deleteParticipacion(this.id_user, this.evento.id_event).subscribe((res:any) =>{
      if(!res.error){
        this.toastr.success(res.mensaje, 'Éxito')
      } else{
        this.toastr.error(res.mensaje, '¡Ups!' )
      }
    })
  }
}
