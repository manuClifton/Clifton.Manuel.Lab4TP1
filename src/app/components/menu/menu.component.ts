import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  rutas =[
    { name: 'Quien Soy',  path: '/quiensoy', data:'/quiensoy', isLog: false},
    { name: 'Login',      path: '/login', data:'/login', isLog: false},
    { name: 'Log Out',    path: '/', data:'/home', isLog: true},
    { name: 'Registrarse',path: '/register', data:'/register', isLog: false},
    { name: 'Chat',       path: '/chat', data:'/chat', isLog: true},
  ];
  
  constructor(  private authService: AuthService,
                private router: Router
    ) { }

  async logOut(){
    await this.authService.logOut();
    this.router.navigateByUrl('/', {replaceUrl:true});
  }

}
