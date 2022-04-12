import { AlertService } from './../../services/alert.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  registerForm: FormGroup;

  constructor(  private fb: FormBuilder,
                private authService: AuthService,
                private router: Router,
                private alert: AlertService
                ) { 
                  this.registerForm = this.fb.group({
                    email: ['',[Validators.required, Validators.email]],
                    password: ['',[Validators.required, Validators.minLength(6)]],
                    password2: ['',[Validators.required, Validators.minLength(6)]]
                  });
                }

        get email(){
          return this.registerForm.get('email');
        }
          
        get password(){
          return this.registerForm.get('password');
        }
  

  ngOnInit(): void {
  }

  async register(){

    const user = await this.authService.register( this.registerForm.value);

    if(user){
      this.alert.showAlertGood('Acceso Correcto');  //CREAR COMPONENETE ALERT
      this.router.navigateByUrl('/home', {replaceUrl:true});
      //window.location.reload();
    }
    else{
      //Mostrar alerta
      this.alert.showAlertBad('Error de Ingreso');
    }
  }

}
