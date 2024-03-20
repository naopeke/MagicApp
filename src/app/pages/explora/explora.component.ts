
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
  public filter:string
  public card: Card
  public explorar: boolean = false
  public id_deck:number

  public id_card: number
  public showCardInfo: boolean = false
  public animation: boolean = false
   
 

  constructor(private router:Router,
              private toastr:ToastrService,
              public deckService: DeckService){
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
    this.deckService.getDeck(filter, input).subscribe((res:any)=> {
      if(!res.error)
      this.mazos = res.data
      else {
      this.toastr.error(res.mensaje, '¡Ups!')
      this.getSharedDecks()
      }
    })
  }
  
  public filtro(filter:string){
    this.filter = filter
    this.seleccionMazo(this.id_deck)
    
  }
  public seleccionMazo(id_deck:number){
    this.id_deck = id_deck
    this.explorar = true
    this.deckService.getDeckById(this.id_deck, this.filter).subscribe((res:any) => {
      if(!res.error){
        this.mazo.nameDeck = res.data
        this.mazo.cards = res.data.cards
        this.router.navigateByUrl('/explora#exploraSection')
        console.log(this.mazo);
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
