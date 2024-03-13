import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  public modalDetail: boolean = false

  constructor(){}

  public openModal(){
    this.modalDetail = true
  }

  public closeModal(event:boolean){
    this.modalDetail = event
    console.log(event);
    
  }
}
