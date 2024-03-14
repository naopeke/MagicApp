import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Card } from 'src/app/models/card';
import { Deck } from 'src/app/models/deck';
import { CardsService } from 'src/app/shared/cards.service';

@Component({
  selector: 'app-mis-mazos',
  templateUrl: './mis-mazos.component.html',
  styleUrls: ['./mis-mazos.component.css']
})
export class MisMazosComponent implements OnInit, AfterViewInit {

  public datos: Deck[];
  public mazo: Deck;
  public datosVotados: Deck[];
  public card: Card;
  public cards: Card[];
  
  public filteredCards: Card[] = []; // para filtrar con tipos de cartas

  public isEditing: boolean = false; // edit mode
  public editedName: string = '';  // para guardar el nombre modificando

  public darkenOverlay:boolean = false; // modal de xisca
  public show_cardinfo:boolean = false; // modal de xisca



  @ViewChild('mySwiper') mySwiper: any = null; // Swiperの要素にアクセスするためのViewChild
  





  constructor(
    private cardsService: CardsService,
  ){
    this.datos = [
      new Deck(1, 'Dragonfly', 'Kaoser', [4], 4, [
        new Card(1, '1', 1,"https://cards.scryfall.io/normal/front/2/c/2c5a7550-fe1a-4797-9583-70ab56cfac0d.jpg?1707739807","Tomik, Wielder of Law","Legendary Creature","description", ["W", "B"], { "standard": "not_legal",  "commander": "legal"}, 1.05, "Load of the rings", "commander"),
        new Card(2, '2', 1,"https://cards.scryfall.io/large/front/d/5/d5806e68-1054-458e-866d-1f2470f682b2.jpg?1696020224","The One ring", "Lengendary Artifact", "description", ["P", "W"],{ "standard": "not_legal",  "commander": "legal"}, 0.99, "Load of the rings", "booster"
         ),
        new Card(3, '3', 1,"https://cards.scryfall.io/large/front/1/7/175b3d28-5c74-4972-9b5c-5e39762c78f4.jpg?1686964447", "Relic of Sauron", "Artifact", "description", ["B"],{ "standard": "not_legal", "commander": "not_legal"}, 5.10, "Load of the rings", "booster" ),
        new Card(4, '4', 1,"https://cards.scryfall.io/large/front/e/5/e57815d4-b21f-4ceb-a3f1-73cff5f0e612.jpg?1686968563", "March from the Black Gate", "Enchantment", "description", ["B"], { "standard": "not_legal", "commander": "not_legal"}, 3.01, "Load of the rings", "commander"), 
        new Card(5, '7', 1, "https://cards.scryfall.io/large/front/9/0/905f0dd4-0197-45f8-8e7f-396d6dcef600.jpg?1675956901", "The Eternal Wanderer", "Legendary Planeswalker", "description", ["B"], { "standard": "not_legal", "commander": "not_legal"}, 0.10, "SetName1", "SetType1" ),
      ]), 
      new Deck(2, 'onFire', 'Kaoser', [3], 5, [ 
        new Card(6, '7', 1, "https://cards.scryfall.io/large/front/9/0/905f0dd4-0197-45f8-8e7f-396d6dcef600.jpg?1675956901", "The Eternal Wanderer", "Legendary Planeswalker", "description", ["B"], { "standard": "not_legal", "commander": "not_legal"}, 0.10, "SetName1", "SetType1" ),
        new Card(7, '1', 1,"https://cards.scryfall.io/normal/front/2/c/2c5a7550-fe1a-4797-9583-70ab56cfac0d.jpg?1707739807","Tomik, Wielder of Law","Legendary Creature","description", ["W", "B"], { "standard": "not_legal",  "commander": "legal"}, 1.05, "Load of the rings", "commander"),
        new Card(8, '2', 1,"https://cards.scryfall.io/large/front/d/5/d5806e68-1054-458e-866d-1f2470f682b2.jpg?1696020224","The One ring", "Lengendary Artifact", "description", ["P", "W"],{ "standard": "not_legal",  "commander": "legal"}, 0.99, "Load of the rings", "booster"),
        new Card(9, '3', 1,"https://cards.scryfall.io/large/front/1/7/175b3d28-5c74-4972-9b5c-5e39762c78f4.jpg?1686964447", "Relic of Sauron", "Artifact", "description", ["B"],{ "standard": "not_legal", "commander": "not_legal"}, 5.10, "Load of the rings", "booster" ),
        new Card(10, '4', 1,"https://cards.scryfall.io/large/front/e/5/e57815d4-b21f-4ceb-a3f1-73cff5f0e612.jpg?1686968563", "March from the Black Gate", "Enchantment", "description", ["B"], { "standard": "not_legal", "commander": "not_legal"}, 3.01, "Load of the rings", "commander"), 
        new Card(11, '5', 1,"https://cards.scryfall.io/large/front/9/a/9a0f1eb3-379d-4dc0-a3c8-618cfd3414b2.jpg?1681728922", "Glory Bearers", "Enchantment", "description", ["W"], { "standard": "not_legal", "commander": "not_legal"},0.01, "SetName", "SetType"),
        new Card(12, '6', 1, "https://cards.scryfall.io/large/front/b/f/bf1ef8ec-d915-41f2-b087-3d6d82e3db85.jpg?1591319833", "Akroma, Angel of Wrath", "Legendary Creature", "description", ["W"], { "standard": "not_legal", "commander": "not_legal"}, 0.24, "SetName2", "SetType2" ),
        new Card(13, '8', 1, "https://cards.scryfall.io/large/front/0/f/0fd1fc09-a09d-45e6-8a07-3a8a83b4e6ec.jpg?1686970224", "Mithril Coat", "Legendary Artifact", "description", ["W", "G"],    { "standard": "not_legal", "commander": "legal"},0.25, "test", "test")
      ]
      ),
      new Deck(3, 'onIce', 'Deimos', [2], 5, [ 
        new Card(14, '7', 1, "https://cards.scryfall.io/large/front/9/0/905f0dd4-0197-45f8-8e7f-396d6dcef600.jpg?1675956901", "The Eternal Wanderer", "Legendary Planeswalker", "description", ["B"], { "standard": "not_legal", "commander": "not_legal"}, 0.10, "SetName1", "SetType1" ),
        new Card(15, '1', 1,"https://cards.scryfall.io/normal/front/2/c/2c5a7550-fe1a-4797-9583-70ab56cfac0d.jpg?1707739807","Tomik, Wielder of Law","Legendary Creature","description", ["W", "B"], { "standard": "not_legal",  "commander": "legal"}, 1.05, "Load of the rings", "commander"),
        new Card(16, '2', 1,"https://cards.scryfall.io/large/front/d/5/d5806e68-1054-458e-866d-1f2470f682b2.jpg?1696020224","The One ring", "Lengendary Artifact", "description", ["P", "W"],{ "standard": "not_legal",  "commander": "legal"}, 0.99, "Load of the rings", "booster"
         ),
        new Card(17, '3', 1,"https://cards.scryfall.io/large/front/1/7/175b3d28-5c74-4972-9b5c-5e39762c78f4.jpg?1686964447", "Relic of Sauron", "Artifact", "description", ["B"],{ "standard": "not_legal", "commander": "not_legal"}, 5.10, "Load of the rings", "booster" ),
      ]
        ),
        new Deck(4, 'onPoison', 'Deimos', [2], 2, [ 
          new Card(18, '1', 1,"https://cards.scryfall.io/normal/front/2/c/2c5a7550-fe1a-4797-9583-70ab56cfac0d.jpg?1707739807","Tomik, Wielder of Law","Legendary Creature","description", ["W", "B"], { "standard": "not_legal",  "commander": "legal"}, 1.05, "Load of the rings", "commander"),
          new Card(19, '7', 1, "https://cards.scryfall.io/large/front/9/0/905f0dd4-0197-45f8-8e7f-396d6dcef600.jpg?1675956901", "The Eternal Wanderer", "Legendary Planeswalker", "description", ["B"], { "standard": "not_legal", "commander": "not_legal"}, 0.10, "SetName1", "SetType1" ),
          new Card(20, '8', 1, "https://cards.scryfall.io/large/front/0/f/0fd1fc09-a09d-45e6-8a07-3a8a83b4e6ec.jpg?1686970224", "Mithril Coat", "Legendary Artifact", "description", ["W", "G"],    { "standard": "not_legal", "commander": "legal"},0.25, "test", "test")
  
        ]
          ),
          new Deck(5, 'onLightening', 'Deimos', [3], 3, [ 
            
          ]
            )
    ]
  }


