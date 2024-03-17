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
  // si está logueado (true) o no (false)
  public isLoginSubject = new BehaviorSubject<boolean>(false);

  // guarda info de users
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  // public loggedIn: boolean = true; 


  constructor(private http: HttpClient) { }

  public register(user:User): Observable<Object>{
    let registerUrl = this.url + 'register';
    return this.http.post(registerUrl, user)
  }

  public login(user:User): Observable<Object>{
    let loginUrl = this.url + 'login';
    return this.http.post(loginUrl, user).pipe(
      tap((resp: any) => {
        if (resp && resp.id_user){
          // si se coincide id_user, isLoginSubject (true) y update currentUserSubject (resp)
          this.isLoginSubject.next(true);
          this.currentUserSubject.next(resp);
        }
      })
    )
  }
  
  public isloggedIn():Observable<boolean>{
    return this.isLoginSubject.asObservable();
  }

  public logout(){
    // borrar info de currentUser
    this.currentUserSubject.next(null);
    // log in false
    this.isLoginSubject.next(false);
  }

  public getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Belen perfil
  public getProfile(id_user:number){
    return this.http.get(this.url + 'profile/' + id_user)
  }

  public putProfile(user:User){
    let body = {
      nameUser: user.nameUser,
      emailUser: user.emailUser,
      description: user.description,
      id_user: user.id_user
    }
    return this.http.put(this.url + 'profile/general', body)
  }

  public putPassword(user:User){
    let body = {
      passwordUser: user.passwordUser,
      id_user: user.id_user
    }
    return this.http.put(this.url + 'profile/password', body)
  }

  public putAvatar(user:User){
    let body = {
      avatar: user.avatar,
      icon:user.icon,
      id_user: user.id_user
    }
    return this.http.put(this.url + 'profile/avatar', body)
  }
  // Belen perfil



  ngOnInit(): void {     
  }
}