import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrls: ['./modal-profile.component.css']
})
export class ModalProfileComponent {
public avatares: string[] = [
  '../../../assets/images/personajes/avatar1.png',
  '../../../assets/images/personajes/avatar2.png',
  '../../../assets/images/personajes/avatar3.png',
  '../../../assets/images/personajes/avatar4.png'
]

public tierras: string[] = [
  '../../../assets/images/profile/llanura.png',
  '../../../assets/images/profile/isla.png', 
  '../../../assets/images/profile/pantano.png', 
  '../../../assets/images/profile/montaña.png',
  '../../../assets/images/profile/bosque.png'
]
}
