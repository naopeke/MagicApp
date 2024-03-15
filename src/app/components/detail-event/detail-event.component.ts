import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() eventCloseDetail = new EventEmitter<boolean>();
  public openModal:boolean = false
  public creator: string
  public participantes: User[] = []

  constructor(public eventoService: EventosService){}


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
    console.log(this.evento);
  }

  abandonar(){

  }
}
