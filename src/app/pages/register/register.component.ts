import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public myClass:boolean = false; 
  public show_login:boolean = false; 

  constructor(private formBuilder: FormBuilder, private router: Router){
    this.buildForm(); 
  }

  private buildForm(){
    let minLength: number = 8; 
    this.registerForm = this.formBuilder.group({
      name: [, Validators.required],
      email: [, [Validators.required, Validators.email]],
      password: [, [Validators.required, Validators.minLength(minLength)]],
      repeat_password: [, [Validators.required, Validators.minLength(minLength), this.checkPassword]]
    })
  }

  private checkPassword(control: AbstractControl){
    let result = {matchPassword: true};
    if (control.parent?.value.password == control.value)
    result = null; 
    return result; 
  }

  public login(){
    this.myClass=true; 
    this.show_login = true; 
  }

  public loginClose(show: boolean){
    this.myClass = show;
    this.show_login = show;
  }

  public register(){

  }


  ngOnInit(): void {
  }  


}
