import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.css']
})
export class WarningModalComponent {

  constructor(
    private dialogRef: MatDialogRef<WarningModalComponent>,
    private router: Router
  ) { }

  openRegistrationPage(): void {
    this.dialogRef.close();
    this.router.navigate(['/register']);
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
