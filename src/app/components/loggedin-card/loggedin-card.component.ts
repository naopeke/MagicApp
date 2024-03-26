import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Card } from 'src/app/models/card';
import { CardsService } from 'src/app/shared/cards.service';
import { MazoSelectorModalComponent, DialogData } from '../mazo-selector-modal/mazo-selector-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/shared/users.service';



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

  public currentUser: User | null = null; // para sacar currentUser


  constructor(
    public cardsService: CardsService,
    public usersService: UsersService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ){

  }



  ngOnInit(): void {
    const currentUser = this.usersService.getCurrentUser(); // PARA GET ULTIMO CURRENT USER
    console.log('Current user loginCarta:', currentUser);
    };
    


  searchCards(cardName: string): void {
    this.searchPerformed = true;

    this.cardsService.getByName(cardName).subscribe({
      next: (data:any) => {
        this.resultsCards = [data]; // como dato desde back(axios) es un object y no es array...
        console.log('API Response: ', data);
      },
      error: (err) => {
        this.resultsCards = [];
        console.log('Error in fetching cards:', err);
    }});
  }



  onAddCardToBuilder(card: Card): void {
    this.builderCards.push(card);
    console.log('Added to Builder: ', this.builderCards);
  }



  onDeleteFromChild(cardId: string){
    this.builderCards = this.builderCards.filter(card => card.id !== cardId);
    console.log('Deteleted card', cardId);
    console.log('After deleting from Builder: ', this.builderCards);
  }



  // modal
  openDeckDialog(): void {
    const dialogRef = this.dialog.open(MazoSelectorModalComponent, {
      width: '700px',
      height: '500px',
      data: { selectedDeckIndex: null } // default null, si no, sale error
    });
  
    dialogRef.afterClosed().subscribe(async (result: DialogData) => {
      console.log('The dialog was closed');
  
      // Obtener deckIndex desde modal
      // Obtener deckIndex desde modal
      const indexDeck = result.selectedDeckIndex;
      console.log('Selected Deck Index: ', indexDeck);

  
      // Obtener current user
      const currentUser = await this.usersService.getCurrentUser();
      console.log('Current user:', currentUser);
      if (!currentUser) {
        console.log('No current user found.');
      }
  
      // Obtener current user Id
      const userId = this.usersService.getCurrentUserId();
      console.log('User id logincard:', userId);

      // Obtener cardApiIds y deckIndex en front
      const cardApiIds = this.builderCards.map(card => card.id); 
      console.log('Card Api Ids: ',cardApiIds)

      // addCardsToDeck con cardApiIds(array de builderCards), userId y deckIndex
      this.cardsService.addCardsToDeck(cardApiIds, userId, indexDeck).subscribe({
        next: (response: any) => {
          console.log('Cards added to deck:', response);
  
          // メッセージを表示
          this.snackBar.open(`Añadido tu carta al mazo #${indexDeck + 1}`, 'Cerrar', {
            duration: 4000,
            verticalPosition: 'top',
          });
          // vaciar builderCards
          this.builderCards = [];
        },
        error: (error: any) => {
          console.log('Error adding cards to deck:', error);
        }
      });
  
    });
  }
    


  public onCardInfoOpen(card:Card):void{
    console.log('clicked card', card);
    this.selectedCard = card;
    this.darkenOverlay = true; 
    this.show_cardinfo = true; 
  }



  public onCardInfoClose(show: boolean):void{
  this.selectedCard = null; // resetear selectedCard cuendo se cierra
  this.darkenOverlay = false;
  this.show_cardinfo = false;
  }

  }




