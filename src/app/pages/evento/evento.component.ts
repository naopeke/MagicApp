import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Evento } from 'src/app/models/evento';
import { Logging } from 'src/app/models/logging';
import { User } from 'src/app/models/user';

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

  ev1:Evento = new Evento("Primer evento", "Evento especial 1", new Date(), "18:00", "Zona uno, Madrid", this.user1);
  ev2:Evento = new Evento("Segundo evento", "Evento especial 1", new Date(), "18:00", "Zona uno, Madrid", this.user1);
  ev3:Evento = new Evento("Tercer evento", "Evento especial 1", new Date(), "18:00", "Zona uno, Madrid", this.user2);
  ev4:Evento = new Evento("Cuarto evento", "Evento especial 1", new Date(), "18:00", "Zona uno, Madrid", this.user2);
  ev5:Evento = new Evento("Cuarto evento", "Evento especial 1", new Date(), "18:00", "Zona uno, Madrid", this.user2);

  editForm: FormGroup;

  constructor(){

    //Se debe llamar al service para recoger los eventos
    this.events = [this.ev1, this.ev2, this.ev3, this.ev4, this.ev5];

    //Recuperar del service o cogerlo del header
    this.login1 = new Logging(this.user1, true);
    this.login2 = new Logging(this.user2, false);

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
  deleteEvent(){
    console.log("evento eliminado correctamente");
  }

  // Funcion apuntar evento
  singUp(){
    console.log("apuntado al evento correctamente");
  }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      tituloEvento: new FormControl('', Validators.required),
      hora: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required),
      lugar: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    // Enviar datos del formulario al servidor
    console.log(this.editForm.value);
  }

}
