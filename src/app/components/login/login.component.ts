import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup; 

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

ngOnInit(): void {
}


}
