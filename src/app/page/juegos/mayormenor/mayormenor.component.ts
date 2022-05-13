import { AlertService } from './../../../services/alert.service';
import { JuegosService } from './../../../services/juegos.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mayormenor',
  templateUrl: './mayormenor.component.html',
  styleUrls: ['./mayormenor.component.css']
})
export class MayormenorComponent implements OnInit {

  
  user:any;
  cartas = [1,2,3,4,5,6,7,8,9,10,11,12];

  imgCartas  = [
    ["./../../../assets/img/mm/1_bastos.jpg", "./../../../assets/img/mm/1_copas.jpg",  "./../../../assets/img/mm/1_espadas.jpg", "./../../../assets/img/mm/1_oros.jpg"],
    ["./../../../assets/img/mm/2_bastos.jpg", "./../../../assets/img/mm/2_copas.jpg",  "./../../../assets/img/mm/2_espadas.jpg", "./../../../assets/img/mm/2_oros.jpg"],
    ["./../../../assets/img/mm/3_bastos.jpg", "./../../../assets/img/mm/3_copas.jpg",  "./../../../assets/img/mm/3_espadas.jpg", "./../../../assets/img/mm/3_oros.jpg"],
    ["./../../../assets/img/mm/4_bastos.jpg", "./../../../assets/img/mm/4_copas.jpg",  "./../../../assets/img/mm/4_espadas.jpg", "./../../../assets/img/mm/4_oros.jpg"],
    ["./../../../assets/img/mm/5_bastos.jpg", "./../../../assets/img/mm/5_copas.jpg",  "./../../../assets/img/mm/5_espadas.jpg", "./../../../assets/img/mm/5_oros.jpg"],
    ["./../../../assets/img/mm/6_bastos.jpg", "./../../../assets/img/mm/6_copas.jpg",  "./../../../assets/img/mm/6_espadas.jpg", "./../../../assets/img/mm/6_oros.jpg"],
    ["./../../../assets/img/mm/7_bastos.jpg", "./../../../assets/img/mm/7_copas.jpg",  "./../../../assets/img/mm/7_espadas.jpg", "./../../../assets/img/mm/7_oros.jpg"],
    ["./../../../assets/img/mm/8_bastos.jpg", "./../../../assets/img/mm/8_copas.jpg",  "./../../../assets/img/mm/8_espadas.jpg", "./../../../assets/img/mm/8_oros.jpg"],
    ["./../../../assets/img/mm/9_bastos.jpg", "./../../../assets/img/mm/9_copas.jpg",  "./../../../assets/img/mm/9_espadas.jpg", "./../../../assets/img/mm/9_oros.jpg"],
    ["./../../../assets/img/mm/10_bastos.jpg", "./../../../assets/img/mm/10_copas.jpg","./../../../assets/img/mm/10_espadas.jpg","./../../../assets/img/mm/10_oros.jpg"],
    ["./../../../assets/img/mm/11_bastos.jpg", "./../../../assets/img/mm/11_copas.jpg","./../../../assets/img/mm/11_espadas.jpg","./../../../assets/img/mm/11_oros.jpg"],
    ["./../../../assets/img/mm/12_bastos.jpg", "./../../../assets/img/mm/12_copas.jpg","./../../../assets/img/mm/12_espadas.jpg","./../../../assets/img/mm/12_oros.jpg"],
  ]
  cartaActual = Math.floor(Math.random()*this.cartas.length);
  imgActual = this.imgCartas[this.cartaActual][Math.floor(Math.random()*4)];

  numJugador:any;
  imgJugador:any;
  flag=false;

  jugador = {
    email: '',
    ganadas: 0,
    perdidas: 0
  }
  jugadores:any | [];


  constructor(
    private afAuth: Auth,
    private router: Router,
    private juegoDB: JuegosService,
    private alert: AlertService
    ) { }

