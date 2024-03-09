import { Component, ViewEncapsulation, Inject } from '@angular/core';
import {
  MatDialogModule,
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


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
export class MazoSelectorModalComponent {
  constructor(
    public dialogRef: MatDialogRef<MazoSelectorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectDeck(deckNumber: number):void{
    console.log('Selected deck: ', deckNumber);
    this.dialogRef.close(deckNumber);
  }
}


