import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  public user:User;

  constructor() { }

  private loggedIn = false;

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