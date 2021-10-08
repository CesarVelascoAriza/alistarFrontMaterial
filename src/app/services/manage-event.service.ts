import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estado } from '../models/estado';
import { Orden } from '../models/orden';
import { Servicio } from '../models/servicio';
import { ApiServicesService } from './api-services.service';

@Injectable({
  providedIn: 'root'
})
export class ManageEventService  {

  servicioSeleccionado = new EventEmitter<Servicio>();

  constructor(
    private http: HttpClient,
    private api_service: ApiServicesService
  ) { }


  getAllEstados():Observable<Estado[]>{
    let httpHeaders = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+ this.api_service.getTokenSesion});
    return this.http.get<Estado[]>(environment.UrlBase+'estado',{headers: httpHeaders});
  }

  guardarOrden(orden:Orden):Observable<Orden>{
    let httpHeaders = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+ this.api_service.getTokenSesion});
    return  this.http.post<Orden>(environment.UrlBase+'Orden/save-Orden',orden,{headers: httpHeaders});
  }

  getAllOrdenByUsuaio(idUsuario: number):Observable<Orden[]>{
    let httpHeaders = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+ this.api_service.getTokenSesion});
    return this.http.get<Orden[]>(environment.UrlBase + 'Orden/getIdUsuario?id=' + idUsuario,{headers: httpHeaders});
  }

  getOrdernById(idOrden: number):Observable<Orden>
  {
    let httpHeaders = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+ this.api_service.getTokenSesion});
    return this.http.get<Orden>(environment.UrlBase + 'Orden/getIdOrden?id=' + idOrden,{headers: httpHeaders});
  }

}
