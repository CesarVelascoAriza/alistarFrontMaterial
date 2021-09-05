import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  /**Método para obtener el número cuenta seleccionada por el usuario en el combo*/
  public getId(): any {
    return this.localStorageService.geDatosStorage('identity')
  }
}
