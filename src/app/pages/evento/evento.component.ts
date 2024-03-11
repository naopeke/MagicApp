import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Evento } from 'src/app/models/evento';
import { Logging } from 'src/app/models/logging';
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

  public login1:Logging;
  public login2:Logging;


  paginatedEvents: any[] = []; // Array to hold events for current page
  currentPage: number = 0;
  totalPages: number = 0;
  itemsPerPage: number = 4;
  

  user1:User = new User(1, "Kreatimes", "juan@gmail.com", "1234", " ", "");
  user2:User = new User(2, "Maxiglow", "pepito@gmail.com", "1234", " ", "");

  nombreEvento = '';

  // ev1:Evento = new Evento("Primer evento", "Evento especial 1", new Date(), "18:00", "Zona uno, Madrid", this.user1);
  // ev2:Evento = new Evento("Segundo evento", "Evento especial 1", new Date(), "18:00", "Zona uno, Madrid", this.user1);
  // ev3:Evento = new Evento("Tercer evento", "Evento especial 1", new Date(), "18:00", "Zona uno, Madrid", this.user2);
  // ev4:Evento = new Evento("Cuarto evento", "Evento especial 1", new Date(), "18:00", "Zona uno, Madrid", this.user2);
  // ev5:Evento = new Evento("Cuarto evento", "Evento especial 1", new Date(), "18:00", "Zona uno, Madrid", this.user2);

  editForm: FormGroup;

  constructor(private eventService: EventosService, private router: Router){

    //Se debe llamar al service para recoger los eventos
    //this.events = [this.ev1, this.ev2, this.ev3, this.ev4, this.ev5];
    //this.eventService.getAllEvents().subscribe((data:Evento[]) => {this.events = data})
    this.events = this.eventService.getAllEvents();

    //Recuperar del service o cogerlo del header
    this.login1 = new Logging(this.user1, true);
    this.login2 = new Logging(this.user2, false);

    this.calculatePagination();



  }

  //Calcula numero  paginas
  calculatePagination() {
    this.events = this.eventService.getAllEvents();
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

    console.log(this.eventService.deleteEvent(idEvent));
    this.events = this.eventService.getAllEvents();

    console.log("evento eliminado correctamente");
  }

  editEvent(id:number,title:string, description:string, date:string, hour:string, place:string, creator:User) {
    //El creador se tiene que coger del login que este en el service de usuario
    
    // console.log("LLAMO A CREAR EVENTO");
    // console.log(title);
    // console.log(description);
    // console.log(date);
    // console.log(hour);
    // console.log(place);

    const event:Evento = new Evento(id, title, description, new Date(date), hour, place, creator);

    console.log(event);

    console.log(this.eventService.modifyEvent(event));

    console.log("Se modifica correctamente");
    /*this.emptyContainer("alertEvent");
    const element = document.getElementById("alertEvent");
    element.innerHTML += "<p>Evento creado correctamente</p>";*/
    this.events = this.eventService.getAllEvents();
    //this.reload();
    //this.calculatePagination();

  }

  reload() {
    this.router.navigateByUrl('evento');
  }

  private emptyContainer(idContainer:string){
    const element = document.getElementById(idContainer);
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  // Funcion apuntar evento
  singUp(){
    console.log("apuntado al evento correctamente");
  }

  // formulario
  ngOnInit(): void {
    this.editForm = new FormGroup({
      tituloEvento: new FormControl('', Validators.required),
      hora: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required),
      lugar: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    });

    this.calculatePagination();
    
  }

  onSubmit() {
    // Enviar datos del formulario al servidor
    console.log(this.editForm.value);
  }

  // llamar al componente add-event
  openModalAddEvent(){
    this.eventService.openModalCreateEvent();
  }

  getModalCreateEvent(){
    return this.eventService.getModalCreateEvent();
  }

  findEventsWithName(tituloEvento:string){
 
    console.log(tituloEvento);
    this.events = this.eventService.getAllEvents();

    if(tituloEvento == "")
    {
      this.events = this.eventService.getAllEvents();
    }else{
      this.events = this.events.filter(event => event.title.includes(tituloEvento));
    }

    this.calculatePagination();
  }
  
  
}
