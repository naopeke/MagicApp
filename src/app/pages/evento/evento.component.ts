import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Evento } from 'src/app/models/evento';
import { User } from 'src/app/models/user';
import { AddEventComponent } from 'src/app/components/add-event/add-event.component';
import { EventosService } from 'src/app/shared/eventos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})

export class EventoComponent {

  public events:Evento[];
  public eventoABorrar:Evento;
  public eventoEditar:Evento;

  paginatedEvents: any[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  itemsPerPage: number = 4;
  
  user1:User = new User(1, "Kreatimes", "juan@gmail.com", "1234", " ", "");
  user2:User = new User(2, "Maxiglow", "pepito@gmail.com", "1234", " ", "");

  nombreEvento = '';

  editForm: FormGroup;

  constructor(private eventService: EventosService, private router: Router){
    //Se debe llamar al service para recoger los eventos

    this.events = this.eventService.getAllEvents();

    this.calculatePagination();
  }

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

  //Función elimiar evento
  deleteEvent(idEvent:number){
    this.events = this.eventService.getAllEvents();
  }

  reload() {
    this.router.navigateByUrl('evento');
  }

  // Funcion apuntar evento
  singUp(){
    // console.log("apuntado al evento correctamente");
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

  getModalEditEvent(){
    return this.eventService.getModalEditEvent();
  }

  findEventsWithName(tituloEvento:string){
    this.events = this.eventService.getAllEvents();
    if(tituloEvento == "")
    {
      this.events = this.eventService.getAllEvents();
    }else{
      this.events = this.events.filter(event => event.title.includes(tituloEvento));
    }
    this.calculatePagination();
  }

  setEventoAEliminar(ev:Evento){
    this.eventoABorrar = ev;
  }
  
  setEventoEditar(ev:Evento){
    this.eventoEditar = ev;
  }
}
