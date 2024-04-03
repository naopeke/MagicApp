import { Component} from '@angular/core';
import { FormGroup} from '@angular/forms';
import { Evento } from 'src/app/models/evento';
import { User } from 'src/app/models/user';
import { EventosService } from 'src/app/shared/eventos.service';
import { Response } from 'src/app/models/response';
import { UsersService } from 'src/app/shared/users.service';
import { Eventos } from 'src/app/models/eventos';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})

export class EventoComponent {

  public events:Evento[];
  public eventoABorrar:Evento;
  public evento:Evento;
  public id_logueado: User;
  public modalEdit:boolean = false;
  public modalAdd:boolean = false;
  // Belen: te añado para abrir modal detalle evento
  public modalDetail:boolean = false
  public selectEvento: Eventos | undefined;

  paginatedEvents:any[] = [];
  currentPage:number = 0;
  totalPages:number = 0;
  itemsPerPage:number = 4;
  
  nombreEvento = '';

  editForm: FormGroup;

  constructor(private eventService: EventosService, private usersService: UsersService){

  }

  ngOnInit(): void {
    // this.id_logueado = this.usersService.getCurrentUserId();
    this.usersService.currentUserChanges().subscribe(user =>{
      this.id_logueado = user
      })
    this.getAllEventsForBBDD();
  }

  getAllEventsForBBDD(){

    console.log("getAllEventsForBBDD");
    this.eventService.getAllEvents().subscribe((respuesta: Response) => {
      // Recorrer el array "data" y añadir los eventos a "this.events" manualmente
      // Usando un bucle for
      //console.log(data);
      let nuevosEventos: Evento[] = [];

      for (let i = 0; i < respuesta.data.length; i++) {
        const eventoData = respuesta.data[i];
    
        // console.log(eventoData);
        let nuevoEvento = new Evento(eventoData.id, eventoData.title, eventoData.descriptionEvent, eventoData.date, eventoData.hour, eventoData.place, new User(eventoData.creator.id_user, eventoData.creator.nameUser, null, null, null, null, eventoData.creator.avatar),eventoData.direction);
        // console.log(nuevoEvento);
    
        nuevosEventos.push(nuevoEvento);
      }

      this.events = nuevosEventos;
      console.log(this.events);
      this.calculatePagination();
    })

  }

  getMyEventsForBBDD(){

    console.log("getMyEventsForBBDD");
    this.eventService.getMyEvents(this.id_logueado.id_user).subscribe((respuesta: Response) => {
      // Recorrer el array "data" y añadir los eventos a "this.events" manualmente
      // Usando un bucle for
      //console.log(data);
      let nuevosEventos: Evento[] = [];

      for (let i = 0; i < respuesta.data.length; i++) {
        const eventoData = respuesta.data[i];
    
        //console.log(eventoData);
        let nuevoEvento = new Evento(eventoData.id, eventoData.title, eventoData.descriptionEvent, eventoData.date, eventoData.hour, eventoData.place, new User(eventoData.creator.id_user, eventoData.creator.nameUser, null, null, null, null, eventoData.creator.avatar),eventoData.direction);
        //console.log(nuevoEvento);
    
        nuevosEventos.push(nuevoEvento);
      }

      this.events = nuevosEventos;
      // console.log(this.events);
      this.calculatePagination();
    })

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
 
  getModalEditEvent(){
    return this.eventService.getModalEditEvent();
  }

  findEventsWithNameMyEvents(tituloEvento:string){

    console.log("llamo a mis eventos filtrado");
    if(tituloEvento == "")
    {
      this.getMyEventsForBBDD();
    }else{
      this.events = this.events.filter(event => event.title.toLowerCase().includes(tituloEvento.toLowerCase()));
      console.log(this.events);
    }
    this.calculatePagination();
  }

  findEventsWithNameAllEvents(tituloEvento:string){
    console.log("llamo a todos eventos filtrado");
    if(tituloEvento == "")
    {
      this.getAllEventsForBBDD();
    }else{
      console.log(this.events);
      this.events = this.events.filter(event => event.title.toLowerCase().includes(tituloEvento.toLowerCase()));
      console.log(this.events);
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
    console.log(ev);
    
    this.setEventoEditar(ev);
    this.modalEdit = true
  }

  public openModalDetail(evento:Evento){
    console.log(evento);
    

    const ev = new Eventos(evento.id,evento.title, evento.description, evento.date, evento.hour, evento.place, evento.direction, evento.creator.nameUser, evento.creator.id_user, null);

    this.selectEvento = ev;
    console.log(this.selectEvento);
    
    this.modalDetail = true;
  }

  // Cierrar Modals
  closeModalAdd(event: boolean){
    this.modalAdd = event
  }
  closeModal(event: boolean){
    this.modalEdit = event
  }
  closeModalSaberMas(event: boolean){
    this.modalDetail = event
  }


}
