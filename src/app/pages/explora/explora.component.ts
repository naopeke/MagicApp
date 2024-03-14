
import { Component} from '@angular/core';
import { Router} from '@angular/router';
import { Card } from 'src/app/models/card';
import { Deck } from 'src/app/models/deck';


@Component({
  selector: 'app-explora',
  templateUrl: './explora.component.html',
  styleUrls: ['./explora.component.css'],

})
export class ExploraComponent {
  
  public datos: Deck[]
  
  public mazo: Deck
  public explorar: boolean = false
  public id_card: number
  public showCardInfo: boolean = false
  public animation: boolean = false
 

  constructor(private router:Router){
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
  
  public search(input:string, filter:string){
  // instalar TOASTR PARA ERRORES
    console.log(this.datos[0].nameUser);
    
    if (filter === 'nombreUsuario'){
      let datosFilter = this.datos.filter((dato) => {
        return dato.nameUser == input
      })
        if(datosFilter.length != 0){
          this.datos = datosFilter
        } else {
          console.log('Usuario no encontrado');
        }
    }

    else if(filter === 'nombreMazo'){
      let datosFilter = this.datos.filter((dato) => {
        return dato.nameDeck == input
      })
      if(datosFilter.length != 0){
        this.datos = datosFilter
      } else {
        console.log('Mazo no encontrado');
      }
    }
  
  }
  
  public seleccionMazo(id_deck:number){
    this.explorar = true
    let cartas = this.datos.find ((deck) => {
      return deck.id_deck == id_deck
    })

   this.mazo = cartas
   this.router.navigateByUrl('/explora#exploraSection')
   
 
  }

  public score(event:{id_deck:number, score:number}){
      this.datos.find ((deck) => {

      if(deck.id_deck == event.id_deck){
        deck.scores.push(event.score)
        deck.mediaScore = this.mediaScore(deck.scores)
        alert(`Has dado una puntuación de ${event.score}`)
      }
    })
  }

  public mediaScore(array: number[]){
    let suma = array.reduce( (accumulator, currentValue) => accumulator + currentValue)
    let media = (suma/array.length).toFixed(1)
  
    return parseFloat(media)
  }

  public close(){
   this.explorar = false
   this.router.navigateByUrl('/explora')
  }
  
  public idCard(id_card:number){
    console.log(id_card);
    this.id_card = id_card
    
  }
  openCardInfo(){
    this.showCardInfo = true
    setTimeout(() => {
      this.animation = true
    },100)
    
  }

  closeCardInfo(event:boolean){
    this.animation = false
    setTimeout(() => {
      this.showCardInfo = event
    },800)

  }
  



}