  public onIncreaseCardQuantityFromChild(cardId: string) {
    const card = this.mazo.cards.find(c => c.id_card_api === cardId);
    if (card) {
      card.quantity += 1;
      console.log(`Quantity ${cardId}: `, card.quantity);
    }
  }

  public onDecreaseCardQuantityFromChild(cardId: string){
    const card = this.mazo.cards.find(c => c.id_card_api === cardId);
    if (card && card.quantity > 0) {  //para que la cantidad no sea menor que cero
      card.quantity -= 1;
      console.log(`Quantity ${cardId}: `, card.quantity);
    }
  }

  public onDeleteAllCardsFromChild(cardId:string){
    const card = this.mazo.cards.find(c => c.id_card_api === cardId);
    console.log(card);
    if (card && card.quantity > 0) {  //para que la cantidad no sea menor que cero
      card.quantity = 0;
      console.log(`Quantity ${cardId}: `, card.quantity);
    }
  }

  public getTotalQuantity(cards: Card[]): number {
    return cards.reduce((ammount, card) => ammount + card.quantity, 0);
  }

  public onFilterClick(typeLine:string){
    console.log('filtered creatures');
      if (typeLine === 'all'){
        this.filteredCards = [...this.mazo.cards];
      } else {
        this.filteredCards = this.mazo.cards.filter(c => c.type_line.toLowerCase().includes(typeLine.toLowerCase()));
      }
      console.log('filtered card', this.filteredCards);
  }


