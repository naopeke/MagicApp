import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/shared/users.service';
import { Response } from 'src/app/models/respuesta';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public myClass:boolean = false; 
  public show_login:boolean = false; 
  public user: User; 
  public visible1:boolean = true
  public changetype1:boolean = true
  public visible2:boolean = true
  public changetype2:boolean = true

 

  constructor(public myUsersService: UsersService, 
              private formBuilder: FormBuilder, 
              private router: Router,
              private toastr: ToastrService){
    this.buildForm(); 
  }

  private buildForm(){
    let minLength: number = 8; 
    this.registerForm = this.formBuilder.group({
      nameUser: [, Validators.required],
      emailUser: [, [Validators.required, Validators.email]],
      passwordUser: [, [Validators.required, Validators.minLength(minLength)]],
      repeat_password: [, [Validators.required, Validators.minLength(minLength), this.checkPassword]]
    })
  }

  private checkPassword(control: AbstractControl){
    let result = {matchPassword: true};
    if (control.parent?.value.passwordUser == control.value)
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
    let registerData = this.registerForm.value;

    let newUser: User = new User (null, registerData.nameUser, registerData.emailUser,
      registerData.passwordUser);

      this.myUsersService.register(newUser)
      .subscribe((resp: Response)=>{
        if(!resp.err){
          console.log(resp)
          this.toastr.success("Usuario insertado con éxito","");  
          this.registerForm.reset({'nameUser': '', 'emailUser': '', 'passwordUser': '', 'repeatPassword': ''});
          this.myUsersService.user = null; 
          this.myClass=true; 
          this.show_login = true; 
        }else{
          console.error('error');
          this.toastr.error("El usuario ya existe","", 
            {timeOut: 2000, positionClass: 'toast-top-center'});
        }
      }) 
  }


  ngOnInit(): void {
  }  
  viewPass(password: number){
    password == 1 ? (this.visible1 = !this.visible1, this.changetype1 = !this.changetype1)
                  : (this.visible2 = !this.visible2, this.changetype2 = !this.changetype2)
  }

}
