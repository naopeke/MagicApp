import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/evento';
import { User } from 'src/app/models/user';
import { EventosService } from 'src/app/shared/eventos.service';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  @Output() eventClose = new EventEmitter <Boolean>()
 
  public addEvent: FormGroup;
  public editar: boolean = false;
  public id_logueado: number;
    
  constructor(private formBuilder: FormBuilder, private eventService: EventosService, private usersService: UsersService, private toastr: ToastrService){
  }
    
  ngOnInit(): void {
      this.buildForm();
      this.addEvent.disable();
      this.id_logueado = this.usersService.getCurrentUserId();
  }

  private buildForm(){
    this.addEvent = this.formBuilder.group({
      title: ["", [Validators.required, Validators.maxLength(40)]],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      time: ["", Validators.required],
      place: ["", Validators.required],
      direction:["", Validators.required],
      description: ["", Validators.maxLength(100)]
    },{ updateOn: 'blur' });
    this.addEvent.markAllAsTouched();
  }

  add(titleEvent:string, descriptionEvent:string, dateEvent:Date, hourEvent:string, placeEvent:string, direction:string){
    let evento = new Evento(null, titleEvent, descriptionEvent, dateEvent, hourEvent, placeEvent, new User(this.id_logueado, null, null, null, null, null), direction);
    this.eventService.createEvent(evento).subscribe((respuesta: Response) => {
      console.log(respuesta);
      this.toastr.success('Evento añadido correctamente', "")
    })
    this.editar = false;
    this.addEvent.disable();
    this.close();
  }

  edit(){
    this.addEvent.markAsUntouched();
    if(!this.editar){
      this.editar = true; 
      this.addEvent.enable();
    }
  }

  close(){
    this.eventClose.emit(false)
  }
}