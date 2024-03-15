import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Card } from 'src/app/models/card';
import { CardsService } from 'src/app/shared/cards.service';
import { MazoSelectorModalComponent } from '../mazo-selector-modal/mazo-selector-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-loggedin-card',
  templateUrl: './loggedin-card.component.html',
  styleUrls: ['./loggedin-card.component.css']
})
export class LoggedinCardComponent implements OnInit {
  public cards: Card[]
  public card: Card;
  public parametro: string;
  public searchInput: string = '';
  public resultsCards: Card[] =[]; //para meter datos de resultados
  public searchType: string = 'nombre' //default searchtype es nombre
  public builderCards: Card[] = []; // para meter datos en builder(constcucción)
  public searchPerformed: boolean = false; // si ha hecho la busqueda o no  default false
 
  public darkenOverlay:boolean = false; // modal de xisca
  public show_cardinfo:boolean = false; // modal de xisca
  public selectedCard: Card | null = null; // selectedCard sea Card o null, default null



  constructor(
    public cardsService: CardsService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ){

    //app.routing.module.ts  {path: "cartas/:cardId", component:CartasComponent},
  this.parametro = this.rutaActiva.snapshot.params.cardId;
  }



  searchCards(cardName: string): void {
    this.searchPerformed = true;
    // this.errorMessage = null; // cada vez busca, refresh

    // const currentUser = this.usersService.getCurrentUser();
    // if (currentUser && currentUser.id_user){

    this.cardsService.getByName(cardName).subscribe({
      next: (data:any) => {
        this.resultsCards = [data]; // como dato desde back(axios) es un object y no es array...
        console.log('API Response: ', data);
        // this.errorMessage = null; // refresh errorMessage
      },
      error: (err) => {
        this.resultsCards = [];
        console.log('Error in fetching cards:', err);
      //   this.errorMessage = 'Hay demasiadas cartas o el título es incorrecto. Por favor, intenta una búsqueda más detallada con un título más específico.';
      //   console.log('Error message', this.errorMessage);
      // }
    }});
  }
  

  // searchCards(searchParam: string): void{
  //   this.searchPerformed = true;

  //   this.cardsService.getByName(searchParam).subscribe(cards =>{
  //     this.resultsCards = cards;
  //     console.log('resultsCards:', cards);
  //   })
  // }

  // searchCards(searchParam: string): void {
  //   this.searchPerformed = true;
  //   let cards = [];
  //   if (this.searchType == 'nombre'){
  //     cards = this.cardsService.getByName(searchParam);
  //   } else if (this.searchType === 'colleccion'){
  //     cards = this.cardsService.getByCollection(searchParam);
  //   }

  //   // si hay 1 o más cartas en array, meter datos en resultsCards
  //   if (cards && cards.length > 0) {
  //     this.resultsCards = cards;
  //     console.log('Results:', cards);
  //     console.log('resultsCards: ', this.resultsCards);
  //   } else {
  //     this.resultsCards = [];
  //     console.log('No hay datos en resultsCards');
  //   }
  // }

  onAddCardToBuilder(card: Card): void {
    this.builderCards.push(card);
    console.log('Added to Builder: ', this.builderCards);
  }

  onDeleteFromChild(cardId: string){
    this.builderCards = this.builderCards.filter(card => card.id_card_api !== cardId);
    console.log('After deleting from Builder: ', this.builderCards);
  }

  //modal deck
  openDeckDialog(): void {
    const dialogRef = this.dialog.open(MazoSelectorModalComponent, {
      width: '700px',
      height: '500px'
    });
  

    // dialogRef.afterClosed().subscribe(deckIndex => {
    //   try {
    //     console.log('The dialog was closed with deckIndex: ', deckIndex);
    //     let cardIds = this.builderCards.map(card => card.id_card);
    //     console.log('modal: ', cardIds);
    //     // 以下のコードはそのまま
    //     this.cardsService.addCardsToDeck(deckIndex, cardIds);
    //     this.snackBar.open(`Añadido tu carta al mazo #${deckIndex + 1}`, 'Cerrar', {
    //       duration: 4000,
    //       verticalPosition: 'top',
    //     });
    //     this.builderCards = []; // eliminar todas 
    //   } catch (error) {
    //     console.error('An error occurred: ', error);
    //   }
    // });
    dialogRef.afterClosed().subscribe(deckIndex => {
      console.log('The dialog was closed');
        let cardIds = this.builderCards.map(card => card.id_card_api);
        console.log('modal: ', cardIds);
        this.cardsService.addCardsToDeck(deckIndex, cardIds);
        this.snackBar.open(`Añadido tu carta al mazo #${deckIndex + 1}`, 'Cerrar', {
          duration: 4000,
          verticalPosition: 'top',
        });
        this.builderCards = []; // eliminar todas 
    });
  }
  

  ngOnInit(): void {
      
  }


  public onCardInfoOpen(card:Card):void{
    console.log('clicked card', card);
    this.selectedCard = card;
    this.darkenOverlay=true; 
    this.show_cardinfo = true; 
  }

  public onCardInfoClose(show: boolean):void{
    this.selectedCard = null; // resetear selectedCard cuendo se cierra
    this.darkenOverlay = show;
    this.show_cardinfo = show;
  }

  public card_info_close():void{
    this.selectedCard = null; // resetear selectedCard
    this.darkenOverlay = false;
    this.show_cardinfo = false;
  }


  }




