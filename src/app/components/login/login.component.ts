import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
import { Response } from 'src/app/models/respuesta';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/users.service';

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
  public user: User; 

  constructor (private formBuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              public myUsersService: UsersService){
this.buildForm(); 
}

private buildForm(){
  let minPassLength = 8;

  this.loginForm = this.formBuilder.group({
    emailUser: [, [Validators.required, Validators.email]],
    passwordUser:[, [Validators.required, Validators.minLength(minPassLength)]]
  });
}

public login(){
  let userFormData = this.loginForm.value; 

  let user: User = new User(null,
                            null,
                            userFormData.emailUser, 
                            userFormData.passwordUser);

  this.myUsersService.login(user).subscribe({
    next: (resp: Response) => {
      if (!resp.err) {
        // this.toastr.success('Usuario logueado con éxito', "");
        this.loginForm.reset({'emailUser': '', 'passwordUser': ''});
        // this.myUsersService.loggedIn = true;
        this.myUsersService.isLoginSubject.next(true);
        user = resp.data;
        this.myUsersService.user = user;
        this.router.navigate(['/home']);
      } else {
        console.log('error');
      }
    },
    error: (error) => {
      this.toastr.error('El usuario no se encuentra', "", {timeOut: 4000, positionClass: 'toast-top-center'});
      console.log('Login error:', error);
    }
  });
}

public loginClose(){
  this.onLoginClose.emit(false);
}

ngOnInit(): void {
}

}