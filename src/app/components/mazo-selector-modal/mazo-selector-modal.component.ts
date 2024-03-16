import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import {
  MatDialogModule, MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent,MatDialogActions, MatDialogClose, 
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { Response } from 'src/app/models/respuesta';
import { CardsService } from 'src/app/shared/cards.service';
import { Card } from 'src/app/models/card';
import { UsersService } from 'src/app/shared/users.service';
import { User } from 'src/app/models/user';

export interface DialogData {
  deck1: number;
  deck2: number;
  deck3: number;
  deck4: number;
  deck5: number;
}

@Component({
  selector: 'app-mazo-selector-modal',
  templateUrl: './mazo-selector-modal.component.html',
  styleUrls: ['./mazo-selector-modal.component.css'],
  // encapsulation: ViewEncapsulation.None //desabilitar Encapsulation de style
})

export class MazoSelectorModalComponent implements OnInit {

    // currentUser guarda dato logueado. Si está logueado, User, si no, null
    public currentUser: User | null = null;


  //https://material.angular.io/components/dialog/overview

  constructor(
    public dialogRef: MatDialogRef<MazoSelectorModalComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data: DialogData,
    public cardsService: CardsService,
    public usersService: UsersService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectDeck(deckNumber: number):void{
    console.log('Selected deck: ', deckNumber);
    this.dialogRef.close(deckNumber);
  }

  insertCardsIntoDeck(){
    this.cardsService
  }

  ngOnInit():void{
    // this.currentUser = this.usersService.getCurrentUser();
  }
}


