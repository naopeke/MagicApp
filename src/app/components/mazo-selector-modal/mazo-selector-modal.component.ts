import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import {
  MatDialogModule, MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent,MatDialogActions, MatDialogClose, 
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { Response } from 'src/app/models/response';
import { CardsService } from 'src/app/shared/cards.service';
import { Card } from 'src/app/models/card';
import { UsersService } from 'src/app/shared/users.service';
import { User } from 'src/app/models/user';

//https://material.angular.io/components/dialog/overview
export interface DialogData {
  selectedDeckIndex: number;
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
    this.dialogRef.close({ selectedDeckIndex: deckNumber});
  }
  

  ngOnInit():void{
    const currentUser = this.usersService.getCurrentUser(); // PARA GET ULTIMO CURRENT USER
    console.log('Current user deck Modal:', currentUser);
}

}
