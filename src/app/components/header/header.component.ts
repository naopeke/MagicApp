import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/shared/users.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})

export class HeaderComponent implements OnInit {
  public bandera:boolean;
  public modal_visible:boolean;
  public currentUser: User | null = null;
  public isSmallScreen: boolean = false;


  constructor(public usersService: UsersService, private router: Router, private breakpointObserver: BreakpointObserver){
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
    this.breakpointObserver.observe([Breakpoints.XSmall])
    .subscribe(result => this.isSmallScreen = result.matches);
}
}