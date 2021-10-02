import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TipoDocumento } from '../models/tipoDocumento';
import { Categoria } from '../models/categoria';
import { ApiServicesService } from './api-services.service';

@Injectable({
  providedIn: 'root'
})
export class DropDownService {

  public url: string

  constructor(
    private http: HttpClient,
    private api_service: ApiServicesService
  ) { 
    this.url = environment.UrlBase
  }
  
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  

  getTipoDoc()
  {
    return this.http.get<TipoDocumento[]>(environment.UrlBase + 'typeDocuments');
  }

  getCategory()
  {   
    const httpOptions={
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'Authorization':'Bearer '+ this.api_service.getTokenSesion
      })
    }
    const httpHeaders2 = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+ 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkiLCJmZWNoYU5hY2ltaWVudG8iOjk2MTU2MzYwMDAwMCwiZGlyZWNjaW9uIjoiQ2FsbGUgMTIzIiwiaW1hZ2VuUGVyZmlsIjpudWxsLCJ0ZWxlZm9ubyI6IjEyMzQ1NjciLCJleHAiOjE2MzI2MTk4NTksIm5vbWJyZVV1c2FyaW8iOiJMZWlkeSIsImlhdCI6MTYzMjYxODA1OSwiZW1haWwiOiJjb3JyZW9AZ21haWwuY29tIn0.GwEDn_0zId7_TCQC9CKy5nUj2ca4iJz1L_Rw3GmDYok'});
    let token = this.api_service.getTokenSesion; 
    console.log('this.httpHeaders + token ... ', httpHeaders2);
    return this.http.get<Categoria[]>(environment.UrlBase + 'Categoria', httpOptions);
  }

  /**Método que agrega el token */
  protected agregarAuthorizationHeader() {
    let token = this.api_service.getTokenSesion;
    console.log('if ', token != null);
    
    if (token != null) {
      console.log('entra');
      
      return this.httpHeaders.append('Authorization', 'Bearer '+ token)
    }
    
    return this.httpHeaders
  }
}
