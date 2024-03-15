import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardsService } from 'src/app/shared/cards.service';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.css']
})
export class CardInfoComponent implements OnInit{
  @Output() onCardInfoClose = new EventEmitter<boolean>();
  @Input() origin: string;
  @Input() id_card: number;
  @Input() carta: Card; // recibir Card object

  public card: Card;
  public darkenOverlay: boolean = false;
  public show_cardinfo: boolean = false;

  public legalities: any[] = []; // para bucle de legalities


  // recibir el object de legalities y convertir a un array con map function
  // format : tipo de reglas ex.standard, modern, commander
  // statud : status de legalities  ex. legal, not legal 
  changeLegalitiesToArray(legalities:any): any[]{
    return Object.keys(legalities).map(key => ({
      format: key,
      status: legalities[key]
    }));
  }

  // cambio getColor de xisca
  public getColor(status: string){
    switch(status){
      case 'legal': return '#5C724B';
      case 'not legal': return '#616161';
      case 'restrict': return '#28669F';
      case 'banned': return '#B6281A';
      default: return 'grey';
    }
  }


  // legalities = [
  //   {text: 'not legal', color: 'grey'},
  //   {text: 'not legal', color: 'red'},
  //   {text: 'not legal', color: 'blue'},
  //   {text: 'not legal', color: 'green'},
  // ];

  // public getColor(value:string){
  //   if (value === 'not legal'){
  //     return '#616161'
  //   }
  //   else if (value === 'banned'){
  //     return '#B6281A'
  //   }
  //   else if (value === 'restrict'){
  //     return '#28669F'
  //   }
  //   else if (value === 'legal'){
  //     return '#5C724B'
  //   }
  // }

  public card_info_close(){
    this.onCardInfoClose.emit(false);
  }


  
  constructor(public cardsService: CardsService){}

  ngOnInit(): void {
    console.log('carta: ', this.carta); 
    this.legalities = this.changeLegalitiesToArray(this.carta.legalities);

}

}