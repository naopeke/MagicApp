import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; //para cambiar min-width por router : nao
import { filter } from 'rxjs/operators'; //para cambiar min-width por router

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public   isSpecialRoute: boolean = false;   //para cambiar min-width por router : nao

  constructor(private router: Router){}

  ngOnInit(): void {
    //para cambiar min-width por router : nao
    //https://stackoverflow.com/questions/49722369/angular-router-events-navigationend-how-to-filter-only-the-last-event
    //https://fireflysemantics.medium.com/capturing-all-angular-navigationend-events-aba3ac2da650
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isSpecialRoute = ['/cartas', '/mis-mazos', '/landing-page', '/register' ].includes(event.url);
    });
}

}
