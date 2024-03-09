import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { Card } from 'src/app/models/card';
import { Deck } from 'src/app/models/deck';
import { CardsService } from 'src/app/shared/cards.service';

@Component({
  selector: 'app-mis-mazos',
  templateUrl: './mis-mazos.component.html',
  styleUrls: ['./mis-mazos.component.css']
})
export class MisMazosComponent implements OnInit, AfterViewInit {

  public datos: Deck[];
  public mazo: Deck;
  public datosVotados: Deck[];
  public explorar: boolean = true;


  @ViewChild('mySwiper') mySwiper: any = null; // Swiperの要素にアクセスするためのViewChild



  constructor(
    private cardsService: CardsService,
  ){
    this.datos = [
      new Deck(1, 'Dragonfly', 'Kaoser', 5, [ new Card('1', 0,"../../../assets/images/carta1landing.png"),
        new Card('2', 0,"../../../assets/images/carta1landing.png"),
        new Card('3', 0,"../../../assets/images/carta1landing.png"),
        new Card('4', 0,"../../../assets/images/carta1landing.png")], 
        ["../../../assets/images/iconos/estrella2.png",
        "../../../assets/images/iconos/estrella2.png",
        "../../../assets/images/iconos/estrella2.png",
        "../../../assets/images/iconos/estrella2.png",
        "../../../assets/images/iconos/estrella2.png"
      ]), 
      new Deck(2, 'onFire', 'Kaoser', 5, [ 
        new Card('1', 0,"../../../assets/images/carta1landing.png"),
        new Card('2', 0,"../../../assets/images/carta1landing.png"),
        new Card('3', 0,"../../../assets/images/carta1landing.png"),
        new Card('4', 0,"../../../assets/images/carta1landing.png"),
        new Card('5', 0,"../../../assets/images/carta1landing.png"),
        new Card('6', 0,"../../../assets/images/carta1landing.png"),
        new Card('7', 0,"../../../assets/images/carta1landing.png"),
        new Card('8', 0,"../../../assets/images/carta1landing.png"),
        new Card('9', 0,"../../../assets/images/carta1landing.png"),
        new Card('10', 0,"../../../assets/images/carta1landing.png"),
        new Card('11', 0,"../../../assets/images/carta1landing.png"),
        new Card('12', 0,"../../../assets/images/carta1landing.png")], 
      ["../../../assets/images/iconos/estrella2.png",
      "../../../assets/images/iconos/estrella2.png",
      "../../../assets/images/iconos/estrella2.png",
      "../../../assets/images/iconos/estrella2.png",
      "../../../assets/images/iconos/estrella2.png"
      ]),
      new Deck(3, 'Dragonfly', 'Deimos', 5, [ 
        new Card('1', 0,"../../../assets/images/carta1landing.png"),
        new Card('2', 0,"../../../assets/images/carta1landing.png"),
        new Card('3', 0,"../../../assets/images/carta1landing.png"),
        new Card('4', 0,"../../../assets/images/carta1landing.png"),
        new Card('5', 0,"../../../assets/images/carta1landing.png"),
        new Card('6', 0,"../../../assets/images/carta1landing.png"),
        new Card('7', 0,"../../../assets/images/carta1landing.png"),
        new Card('8', 0,"../../../assets/images/carta1landing.png"),
        new Card('9', 0,"../../../assets/images/carta1landing.png"),
        new Card('10', 0,"../../../assets/images/carta1landing.png"),
        new Card('11', 0,"../../../assets/images/carta1landing.png"),
        new Card('12', 0,"../../../assets/images/carta1landing.png")], 
      ["../../../assets/images/iconos/estrella2.png",
      "../../../assets/images/iconos/estrella2.png",
      "../../../assets/images/iconos/estrella2.png",
      "../../../assets/images/iconos/estrella2.png",
      "../../../assets/images/iconos/estrella2.png"
      ])
    ]
  }

  public seleccionMazo(id_deck:number){
    this.explorar = true
    let cartas = this.datos.find ((deck) => {
      return deck.id_deck == id_deck
    })

   this.mazo = cartas
   console.log(this.mazo);

  }



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
