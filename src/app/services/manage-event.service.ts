import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estado } from '../models/estado';
import { Evento } from '../models/evento';
import { Orden } from '../models/orden';
import { Servicio } from '../models/servicio';
import { ApiServicesService } from './api-services.service';

@Injectable({
  providedIn: 'root'
})
export class ManageEventService  {

  servicioSeleccionado = new EventEmitter<Servicio>();
  ordenEvento: Servicio[]= [];
  detalleOrden: Orden[] =[];

  constructor(
    private http: HttpClient,
    private api_service: ApiServicesService
  ) { }


  getAllEstados(): Observable<Estado[]> {
    let httpHeaders = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+ this.api_service.getTokenSesion});
    return this.http.get<Estado[]>(environment.UrlBase+'estado',{headers: httpHeaders});
  }

  saveEvent(evento:Evento): Observable<Evento> {
    let httpHeaders = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+ this.api_service.getTokenSesion});
    return  this.http.post<Evento>(environment.UrlBase+'Evento/save-evento',evento,{headers: httpHeaders});
  }

  getAllEventsByUsuaio(idUsuario: number): Observable<Evento[]> {
    let httpHeaders = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+ this.api_service.getTokenSesion});
    return this.http.get<Evento[]>(environment.UrlBase + 'Evento/Get-evento-Usuario?usuarioId=' + idUsuario,{headers: httpHeaders});
  }

  updateEvent(evento: Evento): Observable<Evento> {
    console.log('evento a editar... ', evento);
    
    let httpHeaders = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+ this.api_service.getTokenSesion});
    return this.http.put<Evento>(environment.UrlBase+'Evento/update-evento', evento, {headers: httpHeaders})
  }

  deleteEvent(idEvento: number): Observable<Evento> {
    let httpHeaders = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+ this.api_service.getTokenSesion});
    return this.http.delete<Evento>(environment.UrlBase+'Evento/deleteEvento?id='+ idEvento, {headers: httpHeaders})
  }

  viewEvent(idEvento: number): Observable<Evento> {
    let httpHeaders = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+ this.api_service.getTokenSesion});
    return this.http.get<Evento>(environment.UrlBase + 'Evento/getEventoById?id='+ idEvento, {headers: httpHeaders})
  }

}
