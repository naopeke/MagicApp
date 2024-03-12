import { Injectable } from '@angular/core';
import { Evento } from '../models/evento';
import { User } from '../models/user';
//import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  user1:User = new User(1, "Kreatimes", "juan@gmail.com", "1234", " ", "");
  user2:User = new User(2, "Maxiglow", "pepito@gmail.com", "1234", " ", "");

  ev1:Evento = new Evento(1,"Primer evento", "Evento especial 1", new Date(), "18:00", "Zona uno, Madrid", this.user1);
  ev2:Evento = new Evento(2,"Segundo evento", "Evento especial 1", new Date(), "18:00", "Zona uno, Madrid", this.user1);
  ev3:Evento = new Evento(3,"Tercer evento", "Evento especial 1", new Date(), "18:00", "Zona uno, Madrid", this.user2);
  ev4:Evento = new Evento(4,"Cuarto evento", "Evento especial 1", new Date(), "18:00", "Zona uno, Madrid", this.user2);
  ev5:Evento = new Evento(5,"Cuarto evento", "Evento especial 1", new Date(), "18:00", "Zona uno, Madrid", this.user2);

  private events: Evento [];
  public modalCreateEvent:boolean;

  constructor() {

      this.events = [this.ev1, this.ev2, this.ev3, this.ev4, this.ev5];

      this.modalCreateEvent = false;

   }

   getAllEvents(){
    console.log("LLAMO AL BACKEND PARA OBTENER LOS EVENTOS DE BASE DE DATOS");
    //console.log(this.http.get(this.url));
    //console.log(this.http.get(`${this.url}?id_book=${"1"}`));
    //return this.http.get(this.url);
    return this.events;
  }

  createEvent(newEvent:Evento){
    console.log("LLAMO AL BACKEND PARA AÑADIR UN EVENTO EN LA BASE DE DATOS");
    
    //El objeto viene del ts del componente relleno
    this.events.push(newEvent);
  }

  modifyEvent(newEvent:Evento){
    console.log("LLAMO AL BACKEND PARA MODIFICAR UN EVENTO EN LA BASE DE DATOS");
    
    //Buscamos el indice del array donde se encuentra el evento a modificar,
    //modificamos ese elemento del array por el nuevo
    //devolvemos true si se ha modificado correctamente, false en caso de no encontrarlo.
    console.log(newEvent);

    let cambiar = this.events.findIndex(val => val.id == newEvent.id);
    console.log(cambiar);
    if(cambiar !== -1){
      this.events[cambiar] = newEvent;
      console.log(this.events);
      return true;
    }else{
      console.log(this.events);
      return false;
    }

    
  }

  deleteEvent(id:number){
    console.log("LLAMO AL BACKEND PARA BORRAR UN EVENTO EN LA BASE DE DATOS");
    
    //Buscamos el indice del array donde se encuentra el evento a eliminar,
    //creamos de nuevo el array sin ese elemento
    //devolvemos true si se ha borrado correctamente, false en caso de no encontrarlo.
    console.log(id);

    let borrar = this.events.findIndex(val => val.id == id);
    if(borrar !== -1){
      this.events = this.events.filter(val => val.id != id);
      console.log(this.events);
      return true;
    }else{
      return false;
    }
    
  }

  // changeStatusModalCreateEvent(){
  //   this.modalCreateEvent = !this.modalCreateEvent;
  // }

  openModalCreateEvent(){
    this.modalCreateEvent = true;
    console.log("estado de la modal de crear evento = "+this.modalCreateEvent);
  }

  closeModalCreateEvent(){
    this.modalCreateEvent = false;
    console.log("estado de la modal de crear evento = "+this.modalCreateEvent);
  }

  getModalCreateEvent(){
    return this.modalCreateEvent;
  }


}
