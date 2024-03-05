import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  slidesPerView: number = 3;

  screenWidth!: number;
  @HostListener('window:resize')
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