  public getFirstPlaneswalkerOrLegendaryCreatureImage(deck: Deck): string {
    const card = deck.cards?.find(c => c.type_line.includes('Planeswalker') || c.type_line.includes('Legendary Creature'));
    if (card) {
        return card?.image_uris; 
    } else {
        switch (deck.id_deck) {
            case 1:
                return "/assets/images/mismazos/amarillo.png";
            case 2:
                return "/assets/images/mismazos/azul.png";
            case 3:
                return "/assets/images/mismazos/morado.png";
            case 4:
                return "/assets/images/mismazos/rojo.png";
            case 5:
                return "/assets/images/mismazos/verde.png";
            default:
                return 'https://cards.scryfall.io/large/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838';
        }
    }
  }


  public startEdit(){
    this.isEditing = true; // edit mode on
    this.editedName = this.mazo.nameDeck; // meter el nombre modificando temporalmente
  }

  public saveEdit(){
    this.isEditing = false; // edit mode off
    this.mazo.nameDeck = this.editedName; // guardar como mazo.nameDeck
  }



  /*modal de xisca*/
  public onCardInfoOpen(){
    this.darkenOverlay=true; 
    this.show_cardinfo = true; 
  }

  public card_info_close() {
    this.darkenOverlay = false;
    this.show_cardinfo = false;
  }


  ngOnInit(): void {
    
  }

  //https://qiita.com/frtklog/items/df7f1c4d5d870212e779
  //event.detail[0].activeIndex   saber qual es indice de slide de ahora
  // ngAfterViewInit(): void {
  //   this.mySwiper.nativeElement.addEventListener('slidechange', (event: any) => {
  //     console.log(event);
  //     console.log('activeIndex: ', event.detail[0].activeIndex); // indice de current slide
  //     let slideIndex = event.detail[0].activeIndex;
  //     if (event.detail[0].activeIndex){
  //       console.log('this is inside of the deck: ', this.datos[slideIndex]);
  //     } else if (slideIndex === 0){
  //       console.log('first deck: ', this.datos[0])
  //     }
  //   });
  // }

  ngAfterViewInit(): void {
    // make sure if swiper is default 
    if (this.mySwiper && this.mySwiper.nativeElement.swiper) {
      const swiper = this.mySwiper.nativeElement.swiper;
      
      swiper.slideTo(0, 0); //  indice por la primera vez, tiempo
      // con indice por la primera vez y primer mazo
      console.log('Initial deck: ', this.datos[0]);
      this.mazo = this.datos[0]; 
      this.filteredCards = [ ...this.mazo.cards]; // mostrar todas las cartas
  
      // con slideChange, 
      swiper.on('slideChange', () => {
        const activeIndex = swiper.activeIndex;
          console.log('This is inside of the deck: ', this.datos[activeIndex]);
          this.mazo = this.datos[activeIndex]; // asociado con indice de mazo
          this.filteredCards = [...this.mazo.cards]; // clear cartas filtrado y mostrar todas las cartas

        
      });
    }
  }
  

}
