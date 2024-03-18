import { Injectable } from '@angular/core';
import { Evento } from '../models/evento';
import { User } from '../models/user';
import { Eventos} from '../models/eventos';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EventosService {

  // Belen Home intenta arreglar
  private urlHome: string
   // Belen Home



  private url = "http://localhost:3000/eventos"

  // user1:User = new User(1, "Kreatimes", "juan@gmail.com", "1234", " ", "");
  // user2:User = new User(2, "Maxiglow", "pepito@gmail.com", "1234", " ", "");

  // ev1:Evento = new Evento(1,"Primer evento", "Evento especial 1", new Date(), "18:00", "Zona uno, Madrid", this.user1, "c/Santiago Bernabeu");
  // ev2:Evento = new Evento(2,"Segundo evento", "Evento especial 1", new Date(), "18:00", "Zona uno, Madrid", this.user1, "c/Santiago Bernabeu" );
  // ev3:Evento = new Evento(3,"Tercer evento", "Evento especial 1", new Date(), "18:00", "Zona uno, Madrid", this.user2, "c/Santiago Bernabeu");
  // ev4:Evento = new Evento(4,"Cuarto evento", "Evento especial 1", new Date(), "18:00", "Zona uno, Madrid", this.user2, "c/Santiago Bernabeu");
  // ev5:Evento = new Evento(5,"Cuarto evento", "Evento especial 1", new Date(), "18:00", "Zona uno, Madrid", this.user2, "c/Santiago Bernabeu");

  private events: Evento [];
  public modalCreateEvent:boolean;
  public modalDeleteEvent:boolean;
  public modalEditEvent:boolean;
  public modalSaberMas:boolean;



  constructor(private http: HttpClient) {

    // Belen Home
      this.urlHome = "http://localhost:3000/home"
    // Belen Home

    // this.events = [this.ev1, this.ev2, this.ev3, this.ev4, this.ev5];
    this.modalCreateEvent = false;
    this.modalDeleteEvent = false;
    this.modalEditEvent = false;
    this.modalSaberMas = false;
  }

  getAllEvents(){
    //return this.events;
    //console.log(this.http.get(this.url));
    return this.http.get(this.url);
  }

  getMyEvents(id_user:number){
    return this.http.get(this.url+"/"+id_user);
  }

  createEvent(newEvent:Evento){
    return this.http.post(this.url, newEvent);  
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
    // let borrar = this.events.findIndex(val => val.id == id);

    // if(borrar !== -1){
    //   this.events = this.events.filter(val => val.id != id);
    //   return true;
    // }else{
    //   return false;
    // }

    return this.http.delete(`${this.url}?id_event=${id}`)
  }

  
// Modal Crear evento
  getModalCreateEvent(){
    return this.modalCreateEvent;
  }
  closeModalCreateEvent(){
    this.modalCreateEvent = false;
  }
  openModalCreateEvent(){
    this.modalCreateEvent = true;
  }

  // Modal Delete
  getModalDeleteEvent(){
    return this.modalDeleteEvent;
  }
  closeModalDeleteEvent(){
    this.modalDeleteEvent = false;
  }
  openModalDeleteEvent(){
    this.modalDeleteEvent = true;
  }

  // Modal Editar evento
  getModalEditEvent(){
    return this.modalEditEvent;
  }
  closeModalEditEvent(){
    this.modalEditEvent = false;
  }
  openModalEditEvent(){
    this.modalEditEvent = true;
  }

  // Belen home

  getMyEventsHome(id_user:number):Observable<object>{
    return this.http.get(this.urlHome + '/' + id_user)
  }

  getEventsCommunity(id_user:number):Observable<object>{
    return this.http.get(this.urlHome + '/' + 'eventosComunidad/' + id_user)
  }

  getBestDecks():Observable<object>{
    return this.http.get(this.urlHome + '/' + 'mejores/' + 'mazos')
  }

  getParticipantes(id_event:number):Observable<object>{
    return this.http.get(this.urlHome + '/detalleEvento/' + id_event)
  }
  postPartipacion(id_user:number, id_event:number):Observable<object>{
    const body = {
      id_user: id_user,
      id_event: id_event
    };
    return this.http.post(this.urlHome + '/detalleEvento/', body)
  }

  deleteParticipacion(id_user:number, id_event:number):Observable<object>{
    const options = {
      body: {
        id_user: id_user,
        id_event: id_event
      }
    };
    return this.http.delete(this.urlHome +'/abandonar', options)
  }

  

  // Belen home
}


// *NOTE - CALENDARIO
// router.get('/calendario, ) saber eventos tanto true como false en participation 
// router.post('/calendario, ) añadir evento indicando mi id_user
  // parametro de la funcion (id_user, Event) por body
// router.put('/calendario, ) modificar p<rticipacion del evento(pasar participation a false)
// router.delete('/calendario, ) eliminar evento solo mi id_user de loggin coincide con del creador

// *NOTE - EVENTOS

// router.get('/eventos, ) aparezcan todos los eventos
// router.get('/eventos/?id_user, ) filtro para que aparezcan solo los eventos del usuario
// router.get('/eventos/??????, ) filtro para que aparezcan solo los eventos que NO son creados por el usuario

// router.post('/eventos, ) añadir evento con el id_user del logging
// router.put('/eventos, ) editar evento solo mi id_user de loggin coincide con del creador
// router.delete('/eventos, ) eliminar evento solo mi id_user de loggin coincide con del creador