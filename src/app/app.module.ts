import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { RegisterComponent } from './page/register/register.component';
import { ChatComponent } from './page/chat/chat.component';
import { QuiensoyComponent } from './page/quiensoy/quiensoy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ConectionDirective } from './directives/conection.directive';
import { AhorcadoComponent } from './page/juegos/ahorcado/ahorcado.component';
import { MayormenorComponent } from './page/juegos/mayormenor/mayormenor.component';
import { PreguntadosComponent } from './page/juegos/preguntados/preguntados.component';
import { MijuegoComponent } from './page/juegos/mijuego/mijuego.component';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    RegisterComponent,
    ChatComponent,
    QuiensoyComponent,
    ConectionDirective,
    AhorcadoComponent,
    MayormenorComponent,
    PreguntadosComponent,
    MijuegoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
