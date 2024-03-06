import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
<<<<<<< HEAD
import { RegisterComponent } from './pages/register/register.component';
=======
import { ExploraComponent } from './pages/explora/explora.component';
import { EventoComponent } from './pages/evento/evento.component';
import { AboutComponent } from './pages/about/about.component';
import { MisMazosComponent } from './pages/mis-mazos/mis-mazos.component';
import { CartasComponent } from './pages/cartas/cartas.component';
import { CalendarioComponent } from './pages/calendario/calendario.component';
>>>>>>> ffe4fa33b891532dfeabf0cb93b4bd83f034b037

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent },
<<<<<<< HEAD
  { path: 'register', component: RegisterComponent}
=======
  { path: 'mis-mazos', component: MisMazosComponent},
  { path: 'explora', component:ExploraComponent},
  { path: 'evento', component:EventoComponent},
  { path: 'about', component:AboutComponent},
  { path: 'cartas', component: CartasComponent},
  {path: 'calendario', component: CalendarioComponent}
>>>>>>> ffe4fa33b891532dfeabf0cb93b4bd83f034b037
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
