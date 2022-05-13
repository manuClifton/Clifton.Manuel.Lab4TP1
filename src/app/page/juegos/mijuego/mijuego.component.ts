import { AlertService } from './../../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { JuegosService } from 'src/app/services/juegos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mijuego',
  templateUrl: './mijuego.component.html',
  styleUrls: ['./mijuego.component.css']
})
export class MijuegoComponent implements OnInit {

  style = {
    width: '100%',
    height: '500px',
    border: '10px dashed #aa4',
    background: '#ffb'
  }

  stylePLayer = {
    position: 'absolute',
    background: '#900',
    border: '4px dashed #b22',
    borderRadius: '25px',
    width: '50px',
    height: '50px',
    transition: 'All 0.3s',
    marginTop: '',
    marginLeft: '',
  }

  puntos = 0;
  tiempo = 30;
  necesario = 30;
  user:any;

  jugador = {
    email: '',
    ganadas: 0,
    perdidas: 0
  }
  jugadores:any | [];


  constructor(
    public afAuth: AngularFireAuth,
    private router:Router,
    private juegoDB:JuegosService,
    private alert: AlertService
    ) { }

  async ngOnInit() {
    this.user = await this.afAuth.onAuthStateChanged(user =>{
      if(!user){
        this.alert.showAlertWarninw('Ingresa tu Usuario');
        this.router.navigate(['/login'])
        }else{
          this.user = user;
          this.jugador.email = this.user.email;
        }
    })
   this.iniciar();
   this.obtenerValoresJugadores()
  }

  obtenerValoresJugadores(){
    this.juegoDB.getAll('jPropio').then(refDB=>{
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
             this.juegoDB.update('jPropio', this.jugador.email, this.jugador)
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
              this.juegoDB.create('jPropio',this.jugador)
              .then(res =>{
                console.log(res)
                //aca hago lo que quiero
                //toast('Se creo usuario Correctamente', 3000)  AGREGAR EL CREAR DATOS EN LA TABLA
              })
              .catch(err =>{
                console.log('error en alta', err)
              })
        }
  }//

  iniciar(){
    setInterval(() => {
      this.restarTiempo()
    }, 1000);
  }

  sumarPuntos(){
    this.puntos++;
    this.stylePLayer.marginTop = Math.round(Math.random()*420)+"px";
    this.stylePLayer.marginLeft = Math.round(Math.random()*1000)+"px";
    if(this.puntos == this.necesario){
      Swal.fire({
        position: 'top',
        title: 'GANASTE',
        text: "Queres intentar otra vez?",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Volver a jugar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.reiniciar()
        }else{
          this.router.navigate(['/home'])
          window.location.reload();
        }
      })
      this.jugador.ganadas++
      this.agregarPuntajeDB()
      this.reiniciar();
    }
  }
  restarTiempo(){
    this.tiempo--;
    if(this.tiempo == 0){

      Swal.fire({
        position: 'top',
        title: 'PERDISTE',
        text: "Queres intentar otra vez?",
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Volver a jugar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.reiniciar()
        }else{
          this.router.navigate(['/home']);
          window.location.reload();
        }
      })
      this.jugador.perdidas++
      this.agregarPuntajeDB()
      this.reiniciar()
    }
  }

  reiniciar(){
    this.tiempo = 30;
    this.puntos = 0;
  }



}//
