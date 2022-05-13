import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
//// REVISAR EL FIRESTORE COMO SE USA AHORA
@Injectable({
  providedIn: 'root'
})
export class JuegosService {

  constructor(private firestore:AngularFirestore) { }
  
  async create(collection:string, juegador:any){ //envia peticion a firebase, Si no existe la coleccion la crea
    try {
     return await this.firestore.collection(collection).add(juegador) //devuelva una promesas
    } catch (error) {
     console.log('error en: create',error);
     return;
    }
   }//

   async update(collection:string, email:string, dato:any){
    try {
      return await this.firestore.collection(collection).doc(email).set(dato); //devuelve un observable
    } catch (error) {
      console.log('error en: delete',error);
    }
  }//

  async getAll(collection:string){
    try {
      return await this.firestore.collection(collection).snapshotChanges(); //devuelve un observable
    } catch (error) {
      console.log('error en: getAll',error);
      return;
    }
  }//


}//
