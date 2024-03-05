import { Component, OnInit } from '@angular/core';
import SwiperCore, { Swiper } from 'swiper';

SwiperCore.use([]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bgColor: string ='';

  ngOnInit(): void {
    const swiper = new Swiper('.mySwiper', {})
  }

  onSwiper(swiper:Swiper){
    swiper.on('slideChange', () => {
      const currentIndex= swiper.activeIndex;

      if(currentIndex == 0){
        this.bgColor = 'slide1'
      } else if (currentIndex == 1) {
        this.bgColor = 'slide2'
      } else if (currentIndex == 2) {
        this.bgColor = 'slide3'
      }
    })
  }
}
