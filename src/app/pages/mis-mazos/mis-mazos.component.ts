import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Card } from 'src/app/models/card';
import { User } from 'src/app/models/user';
import { Deck } from 'src/app/models/deck';
import { Mazo } from 'src/app/models/mazo';
import { CardsService } from 'src/app/shared/cards.service';
import { DeckService } from 'src/app/shared/deck.service';
import { UsersService } from 'src/app/shared/users.service';
import { Response } from 'src/app/models/response';
import Swiper from 'swiper';


@Component({
  selector: 'app-mis-mazos',
  templateUrl: './mis-mazos.component.html',
  styleUrls: ['./mis-mazos.component.css']
})

export class MisMazosComponent implements OnInit, AfterViewInit {

  public datos:Mazo[] = [];
  public mazo: Mazo | undefined;
  
  public card: Card | undefined;
  public cards: Card[] = [];
  public resultsDecks: any[] = []; //para meter datos de resultados

  public currentUser: User | null = null; // para sacar currentUser


  public filteredCards: Card[] = []; // para filtrar con tipos de cartas

  public isEditing: boolean = false; // edit mode
  public editedName: string = '';  // para guardar el nombre modificando

  public darkenOverlay:boolean = false; // modal de xisca
  public show_cardinfo:boolean = false; // modal de xisca



  // @ViewChild('mySwiper') mySwiper: any = null; // Swiperの要素にアクセスするためのViewChild
  @ViewChild('mySwiper') mySwiper: ElementRef;


  constructor(
    private cardsService: CardsService,
    private usersService: UsersService,
    private decksService: DeckService
  ){}



  ngOnInit(): void {
    // const currentUser = this.usersService.getCurrentUser(); // PARA GET ULTIMO CURRENT USER
    // console.log('Current user misMazos:', currentUser);
    this.getDecks(); 
  }

  

  public ngAfterViewInit(): void {
    // make sure if swiper is default 
    if (this.mySwiper && this.mySwiper.nativeElement.swiper) {
      const swiper = this.mySwiper.nativeElement.swiper;

      swiper.slideTo(0, 0);  //  indice por la primera vez, tiempo
      console.log('Initial deck: ', this.datos[0]);       // con indice por la primera vez y primer mazo

      this.mazo = this.datos[0];
      this.filteredCards = this.mazo?.cards ? [...this.mazo.cards] : []; // mostrar todas las cartas
      
      
      swiper.on('slideChange', () => {
        const activeIndex = swiper.activeIndex;
        console.log('This is inside of the deck: ', this.datos[activeIndex]);
        this.mazo = this.datos[activeIndex]; // asociado con indice de mazo
        this.filteredCards = this.mazo?.cards ? [...this.mazo.cards] : []; // clear cartas filtrado y mostrar todas las cartas

      });
    }
  }





  public getDecks():void {
    const userId = this.usersService.getCurrentUserId();
    console.log('User id mismazos:', userId);
    
    this.decksService.getMyDecks(userId).subscribe({
        next: (response: any) => {
                this.datos = response;
                console.log('API Response Deck: ', this.datos);
                // solo ngAfterInit no funciona. hay que meter en getDecks por el timing de initialize y obtener dato
                this.initializeSwiper(); 
        },
        error: (err) => {
            console.log('Error in fetching Deck: ', err);
        }
    });
  }


  private initializeSwiper(): void {
    if (this.mySwiper && this.mySwiper.nativeElement.swiper) {
      const swiper = this.mySwiper.nativeElement.swiper;
      swiper.update();

      swiper.slideTo(0, 0);
      if (this.datos.length > 0) {
        console.log('Initial deck: ', this.datos[0]);
        this.mazo = this.datos[0];
        this.filteredCards = [...this.mazo.cards];
      }
  
      swiper.on('slideChange', () => {
        const activeIndex = swiper.activeIndex;
        console.log('This is inside of the deck: ', this.datos[activeIndex]);
        this.mazo = this.datos[activeIndex];
        this.filteredCards = this.mazo?.cards ? [...this.mazo.cards] : [];
      });
    }
  }

  public onIncreaseCardQuantityFromChild(cardId: string) {
    const card = this.mazo?.cards.find(card => card.id === cardId);
    if (card) {
      card.quantity += 1;
      console.log(`Quantity ${cardId}: `, card.quantity);
    }
  }
  
  // public onIncreaseCardQuantityFromChild(cardId: string) {
  //   const card = this.mazo.cards.find(card => card.id === cardId);
  //   if (card) {
  //     card.quantity += 1;
  //     console.log(`Quantity ${cardId}: `, card.quantity);
  //   }
  // }

  public onDecreaseCardQuantityFromChild(cardId: string){
    const card = this.mazo?.cards.find(card => card.id === cardId);
    if (card && card.quantity > 0) {
      card.quantity -= 1;
      console.log(`Quantity ${cardId}: `, card.quantity);
    }
  }
  

  // public onDecreaseCardQuantityFromChild(cardId: string){
  //   const card = this.mazo.cards.find(card => card.id === cardId);
  //   if (card && card.quantity > 0) {  //para que la cantidad no sea menor que cero
  //     card.quantity -= 1;
  //     console.log(`Quantity ${cardId}: `, card.quantity);
  //   }
  // }

