import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UsersService {
  public user:User;
  private url = "http://localhost:3000/";
  public loggedIn: boolean = true; 


  constructor(private http: HttpClient) { }

  public register(user:User): Observable<Object>{
    let registerUrl = this.url + 'register';
    return this.http.post(registerUrl, user)
  }

  // public login(){
  //   this.loggedIn = true;
  // }

  // public logout(){
  //   this.loggedIn = false;
  // }

  public statusLogin(): boolean {
    return this.loggedIn;
  }


}

// router.post('/register', )
// router.post('/loginUser', )

// router.get('/profile/:id_user', ) 
// router.put('/profile/datos', )
// router.put('/profile/contraseña', )