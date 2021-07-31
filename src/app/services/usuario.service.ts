import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url: string

  constructor(
    private _http: HttpClient
  ) {
    this.url = environment.UrlBase
   }
}
