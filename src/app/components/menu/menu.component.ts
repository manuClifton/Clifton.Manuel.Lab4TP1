import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  rutas =[
    { name: 'Quien Soy',  path: '/quiensoy', data:'/quiensoy', isLog: false},
    { name: 'Login',      path: '/login', data:'/login', isLog: false},
    { name: 'Log Out',    path: '/', data:'/home', isLog: true},
    { name: 'Registrarse',path: '/register', data:'/register', isLog: false},
    { name: 'Chat',       path: '/chat', data:'/chat', isLog: true},
  ];
  public isLogged = false;
  public user:any;
  
  constructor(  private authService: AuthService,
                private router: Router,
                private auth: Auth
    ) { }

    
  async ngOnInit() {
    //aca busco el usuario, y lo guardo en variable tipo USUARIO(id, email,)
    //Despues busco su rol y demas infomarcion
      await this.auth.onAuthStateChanged(user =>{
        if(user){
          this.user = user;
          console.log(this.user.email)
          this.isLogged = true;
        }
      })
      //console.log(this.authService.getCurrentUser())
  }


  async logOut(){
    await this.authService.logOut();
    //this.router.navigateByUrl('/', {replaceUrl:true});
    window.location.reload();
    
  }

}
