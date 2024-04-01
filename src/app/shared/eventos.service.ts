import { Injectable } from '@angular/core';
import { Evento } from '../models/evento';
import { User } from '../models/user';
import { Eventos} from '../models/eventos';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class EventosService {

  // Belen Home intenta arreglar
  private urlHome: string
   // Belen Home

  private urlCalendar: string; 


  private url = environment.url;
  // private url = "http://localhost:3000/eventos"
  // private url = "https://magy-deck-api.vercel.app/eventos"; 


  private events: Evento [];
  public modalCreateEvent:boolean;
  public modalDeleteEvent:boolean;
  public modalEditEvent:boolean;
  public modalSaberMas:boolean;



  constructor(private http: HttpClient) {

    // // Belen Home
    //   this.urlHome = "http://localhost:3000/home"
    // // Belen Home

    // //Calendar
    // this.urlCalendar = "http://localhost:3000/calendario"
    // //calendar

    // this.events = [this.ev1, this.ev2, this.ev3, this.ev4, this.ev5];
    this.modalCreateEvent = false;
    this.modalDeleteEvent = false;
    this.modalEditEvent = false;
    this.modalSaberMas = false;
  }

  getAllEvents(){
    return this.http.get(this.url);
  }

  getMyEvents(id_user:number){
    return this.http.get(this.url+"/"+id_user);
  }

  createEvent(newEvent:Evento){
    return this.http.post(this.url, newEvent);  
  }

  modifyEvent(newEvent:Evento){
    //Buscamos el indice del array donde se encuentra el evento a modificar,
    //modificamos ese elemento del array por el nuevo
    //devolvemos true si se ha modificado correctamente, false en caso de no encontrarlo.

    console.log("LLAMO AL SERVICE A EDITAR EVENTO");
    console.log(newEvent);

    // let body = {
    //   id: newEvent.id,
    //   title: newEvent.title,
    //   date: newEvent.date,
    //   hour: newEvent.hour,
    //   place: newEvent.place,
    //   description: newEvent.description,
    //   direction: newEvent.direction,
    // }

    return this.http.put(this.url, newEvent);  
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


  //calendar
  getMyEventsCalendar(id_user:number):Observable<object>{
    return this.http.get(this.url + '/calendario' + '/' + id_user)
    //    return this.http.get(this.urlCalendar + '/' + id_user)
  }

  getMyEventsCalendarDate(id_user:number, date:String):Observable<object>{
    return this.http.get(this.url + '/calendario' + '/' + id_user + '/' + date);
    //    return this.http.get(this.urlCalendar + '/' + id_user + '/' + date);
  }

  // Belen home

  getMyEventsHome(id_user:number):Observable<object>{
    return this.http.get(this.url + '/home' + '/' + id_user)
    //    return this.http.get(this.urlHome + '/' + id_user)
  }

  getEventsCommunity(id_user:number):Observable<object>{
    return this.http.get(this.url + '/home' + '/' + 'eventosComunidad/' + id_user)
    //    return this.http.get(this.urlHome + '/' + 'eventosComunidad/' + id_user)
  }

  getBestDecks():Observable<object>{
    return this.http.get(this.url + '/home' + '/' + 'mejores/' + 'mazos')
    //    return this.http.get(this.urlHome + '/' + 'mejores/' + 'mazos')
  }

  getParticipantes(id_event:number):Observable<object>{
    return this.http.get(this.url + '/home' + '/detalleEvento/' + id_event)
    //    return this.http.get(this.urlHome + '/detalleEvento/' + id_event)
  }
  postPartipacion(id_user:number, id_event:number):Observable<object>{
    const body = {
      id_user: id_user,
      id_event: id_event
    };
    return this.http.post(this.url + '/home' + '/detalleEvento/', body)
    //    return this.http.post(this.urlHome + '/detalleEvento/', body)
  }

  deleteParticipacion(id_user:number, id_event:number):Observable<object>{
    const options = {
      body: {
        id_user: id_user,
        id_event: id_event
      }
    };
    return this.http.delete(this.url + '/home' +'/abandonar', options)
    //    return this.http.delete(this.urlHome +'/abandonar', options)
  }

  

  // Belen home
}