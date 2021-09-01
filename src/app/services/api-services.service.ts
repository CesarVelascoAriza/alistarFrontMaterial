import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  public identity: any
  public url: string

  httpOptions={
    headers:new HttpHeaders({
      'Content-type':'application/json'
    })
  }
  constructor(
    private http:HttpClient,
    private localStorageService: LocalStorageService
    ) { 
      this.url = environment.UrlBase
    }


  getUserNamePassword(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.url+'Usuarios/getUsuario-password',usuario,this.httpOptions);
  }

  /**Métodos para traer el usuario del local strage */
  getIdentity(): Observable<any> {
    return this.localStorageService.geDatosStorage('identity')
  }
}
