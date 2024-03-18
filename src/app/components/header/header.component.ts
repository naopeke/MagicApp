import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})

export class HeaderComponent implements OnInit {
  public bandera:boolean;
  public modal_visible:boolean;
  public currentUser: User | null = null;


  constructor(public usersService: UsersService, private router: Router){
    this.modal_visible = false;
  }

  logOut() {
    this.modal_visible = false;
    this.usersService.logout(); // usar logout de usersService
    this.usersService.user = null;
    this.router.navigate(['landing-page']);
  }

  ngOnInit(): void {
    this.usersService.currentUserChanges().subscribe(user => {
      this.currentUser = user;
    });

}

}