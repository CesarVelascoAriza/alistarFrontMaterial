import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../models/usuario';
import { ApiServicesService } from './api-services.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url: string
  public helper = new JwtHelperService();
  constructor( private http: HttpClient, private token:ApiServicesService ) {
    this.url = environment.UrlBase
  }

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':'application/json'
    })
  }

  register(usuario: Usuario) {
    const path = `${this.url}Usuarios/save-usuario`
    return this.http.post<Usuario>(path, usuario, this.httpOptions)
  }
  getUsuarioById(){
    let usuaro  = this.token.getUsuarioSesion
    const httpOptionsLocal = {
      headers: new HttpHeaders({
          'Content-Type':'application/json',
          'Authorization':'Bearer '+ this.token.getTokenSesion
      })
    }
    return this.http.get<Usuario>(environment.UrlBase+'Usuarios/getUserBy?id='+usuaro.numeroIdentificacion, httpOptionsLocal)
  }






}
