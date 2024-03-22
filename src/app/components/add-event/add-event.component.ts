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
  // @Input() evento: Evento
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
    },{ updateOn: 'blur' });
    this.addEvent.markAllAsTouched();
  }

  add(titleEvent:string, descriptionEvent:string, dateEvent:Date, hourEvent:string, placeEvent:string, direction:string){
    let evento = new Evento(null, titleEvent, descriptionEvent, dateEvent, hourEvent, placeEvent, new User(this.id_logueado, null, null, null, null, null), direction);
    this.eventService.createEvent(evento).subscribe((respuesta: Response) => {
      console.log(respuesta);
      
    })
    //this.close();
    // const event:Evento = new Evento(null, title, description, new Date(date), hour, place, new User(2,"Paco","paco@","","",""));
    // this.eventService.createEvent(event);

    if(this.editar == false){
      this.toastr.success('Error al insertar el evento', "")
      this.editar = true; 
      this.addEvent.enable();
    } else {
      this.editar = false;
      this.addEvent.disable();
      this.toastr.success('Evento insertado con éxito', "")
    }
  }

  close(){
    this.eventClose.emit(false)
  }
}