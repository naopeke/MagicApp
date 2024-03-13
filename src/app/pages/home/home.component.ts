import { Component, OnInit } from '@angular/core';
import { Events } from 'src/app/models/event';
import { EventosService } from 'src/app/shared/eventos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public modalDetail: boolean = false
  public modalDetail2: boolean = false
  public modalDetail3: boolean = false
  
  public eventos: Events[];

  constructor(public eventoService: EventosService){}

ngOnInit(): void {
 this.eventos =  this.eventoService.getEventsHome()
}

  public openModal(){
    this.modalDetail = true
  }
  public openModal2(){
    this.modalDetail2 = true
  }
  public openModal3(){
    this.modalDetail3 = true
  }

  public closeModal(event:boolean){
    this.modalDetail = event
    this.modalDetail2 = event
    this.modalDetail3 = event
    console.log(event);
    
  }
}
