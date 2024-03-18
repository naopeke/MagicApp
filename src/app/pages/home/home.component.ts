import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Deck } from 'src/app/models/deck';
import { Eventos } from 'src/app/models/eventos';
import { User } from 'src/app/models/user';
import { EventosService } from 'src/app/shared/eventos.service';
import { UsersService } from 'src/app/shared/users.service';

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

  public currentUser: User | null;
  public eventosProx: Eventos[];
  public eventoCom: Eventos[];
  public bestMazos: Deck[]
  public selectEvento: Eventos | undefined

  constructor(public eventoService: EventosService,
              public userService:UsersService,
              private toastr: ToastrService,
              private router:Router){

              }

ngOnInit(): void {
  this.userService.currentUserChanges().subscribe(user =>{
  this.currentUser = user
  console.log(this.currentUser);
  
  })

  this.getMyEvents();
  this.getEventCom();
  this.getBestDecks();
}

  public getMyEvents(){
    this.eventoService.getMyEventsHome(this.currentUser.id_user).subscribe((res:any) =>{
      
      if(!res.error){
        this.eventosProx = res.data
        console.log(this.eventosProx);
        
      }
      else {
        this.toastr.info(res.mensaje, '¡Ups!')
      }
    })
  }

  public getEventCom(){
    this.eventoService.getEventsCommunity(this.currentUser.id_user).subscribe((res:any) => {
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

      }  else {
        this.toastr.info(res.mensaje, '¡Ups!')
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
