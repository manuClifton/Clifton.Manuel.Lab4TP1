import { AlertService } from './../../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { JuegosService } from 'src/app/services/juegos.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  base_preguntasJason:any[] = [{
    "categoria": "Arte y literatura",
    "pregunta": "¿Quién pintó la mona lisa?",
    "respuesta": "Leonardo da Vinci",
    "incorrecta1": "Picasso",
    "incorrecta2": "Miguel Ángel",
    "incorrecta3": "Monet",
    "imagen": "https://i.ibb.co/9cjvmw1/mona-lisa.jpg",
    "objectFit": "cover"
},
{
    "categoria": "Arte y literatura",
    "pregunta": "Pintor de  \"El jardín de las delicias\"",
    "respuesta": "El Bosco",
    "incorrecta1": "Velásquez",
    "incorrecta2": "Picasso",
    "incorrecta3": "Dalí\r",
    "imagen": "https://i.ibb.co/SDjX7PM/jardin-de-las-delicias.jpg",
    "objectFit": "cover"
},
{
    "categoria": "Arte y literatura",
    "pregunta": "significado de  \"El jardín de las delicias\"",
    "respuesta": "Mundo Terrenal",
    "incorrecta1": "Es Mejor Morir",
    "incorrecta2": "Dios Es El Camino",
    "incorrecta3": "Adán Y Eva\r",
    "imagen": "https://i.ibb.co/SDjX7PM/jardin-de-las-delicias.jpg",
    "objectFit": "cover"
},
{
    "categoria": "Arte y literatura",
    "pregunta": "Ciudad fetiche del escritor Paul Auster",
    "respuesta": "Nueva York",
    "incorrecta1": "París",
    "incorrecta2": "Ámsterdam",
    "incorrecta3": "Bogotá\r",
    "imagen": "https://i.ibb.co/zfM2Vyd/paul-auster.jpg",
    "objectFit": "cover"
},
{
  "categoria": "Arte y literatura",
  "pregunta": "Escritor de \"El viejo y el mar\"",
  "respuesta": "Ernest Hemingway",
  "incorrecta1": "Julio Verne",
  "incorrecta2": "Gabriel García Márquez",
  "incorrecta3": "Ernesto Sábato\r",
  "imagen": "https://i.ibb.co/WHd1NnL/el-viejo-y-el-mar.jpg",
  "objectFit": "cover"
},
{
  "categoria": "Arte y literatura",
  "pregunta": "Vivía en el 221B de Backer Street.",
  "respuesta": "Sherlock Holmes",
  "incorrecta1": "Katniss Everdeen",
  "incorrecta2": "Hermione Jean Granger",
  "incorrecta3": "Harry James Potter \r",
  "imagen": "https://i.ibb.co/SPqsRyx/221b.jpg",
  "objectFit": "cover"
},
{
  "categoria": "Arte y literatura",
  "pregunta": "Género al que pertenece la novela \"La historia del ojo\" de George Bataille",
  "respuesta": "Erótico",
  "incorrecta1": "Drama",
  "incorrecta2": "Terror",
  "incorrecta3": "Suspenso\r",
  "imagen": "https://i.ibb.co/dgfv8zK/el-ojo.gif",
  "objectFit": "cover"
},
{
  "categoria": "Arte y literatura",
  "pregunta": "Es una figura clave del dadaísmo y el surrealismo.",
  "respuesta": "Max Ernst",
  "incorrecta1": "Pablo Picasso",
  "incorrecta2": "Vincent Van Gogh",
  "incorrecta3": "Claude Monet\r",
  "imagen": "https://i.ibb.co/dLw3jng/Dada-min-e1533749290497.jpg",
  "objectFit": "cover"
}
];
pregunta = "";
categoria = "";
respuesta = "";
incorrecta1 = "";
incorrecta2 = "";
incorrecta3 = "";
imagen = "";
objectFit = "";

opcion1= "";
opcion2= "";
opcion3= "";
opcion4= "";

style = {
background: ""
}
npreguntas = []

posibles_respuestas:any[] = [];

suspender_botones = false;

preguntas_hechas = 0
preguntas_correctas = 0
preguntas_incorrectas = 0;

jugador = {
email: '',
ganadas: 0,
perdidas: 0
}
jugadores:any | [];
user:any;

constructor(
  private juegoDB:JuegosService,
  public afAuth: AngularFireAuth,
  private router:Router,
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
    this.escogerPreguntaAleatoria()
    this.obtenerValoresJugadores()
  }

  obtenerValoresJugadores(){
    this.juegoDB.getAll('preguntados').then(refDB=>{
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

  elegirPregunta(n:number){
    const {categoria, pregunta, respuesta, incorrecta1, incorrecta2, incorrecta3, imagen, objectFit} = this.base_preguntasJason[n];
 
     this.categoria = categoria;
     this.pregunta = pregunta;
     this.respuesta = respuesta;
     this.incorrecta1 = incorrecta1;
     this.incorrecta2 = incorrecta2;
     this.incorrecta3 = incorrecta3;
     this.imagen = imagen;
     this.objectFit = objectFit;
   }//

   escogerPreguntaAleatoria() {
    const n = Math.floor(Math.random() * this.base_preguntasJason.length)
    this.elegirPregunta(n)
    this.desordenarRespuestas()
  }

  
  select_id(id:string) {
    return document.getElementById(id)
  }

  desordenarRespuestas() {
    this.posibles_respuestas = [
      this.respuesta,
      this.incorrecta1,
      this.incorrecta2,
      this.incorrecta3
    ]
    this.posibles_respuestas.sort(() => Math.random() - 0.5)
  
    this.opcion1 = this.posibles_respuestas[0]
    this.opcion2 = this.posibles_respuestas[1]
    this.opcion3 = this.posibles_respuestas[2]
    this.opcion4 = this.posibles_respuestas[3]
  }//


  oprimirBtn(res:number){
    if(this.posibles_respuestas[res] == this.respuesta){
      this.alert.showAlertGood('CORRECTO');
      this.jugador.ganadas++
      this.escogerPreguntaAleatoria()
      this.agregarPuntajeDB()
    }else{
      this.alert.showAlertWarninw('INCORRECTO');
      this.jugador.perdidas++
      this.escogerPreguntaAleatoria()
      this.agregarPuntajeDB()
    }
  }//

  agregarPuntajeDB(){
    let existe = true;
        for (let i = 0; i < this.jugadores.length; i++) {
          if(this.jugadores[i].email == this.jugador.email){
             //YA EXISTE EL JUGADOR AGREGAR DATOS NUEVOS MODIFICAR
             this.juegoDB.update('preguntados', this.jugador.email, this.jugador)
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
              this.juegoDB.create('preguntados',this.jugador)
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

  


















}//



