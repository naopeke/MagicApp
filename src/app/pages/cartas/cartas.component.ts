import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user'
import { UsersService } from 'src/app/shared/users.service';
import { Card } from 'src/app/models/card'
import { CardsService } from 'src/app/shared/cards.service';

@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.component.html',
  styleUrls: ['./cartas.component.css']
})
export class CartasComponent  implements OnInit {
  public cards: Card[];

  constructor(public usersService: UsersService, public cardsService: CardsService)
  {}




  ngOnInit(): void {
      
  }

}
