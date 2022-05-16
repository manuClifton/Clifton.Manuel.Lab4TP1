import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private firestore:AngularFirestore) { }



  async create(collection:string, dato:any){ //envia peticion a firebase, Si no existe la coleccion la crea
    try {
     return await this.firestore.collection(collection).add(dato) //devuelva una promesas
    } catch (error) {
     console.log('error en: create',error);
     return;
    }
   }


   async getAll(collection:string){
    try {
      return await this.firestore.collection(collection).snapshotChanges(); //devuelve un observable
    } catch (error) {
      console.log('error en: getAll',error);
      return;
    }
  }


  async getUserById(collection:string, id:string){
    try {
      return await this.firestore.collection(collection).doc(id); //devuelve un observable
    } catch (error) {
      console.log('error en: getById',error);
      return;
    }
  }//
}
