import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Card } from 'src/app/models/card';
import { User } from 'src/app/models/user';
import { Deck } from 'src/app/models/deck';
import { Mazo } from 'src/app/models/mazo';
import { CardsService } from 'src/app/shared/cards.service';
import { DeckService } from 'src/app/shared/deck.service';
import { UsersService } from 'src/app/shared/users.service';
import { Response } from 'src/app/models/response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';




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
  public selectedCard: Card | null = null; // selectedCard sea Card o null, default null

  public isLoading: boolean = true; // loading indicator

  public isFiltered: boolean = false; // filtered or not


  // @ViewChild('mySwiper') mySwiper: any = null; // Swiperの要素にアクセスするためのViewChild
  @ViewChild('mySwiper') mySwiper: ElementRef;


  constructor(
    private cardsService: CardsService,
    private usersService: UsersService,
    private decksService: DeckService,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private toastr: ToastrService,
  ){}



  ngOnInit(): void {
    // const currentUser = this.usersService.getCurrentUser(); // PARA GET ULTIMO CURRENT USER
    // console.log('Current user misMazos:', currentUser);
    this.getDecksWithSwiper(); 
  }

  

  public ngAfterViewInit(): void {
    // make sure if swiper is default 
    if (this.mySwiper && this.mySwiper.nativeElement.swiper) {
      const swiper = this.mySwiper.nativeElement.swiper;

      swiper.slideTo(0, 0);  //  indice por la primera vez, tiempo

      this.mazo = this.datos[0];
      this.filteredCards = this.mazo?.cards ? [...this.mazo.cards] : []; // mostrar todas las cartas
      
      
      swiper.on('slideChange', () => {
        const activeIndex = swiper.activeIndex;
        this.mazo = this.datos[activeIndex]; // update deck info, asociado con indice de mazo
        this.filteredCards = this.mazo?.cards ? [...this.mazo.cards] : []; // clear cartas filtrado y mostrar todas las cartas
      });
    }
  }



  public getDecksWithSwiper():void {
    const userId = this.usersService.getCurrentUserId();

    this.isLoading = true; // antes de tener dato, true
    
    this.decksService.getMyDecks(userId).subscribe({
        next: (response: any) => {
                this.datos = response;
                // solo ngAfterInit no funciona. hay que meter en getDecksWithSwiper por el timing de initialize y obtener dato
                this.initializeSwiper(); 
        },
        error: (err) => {
            console.log('Error in fetching Deck: ', err);
            this.isLoading = false; // cuando ocurre error, false
        },
        complete: () =>{
            this.isLoading = false; // cuando termina, false
        }
        
    });
  }



  private initializeSwiper(): void {
    if (this.mySwiper && this.mySwiper.nativeElement.swiper) {
      const swiper = this.mySwiper.nativeElement.swiper;
      swiper.update();

      swiper.slideTo(0, 0);
      if (this.datos.length > 0) {
        this.mazo = this.datos[0];
        this.filteredCards = [...this.mazo.cards];
      }
  
      swiper.on('slideChange', () => {
        const activeIndex = swiper.activeIndex;
        this.mazo = this.datos[activeIndex];
        this.filteredCards = this.mazo?.cards ? [...this.mazo.cards] : [];
      });
    }
  }



  public getDecksInfo():void {
    const userId = this.usersService.getCurrentUserId();
    
    this.decksService.getMyDecks(userId).subscribe({
        next: (response: any) => {
                this.datos = response;
        },
        error: (err) => {
            console.log('Error in fetching Deck: ', err);
        }
    });
  }



  public onIncreaseCardQuantityFromChild(cardId: string) {
    const card = this.mazo?.cards.find(card => card.id === cardId);
    if (card && this.mazo) {
      card.quantity += 1;

      // pasar id_deckCard y action: increase a updateQuantity
      this.updateQuantity(card.id_deckCard, 'increase'); 
    }
  }



  public onDecreaseCardQuantityFromChild(cardId: string){
    const card = this.mazo?.cards.find(card => card.id === cardId);
    if (card && this.mazo && card.quantity > 1) {  //para que la cantidad no sea menor que cero
      card.quantity -= 1;

      // pasar id_deckCard y action: decrease a updateQuantity
      this.updateQuantity(card.id_deckCard, 'decrease'); 
    }
  }



  public updateQuantity(id_deckCard: number, action: string){
    this.decksService.updateCardQuantity(id_deckCard, action).subscribe({
      next: (response) => {
        console.log('Updated quantity: ', response);
      },
      error: (err) => {
        console.log('Error updating quantity: ', err);
      }
    })    
  }



  public onDeleteAllCardsFromChild(id_deckCard: number){

    const card = this.mazo?.cards.find(card => card.id_deckCard === id_deckCard);
    if (card && this.mazo && card.quantity > 0) {  //para que la cantidad no sea menor que cero

      // pasar id_deckCard y action: delete a updateQuantity
      this.deleteQuantity(card.id_deckCard); 
    } else {
      console.log('Card not found or quantity is 0'); 
    }
  }
  


  public deleteQuantity(id_deckCard: number){
  this.decksService.deleteCardQuantity(id_deckCard).subscribe({
    next: (response) => {
      // cambiar la lista de cards de front
      this.mazo.cards = this.mazo.cards.filter(card => card.id_deckCard !== id_deckCard);

      this.filteredCards = this.filteredCards.filter(card => card.id_deckCard !== id_deckCard);
    },
    error: (err) => {
      console.log('Error deleting: ', err)
    }
  })   
  }



  public getTotalQuantity(cards: Card[]): number {
    return cards.reduce((ammount, card) => ammount + card.quantity, 0);
  }



  public onFilterClick(typeLine:string){
    console.log('filtered creatures');
    if (typeLine === 'all'){
      this.filteredCards = [...this.mazo.cards];
    } else {
      this.filteredCards = this.mazo.cards.filter(card => 
        card.type_line.toLowerCase().includes(typeLine.toLowerCase())
    );
      this.isFiltered = true;
    }

    const totalQuantity = this.getTotalQuantity(this.filteredCards);
  }
  
  

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

      let userId = this.usersService.getCurrentUserId();

      let indexDeck = this.mySwiper.nativeElement.swiper.activeIndex; // indexDeck es activeIndex de swiper

      // buscar id_deck con indexDeck de datos
    const targetDeck = this.datos[indexDeck];
    if (targetDeck) {
      const id_deck = targetDeck.id_deck; // id_deck
      const nameDeck = this.mazo.nameDeck; // nuevo nombre de deck

      // llamar editDeckName (http client de angular no deja mandar object asi que hay que cambiar object a JSON. En decksService, data:any)
      this.decksService.editDeckName( nameDeck, id_deck ).subscribe({
        next: (response: any) => {
          this.toastr.success(`"${nameDeck}" es el nombre del nuevo mazo`, '', {
            timeOut: 6000,
            positionClass: 'toast-top-center'
          });
        },
        error: (err: any) => {
          console.log('Error updating deck name:', err);
          this.toastr.error('Ha habido un error', 'Error', {
            timeOut: 4000,
            positionClass: 'toast-top-center'
          });
        }
      });
    } else {
      console.log('Target deck not found.');
    }
  }
}



  public onToggleShare(){
    const userId = this.usersService.getCurrentUserId();

    const indexDeck = this.mySwiper.nativeElement.swiper.activeIndex; // indexDeck es activeIndex de swiper
      
      // buscar id_deck con indexDeck de datos
    const targetDeck = this.datos[indexDeck];
    if (targetDeck) {
      const id_deck = targetDeck.id_deck; // id_deck

    this.decksService.toggleShare( id_deck ).subscribe({
      next: (response: any) => {
        this.toastr.info(response.message, '', {
          timeOut: 6000,
          positionClass: 'toast-top-center'
        });

        //* versión snackBar
        // this.snackBar.open(response.message, '', {
        //   duration: 6000,
        //   verticalPosition: 'top',
        //   });
        
        this.datos[indexDeck].share = response.shareStatus; // update share status por response
        this.changeDetectorRef.detectChanges(); // trigger update
      },
      error: (err: any) => {
      console.log('Error updating share status: ', err);
      this.snackBar.open('Ha habido un error', 'Cerrar', {
        duration: 5000,
      })
      }
    })
    }
  }



  /*modal de xisca*/
  public onCardInfoOpen(card:Card):void{
    console.log('clicked card', card);
    this.selectedCard = card;
    this.darkenOverlay=true; 
    this.show_cardinfo = true; 
  }

  public onCardInfoClose():void {
    this.selectedCard = null; // resetear selectedCard cuendo se cierra
    this.darkenOverlay = false;
    this.show_cardinfo = false;
  }
}
