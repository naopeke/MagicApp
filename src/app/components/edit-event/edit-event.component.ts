import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    
  constructor(private formBuilder: FormBuilder, private eventService: EventosService, private usersService: UsersService){}
    
  ngOnInit(): void {
      this.buildForm();
      this.editEvent.disable();
      this.id_logueado = this.usersService.getCurrentUserId();
  }

  private buildForm(){
    this.editEvent = this.formBuilder.group({
      title: [this.evento.title, [Validators.required, Validators.maxLength(40)]],
      date: [this.evento.date.toISOString().substring(0, 10), Validators.required],
      time: [this.evento.hour, Validators.required],
      place: [this.evento.place, Validators.required],
      direction:[this.evento.direction, Validators.required],
      description: [this.evento.description]
    })
  }

  edit(id:number,title:string, description:string, date:string, hour:string, place:string, direction:string, creator:User){
    console.log(date);

    const event:Evento = new Evento(id, title, description, new Date(date), hour, place, creator, direction);
    this.eventService.modifyEvent(event);

    if(this.editar == false){
      this.editar = true; 
      this.editEvent.enable();
    } else {
      this.editar = false;
      this.editEvent.disable(); 
    }
  }

  close(){
    this.eventClose.emit(false)
  }
}