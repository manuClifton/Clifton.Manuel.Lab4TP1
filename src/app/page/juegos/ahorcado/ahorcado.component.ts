import { Component, OnInit } from '@angular/core';

import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { JuegosService } from '../../../services/juegos.service';
import { AlertService } from '../../../services/alert.service';


@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {
  user:any;
  flag = true;
  contFallas = 0;
  palabra = '';
  guiones = '';
  nuevoGuion = '';
  letra = '';
  imagen = "../../../../assets/img/Ahorcado01.png";
  imagenes = [
              "../../../../assets/img/Ahorcado01.png",
              "../../../../assets/img/Ahorcado02.png",
              "../../../../assets/img/Ahorcado03.png",
              "../../../../assets/img/Ahorcado04.png",
              "../../../../assets/img/Ahorcado05.png",
              "../../../../assets/img/Ahorcado06.png"
            ]

  palabras = ["casa","perro","gato","avion","canasto","clima","elefante","auto","tigre","leon","computadora","celular","telefono",
              "escritorio","boca","cabeza","zapato","camisa","pantalon","mochila","barbijo","electricidad"];
  
  jugador = {
    email: '',
    ganadas: 0,
    perdidas: 0
  }
  jugadores:any | [];

  constructor( 
               private auth: Auth,
               private router:Router,
               private juegoDB:JuegosService,
               private alert: AlertService
            ) { }

  async ngOnInit() {
    this.user = await this.auth.onAuthStateChanged(user =>{
      if(!user){
        this.alert.showAlertBad('Ingresa tu Usuario');
        this.router.navigate(['/login'])
        }else{
          this.user = user;
          this.jugador.email = this.user.email;
        }
    })
    this.actualizarPalabrta();
    this.crearGuiones();
    this.obtenerValoresJugadores()
  }//

  verificar(letra:string){
    this.letra = letra;
      for (let i = 0; i < this.palabra.length; i++) { 
        if(this.palabra[i] == this.letra){
          this.guiones = this.replaceAt(i*2, this.letra, this.guiones);
          this.flag = false;
        }
      }
    

    if(this.flag){
      this.contFallas++;
      this.imagen = this.imagenes[this.contFallas]
      if(this.contFallas == 5){
   
        setTimeout(() => {
          this.imagen = this.imagenes[5];
        }, 1000);
        
        this.alert.showAlertBad('PERDISTE');
      /*   Swal.fire({
          icon: 'error',
          title: 'PERDISTE',
          text: 'Volve a intenarlo...',
        })*/
        this.actualizarPalabrta();
        this.crearGuiones();
        setTimeout(() => {
          this.imagen = "../../../../assets/img/Ahorcado01.png";
          this.contFallas = 0;
          this.letra = '';

          this.jugador.perdidas++
          this.agregarPuntajeDB()
        }, 1500);

      }
    }

    if(!this.guiones.includes('_')){
      this.alert.showAlertGood('GANASTE');
     /* Swal.fire({
        icon: 'success',
        title: 'GANASTE',
        showConfirmButton: false,
        timer: 1500
      })*/
      this.imagen= this.imagenes[0];
      this.actualizarPalabrta();
      this.crearGuiones();
      this.contFallas = 0;
      this.letra = '';

      this.jugador.ganadas++
      this.agregarPuntajeDB()
    }
    this.flag = true;
    }//

    actualizarPalabrta(){
      return this.palabra = this.palabras[Math.floor(Math.random()*this.palabras.length)]
    }
    crearGuiones(){
      return  this.guiones = this.palabra.replace(/./g, "_ ");
    }

    replaceAt(index:any, character:string, palabra:string) {
      return palabra.substr(0, index) + character + palabra.substr(index+character.length); 
    }

    obtenerValoresJugadores(){
      this.juegoDB.getAll('ahorcado').then(refDB=>{
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
               this.juegoDB.update('ahorcado', this.jugador.email, this.jugador)
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
                this.juegoDB.create('ahorcado',this.jugador)
                .then(res =>{
                  console.log(res)
                  //aca hago lo que quiero
                  //toast('Se creo usuario Correctamente', 3000)  AGREGAR EL CREAR DATOS EN LA TABLA
                })
                .catch(err =>{
                  console.log('error en alta puntos Ahorcado', err)
                })
          }
    }//



}//
