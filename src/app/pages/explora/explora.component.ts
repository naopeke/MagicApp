
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ScrollingModule} from '@angular/cdk/scrolling';

@Component({
  selector: 'app-explora',
  templateUrl: './explora.component.html',
  styleUrls: ['./explora.component.css']
})
export class ExploraComponent {
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  public datos: object[]

  

  constructor(){
    this.datos = [
      {
        puntuacion: 5, 
        nombreUsuario: 'Kaoser',
        nombreMazo: 'dragonfly',
        estrellas: ["../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png"]
      }, 
      {
        puntuacion: 5, 
        nombreUsuario: 'Kaoser',
        nombreMazo: 'dragonfly',
        estrellas: ["../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png"]
  
      }, 
      {
        puntuacion: 5, 
        nombreUsuario: 'Kaoser',
        nombreMazo: 'dragonfly',
        estrellas: ["../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png",
        "../../../assets/images/iconos/estrella.png"]
      }
    ]
  }
}
