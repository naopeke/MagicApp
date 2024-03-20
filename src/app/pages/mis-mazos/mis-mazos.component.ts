// import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { Card } from 'src/app/models/card';
// import { Deck } from 'src/app/models/deck';
// import { CardsService } from 'src/app/shared/cards.service';

// @Component({
//   selector: 'app-mis-mazos',
//   templateUrl: './mis-mazos.component.html',
//   styleUrls: ['./mis-mazos.component.css']
// })
// export class MisMazosComponent implements OnInit, AfterViewInit {

//   public datos: Deck[];
//   public mazo: Deck;
//   public datosVotados: Deck[];
//   public card: Card;
//   public cards: Card[];
  
//   public filteredCards: Card[] = []; // para filtrar con tipos de cartas

//   public isEditing: boolean = false; // edit mode
//   public editedName: string = '';  // para guardar el nombre modificando

//   public darkenOverlay:boolean = false; // modal de xisca
//   public show_cardinfo:boolean = false; // modal de xisca



//   @ViewChild('mySwiper') mySwiper: any = null; // Swiperの要素にアクセスするためのViewChild
  





//   constructor(
//     private cardsService: CardsService,
//   ){}


//   public onIncreaseCardQuantityFromChild(cardId: string) {
//     const card = this.mazo.cards.find(card => card.id === cardId);
//     if (card) {
//       card.quantity += 1;
//       console.log(`Quantity ${cardId}: `, card.quantity);
//     }
//   }

//   public onDecreaseCardQuantityFromChild(cardId: string){
//     const card = this.mazo.cards.find(card => card.id === cardId);
//     if (card && card.quantity > 0) {  //para que la cantidad no sea menor que cero
//       card.quantity -= 1;
//       console.log(`Quantity ${cardId}: `, card.quantity);
//     }
//   }

//   public onDeleteAllCardsFromChild(cardId:string){
//     const card = this.mazo.cards.find(card => card.id === cardId);
//     console.log(card);
//     if (card && card.quantity > 0) {  //para que la cantidad no sea menor que cero
//       card.quantity = 0;
//       console.log(`Quantity ${cardId}: `, card.quantity);
//     }
//   }

//   public getTotalQuantity(cards: Card[]): number {
//     return cards.reduce((ammount, card) => ammount + card.quantity, 0);
//   }

//   public onFilterClick(typeLine:string){
//     console.log('filtered creatures');
//       if (typeLine === 'all'){
//         this.filteredCards = [...this.mazo.cards];
//       } else {
//         this.filteredCards = this.mazo.cards.filter(c => c.type_line.toLowerCase().includes(typeLine.toLowerCase()));
//       }
//       console.log('filtered card', this.filteredCards);
//   }


//   public getFirstPlaneswalkerOrLegendaryCreatureImage(deck: Deck): string {
//     const card = deck.cards?.find(c => c.type_line.includes('Planeswalker') || c.type_line.includes('Legendary Creature'));
//     if (card) {
//         return card?.image_uris; 
//     } else {
//         switch (deck.id_deck) {
//             case 1:
//                 return "/assets/images/mismazos/amarillo.png";
//             case 2:
//                 return "/assets/images/mismazos/azul.png";
//             case 3:
//                 return "/assets/images/mismazos/morado.png";
//             case 4:
//                 return "/assets/images/mismazos/rojo.png";
//             case 5:
//                 return "/assets/images/mismazos/verde.png";
//             default:
//                 return 'https://cards.scryfall.io/large/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838';
//         }
//     }
//   }


//   public startEdit(){
//     this.isEditing = true; // edit mode on
//     this.editedName = this.mazo.nameDeck; // meter el nombre modificando temporalmente
//   }

//   public saveEdit(){
//     this.isEditing = false; // edit mode off
//     this.mazo.nameDeck = this.editedName; // guardar como mazo.nameDeck
//   }



//   /*modal de xisca*/
//   public onCardInfoOpen(){
//     this.darkenOverlay=true; 
//     this.show_cardinfo = true; 
//   }

//   public card_info_close() {
//     this.darkenOverlay = false;
//     this.show_cardinfo = false;
//   }


//   ngOnInit(): void {
    
//   }

//   // https://qiita.com/frtklog/items/df7f1c4d5d870212e779
//   // event.detail[0].activeIndex   saber qual es indice de slide de ahora
//   // ngAfterViewInit(): void {
//   //   this.mySwiper.nativeElement.addEventListener('slidechange', (event: any) => {
//   //     console.log(event);
//   //     console.log('activeIndex: ', event.detail[0].activeIndex); // indice de current slide
//   //     let slideIndex = event.detail[0].activeIndex;
//   //     if (event.detail[0].activeIndex){
//   //       console.log('this is inside of the deck: ', this.datos[slideIndex]);
//   //     } else if (slideIndex === 0){
//   //       console.log('first deck: ', this.datos[0])
//   //     }
//   //   });
//   // }

//   ngAfterViewInit(): void {
//     make sure if swiper is default 
//     if (this.mySwiper && this.mySwiper.nativeElement.swiper) {
//       const swiper = this.mySwiper.nativeElement.swiper;
      
//       swiper.slideTo(0, 0); //  indice por la primera vez, tiempo
//       con indice por la primera vez y primer mazo
//       console.log('Initial deck: ', this.datos[0]);
//       this.mazo = this.datos[0]; 
//       this.filteredCards = [ ...this.mazo.cards]; // mostrar todas las cartas
  
//       con slideChange, 
//       swiper.on('slideChange', () => {
//         const activeIndex = swiper.activeIndex;
//           console.log('This is inside of the deck: ', this.datos[activeIndex]);
//           this.mazo = this.datos[activeIndex]; // asociado con indice de mazo
//           this.filteredCards = [...this.mazo.cards]; // clear cartas filtrado y mostrar todas las cartas

        
//       });
//     }
//   }
  

// }
