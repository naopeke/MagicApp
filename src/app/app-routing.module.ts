import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExploraComponent } from './pages/explora/explora.component';
import { EventoComponent } from './pages/evento/evento.component';
import { AboutComponent } from './pages/about/about.component';
import { MisMazosComponent } from './pages/mis-mazos/mis-mazos.component';
import { CartasComponent } from './pages/cartas/cartas.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'mis-mazos', component: MisMazosComponent},
  { path: 'explora', component:ExploraComponent},
  { path: 'evento', component:EventoComponent},
  { path: 'about', component:AboutComponent},
  { path: 'cartas', component: CartasComponent},
  { path: 'profile', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
