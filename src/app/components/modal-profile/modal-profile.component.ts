import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrls: ['./modal-profile.component.css']
})
export class ModalProfileComponent {

@Output() eventoAvatar = new EventEmitter<string>();
@Output() eventoTierra = new EventEmitter<string>();


public avatares: string[] = [
  // 'https://i.imgur.com/DfPRe0j.png',
  'https://i.imgur.com/IdtF9h9.png',
  // 'https://i.imgur.com/0sX4iCL.png',
  'https://i.imgur.com/lQIpigF.png',
  // 'https://i.imgur.com/C5EqkRh.png',
  // 'https://i.imgur.com/IdMKjBQ.png',
  'https://i.imgur.com/3eHj4o7.png',
  'https://i.imgur.com/LltsJud.png',
  'https://i.imgur.com/sE7RrkL.png',
  // 'https://i.imgur.com/04qz7PP.png',
  'https://i.imgur.com/4z5Jojt.png',
  'https://i.imgur.com/NDvabf5.png',
  'https://i.imgur.com/cPyHdr1.png',
  'https://i.imgur.com/Y25jiXC.png',
  'https://i.imgur.com/idMMBj8.png',
  'https://i.imgur.com/rnHZn3L.png',
  'https://i.imgur.com/ka5somq.png',
  'https://i.imgur.com/dLdoszw.png',
  'https://i.imgur.com/vFPRPM9.png'
]
public avatarSeleccionado: string;

public tierras: string[] = [
  '../../../assets/images/profile/llanura.png',
  '../../../assets/images/profile/isla.png', 
  '../../../assets/images/profile/pantano.png', 
  '../../../assets/images/profile/montaña.png',
  '../../../assets/images/profile/bosque.png'
]

public tierraSeleccionada: string;

enviaAvatar(avatar: string){
  this.avatarSeleccionado = avatar
  this.eventoAvatar.emit(avatar)
}

enviarTierra(tierra:string){
  this.tierraSeleccionada = tierra
  this.eventoTierra.emit(tierra)
}

}
