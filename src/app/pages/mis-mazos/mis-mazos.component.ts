import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Card } from 'src/app/models/card';
import { CardsService } from 'src/app/shared/cards.service';

@Component({
  selector: 'app-mis-mazos',
  templateUrl: './mis-mazos.component.html',
  styleUrls: ['./mis-mazos.component.css']
})
export class MisMazosComponent implements OnInit, AfterViewInit {

  @ViewChild('mySwiper') mySwiper: any = null; // Swiperの要素にアクセスするためのViewChild



  constructor(
    private cardsService: CardsService,
  ){}



  onSwiper([swiper]) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  // スライドがクリックされたときの処理
  onSlideClicked(event: any) {
    console.log('slide clicked')
  const clickedIndex = event.clickedIndex; // クリックされたスライドのインデックスを取得
  console.log('Clicked slide index:', clickedIndex);

  // ここでクリックされたスライドに関連するデータを処理し、表示するなどの操作を行う
  // 例えば、clickedIndexに基づいてデータを取得して表示するなどの処理を行う
  }


  ngOnInit(): void {
  // if (this.mySwiper && this.mySwiper.swiperRef) {
  //   this.mySwiper.swiperRef.update(); // Swiperを初期化
  //   console.log(this.mySwiper); // this.mySwiperが定義されていることを確認
  // }
  this.mySwiper.nativeElement.addEventListener('slidechange', (event: any) => {
    console.log(event);
    console.log('activeIndex: ', event.detail[0].activeIndex); //現在表示中のスライドのインデックス。ただし初期値がでない
  });
}

  //https://qiita.com/frtklog/items/df7f1c4d5d870212e779
  //event.detail[0].activeIndexで現在表示中のスライドがどれなのか
  ngAfterViewInit(): void {
    this.mySwiper.nativeElement.addEventListener('slidechange', (event: any) => {
      console.log(event);
      console.log('activeIndex: ', event.detail[0].activeIndex); //現在表示中のスライドのインデックス。ただし初期値がでない
    });
}
}
