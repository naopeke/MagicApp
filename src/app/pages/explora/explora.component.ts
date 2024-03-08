
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-explora',
  templateUrl: './explora.component.html',
  styleUrls: ['./explora.component.css']
})
export class ExploraComponent {

  public datos: object[]
  public datosVotados: object[]
  public explorar: boolean = true

  constructor(){
    this.datos = [
      {
        puntuacion: 5, 
        nombreUsuario: 'Kaoser',
        nombreMazo: 'dragonfly',
        estrellas: ["../../../assets/images/iconos/estrella2.png",
        "../../../assets/images/iconos/estrella2.png",
        "../../../assets/images/iconos/estrella2.png",
        "../../../assets/images/iconos/estrella2.png",
        "../../../assets/images/iconos/estrella2.png"],
        cartas: [ new Card('1', 0,"../../../assets/images/carta1landing.png"),
        new Card('2', 0,"../../../assets/images/carta1landing.png"),
        new Card('3', 0,"../../../assets/images/carta1landing.png"),
        new Card('4', 0,"../../../assets/images/carta1landing.png")]
      },
      {
        puntuacion: 5, 
        nombreUsuario: 'Kaoser',
        nombreMazo: 'dragonfly',
        estrellas: ["../../../assets/images/iconos/estrella2.png",
        "../../../assets/images/iconos/estrella2.png",
        "../../../assets/images/iconos/estrella2.png",
        "../../../assets/images/iconos/estrella2.png",
        "../../../assets/images/iconos/estrella2.png"],
        cartas: [ new Card('1', 1,"../../../assets/images/carta1landing.png"),
        new Card('2', 1,"../../../assets/images/carta1landing.png"),
        new Card('3', 1,"../../../assets/images/carta1landing.png"),
        new Card('4', 1,"../../../assets/images/carta1landing.png"),
        new Card('1', 1,"../../../assets/images/carta1landing.png"),
        new Card('2', 1,"../../../assets/images/carta1landing.png"),
        new Card('3', 1,"../../../assets/images/carta1landing.png"),
        new Card('4', 1,"../../../assets/images/carta1landing.png"),
        new Card('1', 1,"../../../assets/images/carta1landing.png"),
        new Card('2', 1,"../../../assets/images/carta1landing.png"),
        new Card('3', 1,"../../../assets/images/carta1landing.png"),
        new Card('4', 1,"../../../assets/images/carta1landing.png"),
        new Card('1', 1,"../../../assets/images/carta1landing.png"),
        new Card('2', 1,"../../../assets/images/carta1landing.png"),
        new Card('3', 1,"../../../assets/images/carta1landing.png"),
        new Card('4', 1,"../../../assets/images/carta1landing.png")]
      }, 
      {
        puntuacion: 5, 
        nombreUsuario: 'Kaoser',
        nombreMazo: 'dragonfly',
        estrellas: ["../../../assets/images/iconos/estrella2.png",
        "../../../assets/images/iconos/estrella2.png",
        "../../../assets/images/iconos/estrella2.png",
        "../../../assets/images/iconos/estrella2.png",
        "../../../assets/images/iconos/estrella2.png"],
        cartas: [ new Card('1', 2,"../../../assets/images/carta1landing.png"),
        new Card('2', 2,"../../../assets/images/carta1landing.png"),
        new Card('3', 2,"../../../assets/images/carta1landing.png"),
        new Card('4', 2,"../../../assets/images/carta1landing.png")]
      },
      {
        puntuacion: 5, 
        nombreUsuario: 'Kaoser',
        nombreMazo: 'dragonfly',
        estrellas: ["../../../assets/images/iconos/estrella2.png",
        "../../../assets/images/iconos/estrella2.png",
        "../../../assets/images/iconos/estrella2.png",
        "../../../assets/images/iconos/estrella2.png",
        "../../../assets/images/iconos/estrella2.png"],
        cartas: [ new Card('1', 1,"../../../assets/images/carta1landing.png"),
        new Card('2', 3,"../../../assets/images/carta1landing.png"),
        new Card('3', 3,"../../../assets/images/carta1landing.png"),
        new Card('4', 3,"../../../assets/images/carta1landing.png")]
      },
      {
        puntuacion: 5, 
        nombreUsuario: 'Kaoser',
        nombreMazo: 'dragonfly',
        estrellas: ["../../../assets/images/iconos/estrella2.png",
        "../../../assets/images/iconos/estrella2.png",
        "../../../assets/images/iconos/estrella2.png",
        "../../../assets/images/iconos/estrella2.png",
        "../../../assets/images/iconos/estrella2.png"],
        cartas: [ new Card('1', 4,"../../../assets/images/carta1landing.png"),
        new Card('2', 4,"../../../assets/images/carta1landing.png"),
        new Card('3', 4,"../../../assets/images/carta1landing.png"),
        new Card('4', 4,"../../../assets/images/carta1landing.png")]
      }

    ]

    this.datosVotados = [
      {
        puntuacion: 5, 
        nombreUsuario: 'Kaoser',
        nombreMazo: 'dragonfly',
        estrellas: ["../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png"],
        cartas: [ new Card('1', 1,"../../../assets/images/carta1landing.png"),
        new Card('2', 1,"../../../assets/images/carta1landing.png"),
        new Card('3', 1,"../../../assets/images/carta1landing.png"),
        new Card('4', 1,"../../../assets/images/carta1landing.png")]
      }, 
      {
        puntuacion: 5, 
        nombreUsuario: 'Kaoser',
        nombreMazo: 'dragonfly',
        estrellas: ["../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png"],
        cartas: [ new Card('1', 1,"../../../assets/images/carta1landing.png"),
        new Card('2', 1,"../../../assets/images/carta1landing.png"),
        new Card('3', 1,"../../../assets/images/carta1landing.png"),
        new Card('4', 1,"../../../assets/images/carta1landing.png")]
      }, 
      {
        puntuacion: 5, 
        nombreUsuario: 'Kaoser',
        nombreMazo: 'dragonfly',
        estrellas: ["../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png"],
        cartas: [ new Card('1', 2,"../../../assets/images/carta1landing.png"),
        new Card('2', 2,"../../../assets/images/carta1landing.png"),
        new Card('3', 2,"../../../assets/images/carta1landing.png"),
        new Card('4', 2,"../../../assets/images/carta1landing.png")]
      },
      {
        puntuacion: 5, 
        nombreUsuario: 'Kaoser',
        nombreMazo: 'dragonfly',
        estrellas: ["../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella2.png"],
        cartas: [ new Card('1', 2,"../../../assets/images/carta1landing.png"),
        new Card('2', 2,"../../../assets/images/carta1landing.png"),
        new Card('3', 2,"../../../assets/images/carta1landing.png"),
        new Card('4', 2,"../../../assets/images/carta1landing.png")]
      },
      {
        puntuacion: 5, 
        nombreUsuario: 'Kaoser',
        nombreMazo: 'dragonfly',
        estrellas: ["../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella2.png",
        "../../../assets/images/iconos/estrella2.png"],
        cartas: [ new Card('1', 2,"../../../assets/images/carta1landing.png"),
        new Card('2', 2,"../../../assets/images/carta1landing.png"),
        new Card('3', 2,"../../../assets/images/carta1landing.png"),
        new Card('4', 2,"../../../assets/images/carta1landing.png")]
      }
    ]
  }

  public explora(){
    this.explorar = true
  }
}
