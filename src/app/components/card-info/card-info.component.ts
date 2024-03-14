import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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
    //TODO: llamar a servicio por id y incializar "card" con los datos reales de BBDD
    console.log('carta: ', this.carta); 

}
  ngOnChanges(changes: SimpleChanges): void {
    // cartaプロパティの変更を検知
    if (changes.carta) {
      console.log('Updated carta:', this.carta);
      // 必要ならばここで更に処理を行う
    }
  }

}