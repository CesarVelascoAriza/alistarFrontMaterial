import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estado } from '../models/estado';
import { Evento } from '../models/evento';
import { Orden } from '../models/orden';

@Injectable({
  providedIn: 'root'
})
export class ManageEventService  {

  public url : string;

  constructor(
    private http: HttpClient
  ) {
    this.url = environment.UrlBase;
  }

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':'application/json'
    })
  }

  getAllEstados():Observable<Estado[]>{
    return this.http.get<Estado[]>(this.url+'/estado',this.httpOptions);
  }

  guardarOrden(orden:Orden):Observable<Orden>{
    return  this.http.post<Orden>(this.url+'/Orden/save-Orden',orden,this.httpOptions);
  }

  getEventsUser(idUsuario: number):Observable<Evento[]>
  {
    const path = `${this.url}/Evento/Get-evento-Usuario?usuarioId=${idUsuario}`
    return this.http.get<Evento[]>(path,this.httpOptions);
  }
}