  async ngOnInit() {
    this.imgJugador = null;
    this.user = await this.afAuth.onAuthStateChanged(user =>{
      if(!user){
        this.alert.showAlertBad('Ingresa tu Usuario');
        this.router.navigate(['/login'])
        }else{
          this.user = user;
          this.jugador.email = this.user.email;
        }
    })
    this.obtenerValoresJugadores()
  }

  obtenerValoresJugadores(){
    this.juegoDB.getAll('mayorMenor').then(refDB=>{
      refDB?.subscribe(refjugadores =>{
        //console.log(refMensajes)
        this.jugadores = refjugadores.map(refJugador =>{

          let jugador = refJugador.payload.doc.data();

          return jugador
        })
        if(this.jugadores){
          for (let i = 0; i < this.jugadores.length; i++) {
            if(this.jugadores[i].email == this.jugador.email){
              this.jugador.ganadas = this.jugadores[i].ganadas;
              this.jugador.perdidas = this.jugadores[i].perdidas;
            }
          }
          console.log(this.jugador)
        }
      })

    })
  }//

  agregarPuntajeDB(){
    let existe = true;
        for (let i = 0; i < this.jugadores.length; i++) {
          if(this.jugadores[i].email == this.jugador.email){
             //YA EXISTE EL JUGADOR AGREGAR DATOS NUEVOS MODIFICAR
             this.juegoDB.update('mayorMenor', this.jugador.email, this.jugador)
             .then(res =>{
              console.log(res)
              //aca hago lo que quiero
              //toast('Se creo usuario Correctamente', 3000)  AGREGAR EL CREAR DATOS EN LA TABLA
            })
            .catch(err =>{
              console.log('error en alta', err)
            })
            existe = true;
            break;
          }else{
            existe = false;
          }
          
        }
        if(!existe){
              // SI NO EXISTE CREARLO Y ASIGNAR PUNTOS
              this.juegoDB.create('mayorMenor',this.jugador)
              .then(res =>{
                console.log(res)
                //aca hago lo que quiero
                //toast('Se creo usuario Correctamente', 3000)  AGREGAR EL CREAR DATOS EN LA TABLA
              })
              .catch(err =>{
                console.log('error en alta puntos mayorMenor', err)
              })
        }
  }//



  mayor(){
    
    this.nuevaCarta()
    this.flag = true;
          if(this.numJugador > this.cartaActual){
            this.alert.showAlertGood('GANASTE');
            this.jugador.ganadas++
            this.agregarPuntajeDB()
           }

          if(this.numJugador < this.cartaActual){
            this.alert.showAlertBad('PERDISTE');
            this.jugador.perdidas++
            this.agregarPuntajeDB()
          }

          if(this.numJugador == this.cartaActual){
            this.alert.showAlertInfo('EMPATE');
         }
         setTimeout(() => {
          this.cartaActual = Math.floor(Math.random()*this.cartas.length);
          this.imgActual = this.imgCartas[this.cartaActual][Math.floor(Math.random()*4)];
          this.flag = false;
         }, 2000);

       }

      menor(){
        this.nuevaCarta()
        this.flag = true;
              if(this.numJugador > this.cartaActual){
                this.alert.showAlertBad('PERDISTE');
                this.jugador.perdidas++
                this.agregarPuntajeDB()
               }
    
              if(this.numJugador < this.cartaActual){
                this.alert.showAlertGood('GANASTE');
                this.jugador.ganadas++
                this.agregarPuntajeDB()
              }
    
              if(this.numJugador == this.cartaActual){
                this.alert.showAlertInfo('EMPATE');
             }

             setTimeout(() => {
              this.cartaActual = Math.floor(Math.random()*this.cartas.length);
              this.imgActual = this.imgCartas[this.cartaActual][Math.floor(Math.random()*4)];
              this.flag = false;
             }, 2000);

           }

    nuevaCarta(){
      this.numJugador = Math.floor(Math.random()*this.cartas.length);
      //alert(this.numJugador)
      this.imgJugador = this.imgCartas[this.numJugador][Math.floor(Math.random()*4)];
      //alert(this.imgJugador)
    }












}//
