import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  httpOptions={
    headers:new HttpHeaders({
      'Content-type':'application/json'
    })
  }
  constructor(private http:HttpClient) { }


  getUserNamePasswor(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(environment.UrlBase+'Usuarios/getUsuario-password',usuario,this.httpOptions);
  }


}