  public onDeleteAllCardsFromChild(cardId:string){
    const card = this.mazo?.cards.find(card => card.id === cardId);
    if (card && card.quantity > 0) {
      card.quantity = 0;
      console.log(`Quantity ${cardId}: `, card.quantity);
    }
  }
  

  // public onDeleteAllCardsFromChild(cardId:string){
  //   const card = this.mazo.cards.find(card => card.id === cardId);
  //   console.log(card);
  //   if (card && card.quantity > 0) {  //para que la cantidad no sea menor que cero
  //     card.quantity = 0;
  //     console.log(`Quantity ${cardId}: `, card.quantity);
  //   }
  // }

  public getTotalQuantity(cards: Card[]): number {
    return cards.reduce((ammount, card) => ammount + card.quantity, 0);
  }

  public onFilterClick(typeLine:string){
    console.log('filtered creatures');
    if (typeLine === 'all'){
      this.filteredCards = this.mazo?.cards ? [...this.mazo.cards] : []; // カードが存在する場合のみ配列に追加
    } else {
      this.filteredCards = [];
    }
    console.log('filtered card', this.filteredCards);
  }
  

  // public onFilterClick(typeLine:string){
  //   console.log('filtered creatures');
  //     if (typeLine === 'all'){
  //       this.filteredCards = [...this.mazo.cards];
  //     } else {
  //       this.filteredCards = this.mazo.cards.filter(c => c.type_line.toLowerCase().includes(typeLine.toLowerCase()));
  //     }
  //     console.log('filtered card', this.filteredCards);
  // }


  // public getFirstPlaneswalkerOrLegendaryCreatureImage(deck: DeckCard): string {
  //   const card = deck.card;
  //   if (card && (card.type_line.includes('Planeswalker') || card.type_line.includes('Legendary Creature'))) {
  //     return card.image_uris ?? '';
  //   } else {
  //     return 'https://cards.scryfall.io/large/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838';
  //   }
  // }


  public getFirstPlaneswalkerOrLegendaryCreatureImage(deck: Deck): string {
    const card = deck.cards?.find(card => card.type_line.includes('Planeswalker') || card.type_line.includes('Legendary Creature'));
    if (card) {
        return card?.image_uris; 
    } else {
        switch (deck.id_deck) {
            case 1:
                return "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=166574&type=card";
            case 2:
                return "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=166574&type=card";
            case 3:
                return "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=166574&type=card";
            case 4:
                return "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=166574&type=card";
            case 5:
                return "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=166574&type=card";
                // return "/assets/images/mismazos/verde.png";
            default:
                return 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=166574&type=card';
        }
    }
  }


  public startEdit(){
    if (this.mazo) {
      this.isEditing = true;
      this.editedName = this.mazo.nameDeck ?? ''; // meter el nombre modificando temporalmente
    }
  }


  public saveEdit(){
    if (this.mazo) {
      this.isEditing = false;
      this.mazo.nameDeck = this.editedName; // guardar como mazo.nameDeck
      console.log('New Deck Name in front: ', this.mazo.nameDeck);

      let userId = this.usersService.getCurrentUserId();
      console.log('user id :', userId);

      let indexDeck = this.mySwiper.nativeElement.swiper.activeIndex; // indexDeck es activeIndex de swiper
      console.log('indexDeck: ', indexDeck);
      

      // buscar id_deck con indexDeck de datos
    const targetDeck = this.datos[indexDeck];
    if (targetDeck) {
      const id_deck = targetDeck.id_deck; // id_deck
      console.log('id_deck: ', id_deck);
      const nameDeck = this.mazo.nameDeck; // nuevo nombre de deck
      console.log('new deck name for back: ', nameDeck);


      // llamar editDeckName (http client de angular no deja mandar object asi que hay que cambiar object a JSON. En decksService, data:any)
      this.decksService.editDeckName( nameDeck, id_deck ).subscribe({
        next: (response: any) => {
          console.log('Updated deck name: ', response);
          // ここに適切な処理を追加する 
        },
        error: (err: any) => {
          console.log('Error updating deck name:', err);
        }
      });
    } else {
      console.log('Target deck not found.');
    }
  }
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


  // https://qiita.com/frtklog/items/df7f1c4d5d870212e779
  // event.detail[0].activeIndex   saber qual es indice de slide de ahora
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













  // ngAfterViewInit(): void {
  //   // make sure if swiper is default 
  //   if (this.mySwiper && this.mySwiper.nativeElement.swiper) {
  //     const swiper = this.mySwiper.nativeElement.swiper;
      
  //     swiper.slideTo(0, 0); //  indice por la primera vez, tiempo
  //     // con indice por la primera vez y primer mazo
  //     console.log('Initial deck: ', this.datos[0]);
  //     this.mazo = this.datos[0]; 
  //     this.filteredCards = [ ...this.mazo.cards]; // mostrar todas las cartas
  
  //     // con slideChange, 
  //     swiper.on('slideChange', () => {
  //       const activeIndex = swiper.activeIndex;
  //         console.log('This is inside of the deck: ', this.datos[activeIndex]);
  //         this.mazo = this.datos[activeIndex]; // asociado con indice de mazo
  //         this.filteredCards = [...this.mazo.cards]; // clear cartas filtrado y mostrar todas las cartas

        
  //     });
  //   }
  // }
  

}
