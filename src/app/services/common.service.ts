import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class CommonService<E> {

  protected url : string;
  protected httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(
    protected http: HttpClient
  ) {
    this.url = environment.UrlBase
   }

   /**Método que agrega el token */
   /*protected agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer '+ token)
    }
    return this.httpHeaders
  }*/
}
