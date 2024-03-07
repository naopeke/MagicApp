import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 @Output() onLoginClose = new EventEmitter<boolean>(); 

  public loginForm: FormGroup; 
  public myClass:boolean = false; 
  public show_login:boolean = false; 

  constructor (private formBuilder: FormBuilder,
    private router: Router){
this.buildForm(); 
}

private buildForm(){
  let minPassLength = 8;

  this.loginForm = this.formBuilder.group({
    email: [, [Validators.required, Validators.email]],
    password:[, [Validators.required, Validators.minLength(minPassLength)]]
  });
}

public login(){
  
}

public loginClose(){
  this.onLoginClose.emit(false);
}

public navegate_home(){
  this.router.navigate(['/home'])

}

ngOnInit(): void {
}


}
