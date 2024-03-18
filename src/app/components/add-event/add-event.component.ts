import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Evento } from 'src/app/models/evento';
import { User } from 'src/app/models/user';
import { EventosService } from 'src/app/shared/eventos.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  // @Input() evento: Evento
  @Output() eventClose = new EventEmitter <Boolean>()
 
  public addEvent: FormGroup
  public editar: boolean = false
    
  constructor(private formBuilder: FormBuilder, private eventService: EventosService){}
    
  ngOnInit(): void {
      this.buildForm();
      this.addEvent.disable();
      
  }

  private buildForm(){
    this.addEvent = this.formBuilder.group({
      title: ["", [Validators.required, Validators.maxLength(40)]],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      time: ["", Validators.required],
      place: ["", Validators.required],
      direction:["", Validators.required],
    })
  }

  add(titleEvent:string, descriptionEvent:string, dateEvent:Date, hourEvent:string, placeEvent:string, direction:string){
    let evento = new Evento(null, titleEvent, descriptionEvent, dateEvent, hourEvent, placeEvent, new User(1, null, null, null, null, null), direction);
    this.eventService.createEvent(evento).subscribe((respuesta: Response) => {
      console.log(respuesta);
      
    })

    // const event:Evento = new Evento(null, title, description, new Date(date), hour, place, new User(2,"Paco","paco@","","",""));
    // this.eventService.createEvent(event);

    if(this.editar == false){
      this.editar = true; 
      this.addEvent.enable();
    } else {
      this.editar = false;
      this.addEvent.disable();
    }
  }

  close(){
    this.eventClose.emit(false)
  }
}