import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  @Input() user:User;
  @Output() eventCloseDetail = new EventEmitter<boolean>();

  public openModal:boolean = false

  constructor(public eventoService: EventosService,
              private toastr: ToastrService,
              private router:Router){}


  ngOnInit() {
    this.getparticipantes();    
  }

  getparticipantes(){
    this.eventoService.getParticipantes(this.evento.id_event).subscribe((res:any) => {
      if(!res.error){
        this.evento.participants = [];
        res.data.forEach(evento => {
          console.log(res.data);
          
          if(evento.creatorEvent == 1){
            this.evento.creator = evento.nameUser
          } else {
            this.evento.participants.push(new User(evento.id_user, evento.nameUser))
          }
        });
      } 
    })
  }

  closeDetail(){
    this.eventCloseDetail.emit(false)
  }

  participar(){
    this.eventoService.postPartipacion(this.user.id_user, this.evento.id_event).subscribe((res:any) =>{
      if(!res.error){
        this.toastr.success(res.mensaje, '¡Bienvenido al evento!');
        this.evento.participants = [];
        this.getparticipantes(); 
      } else{
        this.toastr.error(res.mensaje, '¡Ups!' )
      }
    })

  }

  abandonar(){
    this.eventoService.deleteParticipacion(this.user.id_user, this.evento.id_event).subscribe((res:any) =>{
      if(!res.error){
        this.toastr.error(res.mensaje, 'Éxito')
        this.getparticipantes(); 
      }
    })
  }

  editar(){
    this.router.navigate(['/evento']);
  }
}
