import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder){
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

  register(){
    
  }


  ngOnInit(): void {
  }  


}
