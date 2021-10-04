import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public datos: any
  
  geDatosStorage(datos: string): any {
    /**convierte un string del local storage a un obj de js */
    let datosConsulta = localStorage.getItem(datos)

    if (datosConsulta != "undefined") {
        this.datos = datosConsulta
    } else {
        this.datos = null
    }
    return this.datos 
  }
}
