import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  public user:User;

  constructor() { }

  private loggedIn = true;

  public login(){
    this.loggedIn = true;
  }

  public logout(){
    this.loggedIn = false;
  }

  public statusLogin(): boolean {
    return this.loggedIn;
  }


}

// router.post('/register', )
// router.post('/loginUser', )

// router.get('/profile/:id_user', ) 
// router.put('/profile/datos', )
// router.put('/profile/contraseña', )