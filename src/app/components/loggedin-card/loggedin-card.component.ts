import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Card } from 'src/app/models/card';
import { CardsService } from 'src/app/shared/cards.service';
import { MazoSelectorModalComponent, DialogData } from '../mazo-selector-modal/mazo-selector-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/shared/users.service';
import { firstValueFrom } from 'rxjs';




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
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ){

  }



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


  openDeckDialog(): void {
    const dialogRef = this.dialog.open(MazoSelectorModalComponent, {
      width: '700px',
      height: '500px',
      data: { selectedDeckIndex: null } // default null, si no, sale error
    });
  
    dialogRef.afterClosed().subscribe(async (result: DialogData) => {
      console.log('The dialog was closed');
  
      // Obtener deckIndex desde modal
      const selectedDeckIndex = result.selectedDeckIndex;
      console.log('Selected Deck Index: ', selectedDeckIndex);
  
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
      const deckIndex = selectedDeckIndex;

      // addCardsToDeck con cardApiIds(array de builderCards), userId y deckIndex
      this.cardsService.addCardsToDeck(cardApiIds, userId, deckIndex).subscribe({
        next: (response: any) => {
          console.log('Cards added to deck:', response);
  
          // id_userとid_deckを取得してデータベースに保存
          const id_user = userId;
          const id_deck = response.id_deck;
  
          // ここでid_userとid_deckを使ってデータベースに保存する処理を実行します。
  
          // メッセージを表示
          this.snackBar.open(`Añadido tu carta al mazo #${deckIndex + 1}`, 'Cerrar', {
            duration: 4000,
            verticalPosition: 'top',
          });
          // ビルダーカードをクリア
          this.builderCards = [];
        },
        error: (error: any) => {
          console.error('Error adding cards to deck:', error);
          // エラーメッセージを表示する場合はここに追加します
        }
      });
  
    });
  }
  
  
  
  
  

  ngOnInit(): void {
    const currentUser = this.usersService.getCurrentUser(); // PARA GET ULTIMO CURRENT USER
    console.log('Current user loginCarta:', currentUser);
    
    // const userId = this.usersService.getCurrentUserId();
    // console.log('user id :', userId);

    
    // this.usersService.currentUser.subscribe(user => {
    //   console.log('Current user:', user);
    //   this.currentUser = user;
    //   // currentUser の値が取得された後に openDeckDialog() を呼び出す
    //   if (this.currentUser !== null) {
    //     this.openDeckDialog();
    //   }
    };
    

  

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




