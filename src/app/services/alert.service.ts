
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }
  async showAlertGood(message:string){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
}
async showAlertBad(message:string){
  Swal.fire({
    position: 'top-end',
    icon: 'error',
    title: message,
    showConfirmButton: false,
    timer: 1500
  })
}
async showAlertInfo(message:string){
  Swal.fire({
    position: 'top-end',
    icon: 'info',
    title: message,
    showConfirmButton: false,
    timer: 1500
  })
}

async showAlertWarninw(message:string){
  Swal.fire({
    position: 'top-end',
    icon: 'warning',
    title: message,
    showConfirmButton: false,
    timer: 1500
  })
}


}//
