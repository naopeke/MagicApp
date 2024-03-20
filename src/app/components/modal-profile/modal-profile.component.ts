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
  'https://i.imgur.com/DfPRe0j.png',
  'https://i.imgur.com/7Hot9pr.png',
  'https://i.imgur.com/C5EqkRh.png',
  'https://i.imgur.com/pY8Vdwo.png'
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
