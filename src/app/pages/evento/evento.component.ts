import { Component} from '@angular/core';
import { FormGroup} from '@angular/forms';
import { Evento } from 'src/app/models/evento';
import { Logging } from 'src/app/models/logging';
import { User } from 'src/app/models/user';
import { EventosService } from 'src/app/shared/eventos.service';
import { Response } from 'src/app/models/response';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})

export class EventoComponent {

  public events:Evento[];
  public eventoABorrar:Evento;
  public evento:Evento;
  public login1:Logging;
  public login2:Logging;


  public modalEdit:boolean = false;
  public modalAdd:boolean = false;
  // public modalSaberMas:boolean = false;

  paginatedEvents:any[] = [];
  currentPage:number = 0;
  totalPages:number = 0;
  itemsPerPage:number = 4;
  
  user1:User = new User(1, "Kreatimes", "juan@gmail.com", "1234", " ", "");
  user2:User = new User(2, "Maxiglow", "pepito@gmail.com", "1234", " ", "");

  nombreEvento = '';

  editForm: FormGroup;

  constructor(private eventService: EventosService){

    this.getAllEventsForBBDD();
    
    //Recuperar del service o cogerlo del header
    this.login1 = new Logging(this.user1, true);
    this.login2 = new Logging(this.user2, false);
  }

  getAllEventsForBBDD(){

    this.eventService.getAllEvents().subscribe((respuesta: Response) => {
      // Recorrer el array "data" y añadir los eventos a "this.events" manualmente
      // Usando un bucle for
      //console.log(data);
      let nuevosEventos: Evento[] = [];

      for (let i = 0; i < respuesta.data.length; i++) {
        const eventoData = respuesta.data[i];
    
        // console.log(eventoData);
        let nuevoEvento = new Evento(eventoData.id, eventoData.title, eventoData.descriptionEvent, eventoData.date, eventoData.hour, eventoData.place, new User(eventoData.creator.id_user, eventoData.creator.nameUser, null, null, null, null),eventoData.direction);
        // console.log(nuevoEvento);
    
        nuevosEventos.push(nuevoEvento);
      }

      this.events = nuevosEventos;
      // console.log(this.events);
      this.calculatePagination();
    })

  }

  getMyEventsForBBDD(){

    this.eventService.getMyEvents(4).subscribe((respuesta: Response) => {
      // Recorrer el array "data" y añadir los eventos a "this.events" manualmente
      // Usando un bucle for
      //console.log(data);
      let nuevosEventos: Evento[] = [];

      for (let i = 0; i < respuesta.data.length; i++) {
        const eventoData = respuesta.data[i];
    
        console.log(eventoData);
        let nuevoEvento = new Evento(eventoData.id, eventoData.title, eventoData.descriptionEvent, eventoData.date, eventoData.hour, eventoData.place, new User(eventoData.creator.id_user, eventoData.creator.nameUser, null, null, null, null),eventoData.direction);
        console.log(nuevoEvento);
    
        nuevosEventos.push(nuevoEvento);
      }

      this.events = nuevosEventos;
      console.log(this.events);
      this.calculatePagination();
    })

  }

  //Función elimiar evento
  deleteEvent(idEvent:number){
    
  }

  //Métodos para la paginación
  //Calcula numero  paginas
  calculatePagination() {
    this.totalPages = Math.ceil(this.events.length / this.itemsPerPage);
    this.paginatedEvents = this.events.slice(this.currentPage * this.itemsPerPage, (this.currentPage + 1) * this.itemsPerPage);
  }
  //Función calcular pgina anterior
  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.calculatePagination();
    }
  }
  //Función calcular página siguiente
  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.calculatePagination();
    }
  }

  // llamar al componente add-event
  openModalAddEvent(){
    this.eventService.openModalCreateEvent();
  }

  getModalCreateEvent(){
    return this.eventService.getModalCreateEvent();
  }

  openModalDeleteEvent(ev:Evento){
    this.setEventoAEliminar(ev);
    this.eventService.openModalDeleteEvent();
  }

  openModalEditEvent(ev:Evento){
    this.setEventoEditar(ev);
    this.eventService.openModalEditEvent();
  }

  getModalDeleteEvent(){
    return this.eventService.getModalDeleteEvent();
  }
  // getModalSaberMas(){
  //   return this.eventService.getModalSaberMas();
  // }
  getModalEditEvent(){
    return this.eventService.getModalEditEvent();
  }

  findEventsWithNameMyEvents(tituloEvento:string){

    console.log("llamo a mis eventos");
    this.getMyEventsForBBDD();
    if(tituloEvento == "")
    {
      this.getMyEventsForBBDD();
    }else{
      this.events = this.events.filter(event => event.title.includes(tituloEvento));
    }
    this.calculatePagination();
  }

  findEventsWithNameAllEvents(tituloEvento:string){
    console.log("llamo a todos eventos");
    this.getAllEventsForBBDD();
    if(tituloEvento == "")
    {
      this.getAllEventsForBBDD();
    }else{
      this.events = this.events.filter(event => event.title.includes(tituloEvento));
    }
    this.calculatePagination();
  }

  // Para que se pueda acceder a la modal desde fuera
  setEventoAEliminar(ev:Evento){
    this.eventoABorrar = ev;
  }
  setEventoEditar(ev:Evento){
    this.evento = ev;
  }

  // Abrir Modal
  openModalAdd(){
    this.modalAdd = true
  }
  // openModalSaberMas(){
  //   this.modalSaberMas = true
  // }
  openModalEdit(ev:Evento){
    this.setEventoEditar(ev);
    this.modalEdit = true
  }

  // Cierrar Modals
  closeModalAdd(event: boolean){
    this.modalAdd = event
  }
  closeModal(event: boolean){
    this.modalEdit = event
  }
  // closeModalSaberMas(event: boolean){
  //   this.modalSaberMas = event
  // }
}
