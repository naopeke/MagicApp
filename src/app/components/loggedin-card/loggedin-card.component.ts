import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Card } from 'src/app/models/card';
import { CardsService } from 'src/app/shared/cards.service';
import { MazoSelectorModalComponent, DialogData } from '../mazo-selector-modal/mazo-selector-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/shared/users.service';
import { ToastrService } from 'ngx-toastr';



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
    private snackBar: MatSnackBar,
    private toastr: ToastrService,
  ){}



  ngOnInit(): void {
    const currentUser = this.usersService.getCurrentUser(); // PARA GET ULTIMO CURRENT USER
    };



  searchCards(cardName: string): void {
    this.searchPerformed = true;

    this.cardsService.getByName(cardName).subscribe({
      next: (data:any) => {
        this.resultsCards = [data]; // como dato desde back(axios) es un object y no es array...
      },
      error: (err) => {
        this.resultsCards = [];
    }});
  }

  public onAddCardToBuilder(card: Card): void {
    // si existe misma carta de misma id en builderCards. devuelve true o false
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    const cardExists = this.builderCards.some(existingCard => existingCard.id === card.id);
  
    // si no existe, push para añadir
    if (!cardExists) {
      this.builderCards.push(card);
    } else {
      // si existe, toastr
      this.toastr.info('Esta carta ya ha sido añadida al constructor. Después de añadir a tu mazo, puedes cambiar la cantidad en la pagina de "Mazos"', 'Información', {
        timeOut: 10000,
        positionClass: 'toast-top-center'
      });
    }
  }



  onDeleteFromChild(cardId: string){
    this.builderCards = this.builderCards.filter(card => card.id !== cardId);
  }



  // modal
  openDeckDialog(): void {

  // revisar si builderCards está vacío 
  if (this.builderCards.length === 0) {
    this.toastr.error('No has elegido ninguna carta para tu mazo', 'Información', {
      timeOut: 6000,
      positionClass: 'toast-top-center',
    });
    return; 
  }

    const dialogRef = this.dialog.open(MazoSelectorModalComponent, {
      width: '700px',
      height: '480px',
      panelClass: 'material-modal',
      data: { selectedDeckIndex: null } // default null, si no, sale error
    });
  
    dialogRef.afterClosed().subscribe(async (result: DialogData) => {
  
      // Obtener deckIndex desde modal
      const indexDeck = result.selectedDeckIndex;

  
      // Obtener current user
      const currentUser = await this.usersService.getCurrentUser();
      if (!currentUser) {
        console.log('No current user found.');
      }
  
      // Obtener current user Id
      const userId = this.usersService.getCurrentUserId();

      // Obtener cardApiIds y deckIndex en front
      const cardApiIds = this.builderCards.map(card => card.id); 

      // addCardsToDeck con cardApiIds(array de builderCards), userId y deckIndex
      this.cardsService.addCardsToDeck(cardApiIds, userId, indexDeck).subscribe({
        next: (response: any) => {

          this.toastr.info(`Añadido tu carta al mazo #${indexDeck}`, 'Enhorabuena!', {
            timeOut: 6000,
            positionClass: 'toast-top-center'
          });
          
          // vaciar builderCards
          this.builderCards = [];
        },
        error: (error: any) => {
          console.log('Error adding cards to deck:', error);
          this.toastr.error('Ha habido un error', 'Error', {
            timeOut: 4000,
            positionClass: 'toast-top-center'
          });
        }
      });
  
    });
  }
    


  public onCardInfoOpen(card:Card):void{
    this.selectedCard = card;
    this.darkenOverlay = true; 
    this.show_cardinfo = true; 
  }



  public onCardInfoClose():void{
  this.selectedCard = null; // resetear selectedCard cuendo se cierra
  this.darkenOverlay = false;
  this.show_cardinfo = false;
  }

  }