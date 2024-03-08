import { Component } from '@angular/core';
import { Logging } from 'src/app/models/logging';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent {

  public login1:Logging;
  public login2:Logging;
  public bandera:boolean;
  public idBotonActivo:String;
  public modal_visible:boolean;

  user1:User = new User(1, "Kreatimes", "juan@gmail.com", "1234", " ", "");

  constructor(){
    this.login1 = new Logging(this.user1, true);
    this.login2 = new Logging(this.user1, false);

    if(this.login2.booleanLogeado){
      this.idBotonActivo = "btnUsuario";
    }else{
      this.idBotonActivo = 'btnIniciarSesion'
    }
    this.modal_visible = false;
  }

  loggout():void {
    
    this.login1.user == null;
    this.login1.booleanLogeado == false;
    console.log("login1");

  }
}
