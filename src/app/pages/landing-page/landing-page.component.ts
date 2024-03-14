import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WarningModalComponent } from 'src/app/components/warning-modal/warning-modal.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  constructor(private dialog: MatDialog){}

  openWarningModal(): void{
    const dialogRef = this.dialog.open(WarningModalComponent);
  }

  slidesPerView: number = 3;

  screenWidth: number;
  @HostListener ('window:resize')

  getScreenWidth(){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth >= 320 && this.screenWidth <=480){
      this.slidesPerView = 1
    } else if(this.screenWidth >= 320 && this.screenWidth <=480){
      this.slidesPerView = 2
    } else  if(this.screenWidth >= 320 && this.screenWidth <=480){
      this.slidesPerView = 3
    }
  }

}
