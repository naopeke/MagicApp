import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Deck } from 'src/app/models/deck';
import { Eventos } from 'src/app/models/eventos';
import { EventosService } from 'src/app/shared/eventos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input () typeRating: number;
  @Input () dato: Deck
  @Output() eventoExplorar = new EventEmitter<number>();
  @Output() eventoPuntuacion = new EventEmitter<{id_deck:number, score:number}>()
 
  public modalDetail: boolean = false
  public modalDetail2: boolean = false
  // cambiarlo por el del servicio cuando esta logueado
  public id_user: number = 1
  public userName: string = 'Kreatimes'

  public eventosProx: Eventos[];
  public eventoCom: Eventos[]
  public bestMazos: Deck[]
  public selectEvento: Eventos | undefined



  constructor(public eventoService: EventosService,
              private toastr: ToastrService,
              private router:Router){}

ngOnInit(): void {
  this.getMyEvents();
  this.getEventCom();
  this.getBestDecks();
}

  public getMyEvents(){
    this.eventoService.getMyEvents(this.id_user).subscribe((res:any) =>{
      if(!res.error){
        this.eventosProx = res.data
      }
      else {
        this.toastr.info(res.mensaje, '¡Ups!')
      }
    })
  }

  public getEventCom(){
    this.eventoService.getEventsCommunity(this.id_user).subscribe((res:any) => {
      if(!res.error){
        this.eventoCom = res.data
      }  else {
        this.toastr.info(res.mensaje, '¡Ups!')
      }
    })
  }

  public getBestDecks(){
    this.eventoService.getBestDecks().subscribe((res:any) => {
      if(!res.error){
        this.bestMazos = res.data
        console.log(this.bestMazos);
        console.log(this.bestMazos[0].URLphoto);
        
        
      }  else {
        // poner con toast
        console.log(res.error);
        console.log(res.mensaje);
      }
    })
  }
  
  public openModal(evento:Eventos){
    this.selectEvento = evento
    this.modalDetail = true
  }
  public openModal2(evento:Eventos){
    this.modalDetail2 = true
    this.selectEvento = evento
  }
  

  public closeModal(event:boolean){
    this.modalDetail = event
    this.modalDetail2 = event
    if (event) {
      this.modalDetail2 = false;
    }
  }

  public goToEvents(){
    this.router.navigate(['/evento']);
  }
}
