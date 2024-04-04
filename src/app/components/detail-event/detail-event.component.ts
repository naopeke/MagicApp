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
    this.getParticipantes();
  }

  getParticipantes() {
    this.eventoService.getParticipantes(this.evento.id_event).subscribe((res: any) => {
        if (!res.error) {
            this.evento.participants = [];
            res.data.forEach(evento => {
                if (evento.creatorEvent === 1) {
                    this.evento.creator = evento.nameUser;
                } else {
                    this.evento.participants.push(new User(evento.id_user, evento.nameUser));
                }
            });
            // Call comprobarParticipacion() here after participants are populated
            this.comprobarParticipacion();
        } else {
            // Handle errors appropriately (e.g., console.error(res.error))
        }
    });
}

  comprobarParticipacion(){

    let encontrado = false;

    if(this.evento != null && this.evento.participants != null && this.evento.participants.length > 0){

      for(let i = 0; i < this.evento.participants.length; i++){
        console.log(this.evento.participants[i].id_user);
        console.log(this.user.id_user);
        
        
        if(this.evento.participants[i].id_user == this.user.id_user){

          encontrado = true;
          break;
        }
      }
    }


    if(encontrado){
      this.type = 1;
    }else{
      if(this.evento.id_user == this.user.id_user)
      {
      console.log("SOY EL CREADOR");
      this.type = 3;
      }else{
        this.type = 2;
      }
    }

  }

  closeDetail(){
    this.eventCloseDetail.emit(false)
  }

  participar(){
    this.eventoService.postPartipacion(this.user.id_user, this.evento.id_event).subscribe((res:any) =>{
      if(!res.error){
        this.toastr.success(res.mensaje, '¡Bienvenido al evento!');
        this.evento.participants = [];
        this.getParticipantes(); 
      } else{
        this.toastr.error(res.mensaje, '¡Ups!' )
      }
    })

  }

  abandonar(){
    this.eventoService.deleteParticipacion(this.user.id_user, this.evento.id_event).subscribe((res:any) =>{
      if(!res.error){
        this.toastr.error(res.mensaje, 'Éxito')
        this.getParticipantes(); 
      }
    })
  }

  editar(){
    this.router.navigate(['/evento']);
  }
}
