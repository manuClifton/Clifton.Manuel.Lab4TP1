import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore:AngularFirestore) { }

  async create(collection:string, msj:any){ //envia peticion a firebase, Si no existe la coleccion la crea
    try {
     return await this.firestore.collection(collection).add(msj) //devuelva una promesas
    } catch (error) {
     console.log('error en: create',error);
     return;
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


}
