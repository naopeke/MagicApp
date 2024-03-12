import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Evento } from 'src/app/models/evento';
import { User } from 'src/app/models/user';
import { EventosService } from 'src/app/shared/eventos.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {

  constructor(private eventService: EventosService){
    

  }

  addEvent(title:string, description:string, date:string, hour:string, place:string) {
    //El creador se tiene que coger del login que este en el service de usuario
    
    // console.log("LLAMO A CREAR EVENTO");
    // console.log(title);
    // console.log(description);
    // console.log(date);
    // console.log(hour);
    // console.log(place);

    const event:Evento = new Evento(null, title, description, new Date(date), hour, place, new User(2,"Paco","paco@","","",""));

    this.eventService.createEvent(event);
    this.emptyContainer("alertEvent");
    const element = document.getElementById("alertEvent");
    element.innerHTML += "<p>Evento creado correctamente</p>";

  }

  public closeModalAddEvent():void {
    this.eventService.closeModalCreateEvent();
  }

  private emptyContainer(idContainer:string){
    const element = document.getElementById(idContainer);
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }


}
