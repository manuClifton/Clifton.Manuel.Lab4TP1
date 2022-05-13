import { MijuegoComponent } from './mijuego/mijuego.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { MayormenorComponent } from './mayormenor/mayormenor.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  { path: 'ahorcado', component: AhorcadoComponent,
  ...canActivate(redirectUnauthorizedToLogin)
 },
  { path: 'mayormenor', component: MayormenorComponent,
  ...canActivate(redirectUnauthorizedToLogin)
 },
  { path: 'preguntados', component: PreguntadosComponent,
  ...canActivate(redirectUnauthorizedToLogin)
 },
  { path: 'mijuego', component: MijuegoComponent,
  ...canActivate(redirectUnauthorizedToLogin)
 }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class JuegosRoutingModule { }
