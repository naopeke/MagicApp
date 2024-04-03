import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/shared/users.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'; //para cambiar min-width por router
import { filter } from 'rxjs/operators'; //para cambiar min-width por router




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})

export class HeaderComponent implements OnInit {
  public bandera:boolean;
  public modal_visible:boolean;
  public currentUser: User | null = null;
  public isSmallScreen: boolean = false; //para medir si es la pantalla es pequeño (600px) o no : nao
  public   isSpecialRoute: boolean = false;   //para cambiar min-width por router : nao


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

    //para cambiar boton de login al icon por el tamaño de pantalla, observa el tamaño : nao
    this.breakpointObserver.observe([Breakpoints.XSmall])
    .subscribe(result => this.isSmallScreen = result.matches);

    //para cambiar min-width por router : nao
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isSpecialRoute = ['/cartas', '/mis-mazos', '/landing-page', '/register' ].includes(event.url);
    });
}
}