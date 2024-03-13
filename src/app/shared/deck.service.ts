import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor() { }
}

// *NOTE - Mis mazos
// router.get('/mis-mazos/:id_user, )
// router.post('/mis-mazos, ) añadir deck, pasar por body tbn el id_user
// router.put('/mis-mazos/nombre, ) editar nombre deck, pasar por body tbn el id_user
// router.put('/mis-mazos, ) modificar deck, pasar por body tbn el id_user
// router.put('/mis-mazos/compartir, ) modificar compartir boolean, pasar por body tbn el id_user

// *NOTE -  Explora

// router.get('/explora/ ) mazos que tienen compartir en true
// router.get('/explora/votados, ) mazos que tienen compartir true y limit a los cinco con mediascore más alta
// router.get('/explora/:id_deck ) que saque el mazo concreto en funcion del usuario DARLE UNA VUELTA










