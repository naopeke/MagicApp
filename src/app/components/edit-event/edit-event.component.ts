import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/evento';
import { User } from 'src/app/models/user';
import { EventosService } from 'src/app/shared/eventos.service';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  @Input() evento: Evento
  @Output() eventClose = new EventEmitter <Boolean>()
 
  public editEvent: FormGroup
  public editar: boolean = false
  public id_logueado: number;
    
  constructor(private formBuilder: FormBuilder, private eventService: EventosService, private usersService: UsersService, private toastr: ToastrService){}
    
  ngOnInit(): void {
      console.log(this.evento.date);
      this.buildForm();
      this.editEvent.disable();
      this.id_logueado = this.usersService.getCurrentUserId();
  }

  private buildForm(){
    this.editEvent = this.formBuilder.group({
      title: [this.evento.title, [Validators.required, Validators.maxLength(40)]],
      date: [this.evento.date, Validators.required],
      time: [this.evento.hour, Validators.required],
      place: [this.evento.place, Validators.required],
      direction:[this.evento.direction, Validators.required],
      description: [this.evento.description, Validators.maxLength(100)]
    },{ updateOn: 'blur' })
  }

  edit(){
    this.editEvent.markAsUntouched();
    if(!this.editar){
      this.editar = true; 
      this.editEvent.enable();
    }
  }

  saveEdit(id:number,title:string, description:string, date:string, hour:string, place:string, direction:string, creator:User){
    console.log(date);

    const event:Evento = new Evento(id, title, description, new Date(date), hour, place, creator, direction);
 
    this.eventService.modifyEvent(event).subscribe((respuesta: Response) => {
      console.log(respuesta);
      this.toastr.success('Evento editado correctamente', "")

    })

    this.editar = false;
    this.editEvent.disable();
        setTimeout(() => {
      this.close();
    }, 500)
  }


 
  close(){
    this.eventClose.emit(false)
    console.log(this.eventClose);
    
  }

}