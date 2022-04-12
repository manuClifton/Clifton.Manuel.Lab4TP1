import { AlertService } from './../../services/alert.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router,
               private alert: AlertService
             ) {
              this.loginForm = this.fb.group({
                email: ['',[Validators.required, Validators.email]],
                password: ['',[Validators.required, Validators.minLength(6)]]
              });
              }

        get email(){
          return this.loginForm.get('email');
        }
          
        get password(){
          return this.loginForm.get('password');
        }

  ngOnInit(): void {

  }


  async login(){

    const user = await this.authService.login(this.loginForm.value);
    if(user){
      this.alert.showAlertGood('Acceso Correcto');
      this.router.navigateByUrl('/home', {replaceUrl:true});
      //window.location.reload();
    }
    else{
      //Mostrar alerta
      this.alert.showAlertBad('Error de Ingreso');
    }
  }



  /////////////////////////////////
}
