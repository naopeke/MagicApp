
import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Card } from 'src/app/models/card';
import { Deck } from 'src/app/models/deck';
import { User } from 'src/app/models/user';
import { DeckService } from 'src/app/shared/deck.service';
import { UsersService } from 'src/app/shared/users.service';


@Component({
  selector: 'app-explora',
  templateUrl: './explora.component.html',
  styleUrls: ['./explora.component.css'],

})
export class ExploraComponent implements OnInit {
  
  public currentUser: User | null;
  public userLoaded: boolean = false
  public datos: Deck[]
  public mazos: Deck[]
  public cards: Card[]
  public mejoresMazos: Deck[]
  
  public mazo: Deck = { nameDeck: '', cards: [] };
  public filter:string
  public style:number;
  public card: Card
  public explorar: boolean = false
  public id_deck:number

  public id_card: number
  public showCardInfo: boolean = false
  public animation: boolean = false
   
 

  constructor(private router:Router,
              private toastr:ToastrService,
              public deckService: DeckService,
              public userService: UsersService){
  
  }

  async ngOnInit(): Promise<void> {
    await this.loadCurrentUser();
    this.getSharedDecks();
    this.getVotedDeck();
  }

  private async loadCurrentUser(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.userService.currentUserChanges().subscribe(user => {
        this.currentUser = user;
        resolve(); 
      });
    });
  }

  public getSharedDecks(){
    this.deckService.getSharedDecks().subscribe((res:any) => {
      if(!res.error){
        this.mazos = res.data
        // this.mazos.forEach(mazo =>{
        //   if(mazo.id_user == this.currentUser.id_user){
        //     mazo.typeRating = 3
        //   } else {
        //     let currentDate = new Date().toISOString().slice(0, 10);
        //     let typeAssigned = false
        //     mazo.previousScore.forEach(score => {
        //       if(score.date == currentDate && score.userVotes == this.currentUser.id_user){
        //         mazo.typeRating = 3;
        //         typeAssigned = true
        //       } 
        //     })
        //     if(!typeAssigned){
        //       mazo.typeRating = 1
        //     }
        //   }
        // })
      }
      else {
        this.toastr.error(res.mensaje, 'Ups')
      }
    })
  }
  public getVotedDeck(){
    this.deckService.getVotedDeck().subscribe((res:any) =>{
      if(!res.error){
        this.mejoresMazos = res.data
        // this.mejoresMazos.forEach(mazo => {
        //   mazo.typeRating = 2
        // })
      } else {
        this.toastr.error(res.mensaje, 'Ups')
      }
    })
  }
  
  public search(input:string, filter:string){
    this.deckService.getDeck(filter, input).subscribe((res:any)=> {
      if(!res.error)
      this.mazos = res.data
      else {
      this.toastr.error(res.mensaje, '¡Ups!')
      this.getSharedDecks()
      }
    })
  }
  
  public filtro(filter:string, style:number){
    this.filter = filter
    this.style = style
    this.seleccionMazo(this.id_deck)
  }

  public seleccionMazo(id_deck:number){
    this.id_deck = id_deck
    this.explorar = true
    this.deckService.getDeckById(this.id_deck, this.filter).subscribe((res:any) => {
      if(!res.error){
        this.mazo.nameDeck = res.data.nameDeck
        this.mazo.cards = res.data.cards
        this.router.navigateByUrl('/explora#exploraSection')
      } else {
        this.explorar = false
        this.toastr.error(res.mensaje, '¡Ups!')
      }
    })
  }
  
  public totalQuantity(deck:Deck){
    return deck.cards.reduce((ammount, card) => ammount + card.quantity, 0);
  }

  public score(event:{id_deck:number, score:number}){
    this.mazos.find ((deck) => {
      if(deck.id_deck == event.id_deck){
        this.deckService.putMediaScore(this.currentUser.id_user,event.id_deck, event.score).subscribe((res:any) => {
          if(!res.error){
            this.getVotedDeck();
            this.getSharedDecks();
            this.toastr.success(`Has dado una puntuación de ${event.score}`, '¡Gracias por votar!')
          } else {
            this.toastr.error(res.mensaje, 'Ups')
          }
        })
      } 
    })
  }

  public close(){
    this.explorar = false
    this.router.navigateByUrl('/explora')
  }
  
  public idCard(id_card:number){
    this.id_card = id_card
  }
  openCardInfo(cartaId:string){
    this.card = this.mazo.cards.find(carta => carta.id === cartaId);
    if (this.card) {
      this.showCardInfo = true;
      setTimeout(() => {
        this.animation = true
      },100)
    }
  }

  closeCardInfo(event:boolean){
    this.animation = false
    setTimeout(() => {
      this.showCardInfo = event
    },800)
  }

}
