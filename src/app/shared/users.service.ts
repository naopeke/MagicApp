import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  public user:User;
  private url = "http://localhost:3000/";

// https://netbasal.com/angular-2-persist-your-login-status-with-behaviorsubject-45da9ec43243
  // si está logueado (true) o no (false) Manejar estado de Login
  public isLoginSubject = new BehaviorSubject<boolean>(false);

  // guarda info de users 
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  // public loggedIn: boolean = true; 


  constructor(private http: HttpClient) { 
    this.currentUser.subscribe(user => console.log('Current user:', user));

  }

  public register(user:User): Observable<Object>{
    let registerUrl = this.url + 'register';
    return this.http.post(registerUrl, user)
  }

  public login(user:User): Observable<Object>{
    let loginUrl = this.url + 'login';
    return this.http.post(loginUrl, user).pipe(
      tap((resp: any) => {
        console.log('Response from login API:', resp); 
        if (resp && resp.id_user){
          // si se coincide id_user, isLoginSubject (true) y update currentUserSubject (resp)
          this.isLoginSubject.next(true);
          this.currentUserSubject.next(resp);
        }
      })
    )
  }
  
  // devolver estado de login
  public isloggedIn(): BehaviorSubject<boolean> {
    return this.isLoginSubject;
  }

  public logout(){
    // borrar info de currentUser
    this.currentUserSubject.next(null);
    // log in false
    this.isLoginSubject.next(false);
  }

  public getCurrentUser(): User | null {
    return this.currentUserSubject.getValue();
  }

  // public getCurrentUser(): User | null {
  //   let currentUserValue: User | null = null;
  //   this.currentUser.subscribe(user => {
  //     currentUserValue = user;
  //   });
  //   return currentUserValue;
  // }
  

  public getCurrentUserId(): number | null {
    const currentUser = this.getCurrentUser();
    return currentUser && currentUser ? currentUser.id_user : null;
  }
  
  public currentUserChanges(): Observable<User | null> { //Para meter en otras paginas en ngOnInIt
    return this.currentUserSubject.asObservable();
  }
  
}