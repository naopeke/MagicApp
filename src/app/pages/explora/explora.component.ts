
import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Card } from 'src/app/models/card';
import { Deck } from 'src/app/models/deck';
import { DeckService } from 'src/app/shared/deck.service';


@Component({
  selector: 'app-explora',
  templateUrl: './explora.component.html',
  styleUrls: ['./explora.component.css'],

})
export class ExploraComponent implements OnInit {
  
  public datos: Deck[]
  public mazos: Deck[]
  public cards: Card[]
  public mejoresMazos: Deck[]
  
  public mazo: Deck = { nameDeck: '', cards: [] };
  public card: Card
  public explorar: boolean = false
  public id_card: number
  public showCardInfo: boolean = false
  public animation: boolean = false
 

  constructor(private router:Router,
              private toastr:ToastrService,
              public deckService: DeckService){
    this.datos = [
      new Deck(1, 'Dragonfly', 'Kaoser', [5], 5,[ new Card(25, '1', 0,"../../../assets/images/landing/carta1landing.png"),
        new Card(1, '2', 0,"../../../assets/images/landing/carta1landing.png"),
        new Card(2, '3', 0,"../../../assets/images/landing/carta1landing.png"),
        new Card(3, '4', 0,"../../../assets/images/landing/carta1landing.png")], 
     ), 
      new Deck(2, 'onFire', 'Kaoser', [5], 5, [ 
        new Card(4, '1', 0,"../../../assets/images/landing/carta1landing.png"),
        new Card(5, '2', 0,"../../../assets/images/landing/carta1landing.png"),
        new Card(6, '3', 0,"../../../assets/images/landing/carta1landing.png"),
        new Card(7, '4', 0,"../../../assets/images/landing/carta1landing.png"),
        new Card(8,'5', 0,"../../../assets/images/landing/carta1landing.png"),
        new Card(9, '6', 0,"../../../assets/images/landing/carta1landing.png"),
        new Card(10, '7', 0,"../../../assets/images/landing/carta1landing.png"),
        new Card(11, '8', 0,"../../../assets/images/landing/carta1landing.png"),
        new Card(12, '9', 0,"../../../assets/images/landing/carta1landing.png"),
        new Card(13, '10', 0,"../../../assets/images/landing/carta1landing.png"),
        new Card(14, '11', 0,"../../../assets/images/landing/carta1landing.png"),
        new Card(15, '12', 0,"../../../assets/images/landing/carta1landing.png")], 
    ),
      new Deck(3, 'Dragonfly', 'Deimos', [5], 5, [ 
        new Card(16, '1', 0,"../../../assets/images/landing/carta1landing.png"),
        new Card(17, '2', 0,"../../../assets/images/landing/carta1landing.png"),
        new Card(18, '3', 0,"../../../assets/images/landing/carta1landing.png"),
        new Card(19, '4', 0,"../../../assets/images/landing/carta1landing.png"),
        new Card(20, '5', 0,"../../../assets/images/landing/carta1landing.png"),
        new Card(21, '6', 0,"../../../assets/images/landing/carta1landing.png"),
        new Card(22, '7', 0,"../../../assets/images/landing/carta1landing.png"),
        new Card(23, '8', 0,"../../../assets/images/landing/carta1landing.png"),
        new Card(24, '9', 0,"../../../assets/images/landing/carta1landing.png")], 
   )
    ]

  }

  ngOnInit(): void {
    this.getSharedDecks();
    this.getVotedDeck();
    
  }

  public getSharedDecks(){
    this.deckService.getSharedDecks().subscribe((res:any) => {
      if(!res.error){
        this.mazos = res.data
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
      } else {
        this.toastr.error(res.mensaje, 'Ups')
      }
    })
  }
  
  public search(input:string, filter:string){
   
    if (filter === 'nombreUsuario'){
      this.deckService.getDeckByUser(input).subscribe((res:any) => {
        if(!res.error){
          this.mazos = res.data
        } else {
          this.toastr.error(res.mensaje, '¡Ups!')
          this.getSharedDecks();
        }
      })
    }

    else if(filter === 'nombreMazo'){
      this.deckService.getDeckByDeck(input).subscribe((res:any) =>{
        if(!res.error){
          this.mazos = res.data
        } else {
          this.toastr.error(res.mensaje, '¡Ups!')
          this.getSharedDecks();
        }
      })
    }
  
  }
  
  public seleccionMazo(id_deck:number){
    this.explorar = true
    this.deckService.getDeckById(id_deck).subscribe((res:any) => {
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

  public score(event:{id_deck:number, score:number}){
    this.mazos.find ((deck) => {
      if(deck.id_deck == event.id_deck){
        this.deckService.putMediaScore(event.score,event.id_deck).subscribe((res:any) => {
          if(!res.error){
            this.getVotedDeck();
            this.getSharedDecks();
            this.toastr.success(`Has dado una puntuación de ${event.score}`, '¡Gracias por votar!')
          } else {
            this.toastr.error(res.me)
          }
        })
      } else {
        console.log('error');
        }
    })
  }
  
  public close(){
   this.explorar = false
   this.router.navigateByUrl('/explora')
  }
  
  public idCard(id_card:number){
    console.log(id_card);
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
