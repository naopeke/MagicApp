import { Injectable } from '@angular/core';
import { Evento } from '../models/evento';
import { User } from '../models/user';
import { Events } from '../models/event';

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
  public modalDeleteEvent:boolean;
  public modalEditEvent:boolean;

  // Belen: cree otra clase de eventos para la BBDD
  public eventos: Events[] 
   // Belen

  constructor() {
    this.events = [this.ev1, this.ev2, this.ev3, this.ev4, this.ev5];
    this.modalCreateEvent = false;
    this.modalDeleteEvent = false;
    this.modalEditEvent = false;

    // Belen
    this.eventos = [
      new Events(1, 'Partida entre amigos', 'partida informal', new Date(2024, 3, 15), '18:00', 'Centro MetMetropolis', 'C. de Andrés Mellado, 22, Chamberí, 28015 Madrid', false, 1),
      new Events(1, 'Torneo Estandar', 'Torneo de formato standard, quien gane se llevará como premio una carta misteriosa', new Date(2024, 3, 15), '21:00', 'Centro MetMetropolis', 'C. de Andrés Mellado, 22, Chamberí, 28015 Madrid', false, 1),
      new Events(1, 'Festival de Asesinatos en la Mansión Karlov', 'partida informal', new Date(2024, 3, 15), '18:00', 'Centro MetMetropolis', 'C. de Andrés Mellado, 22, Chamberí, 28015 Madrid', false, 1)
    ];
     // Belen
  }

  getAllEvents(){
    return this.events;
  }

  createEvent(newEvent:Evento){
    //El objeto viene del ts del componente relleno
    this.events.push(newEvent);
  }

  modifyEvent(newEvent:Evento){
    //Buscamos el indice del array donde se encuentra el evento a modificar,
    //modificamos ese elemento del array por el nuevo
    //devolvemos true si se ha modificado correctamente, false en caso de no encontrarlo.
    let cambiar = this.events.findIndex(val => val.id == newEvent.id);

    if(cambiar !== -1){
      this.events[cambiar] = newEvent;
      return true;
    }else{
      return false;
    }
  }

  deleteEvent(id:number){    
    //Buscamos el indice del array donde se encuentra el evento a eliminar,
    //creamos de nuevo el array sin ese elemento
    //devolvemos true si se ha borrado correctamente, false en caso de no encontrarlo.
    let borrar = this.events.findIndex(val => val.id == id);

    if(borrar !== -1){
      this.events = this.events.filter(val => val.id != id);
      return true;
    }else{
      return false;
    }
  }

  openModalCreateEvent(){
    this.modalCreateEvent = true;
  }

  openModalDeleteEvent(){
    this.modalDeleteEvent = true;
  }

  closeModalDeleteEvent(){
    this.modalDeleteEvent = false;
  }

  closeModalCreateEvent(){
    this.modalCreateEvent = false;
  }

  closeModalEditEvent(){
    this.modalEditEvent = false;
  }

  getModalCreateEvent(){
    return this.modalCreateEvent;
  }

  getModalDeleteEvent(){
    return this.modalDeleteEvent;
  }

  getModalEditEvent(){
    return this.modalEditEvent;
  }

  openModalEditEvent(){
    this.modalEditEvent = true;
  }

  // Belen home

// cuando el usuario no coincide con el id del logueado
  getEventsHome(){
    return this.eventos
  }
}
