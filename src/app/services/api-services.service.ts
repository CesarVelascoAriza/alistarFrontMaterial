import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
import { UsuarioResponse } from '../models/usuaruiResponse';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  public identity: any
  public url: string
  public _usuario: Usuario
  public _token: string
  public helper = new JwtHelperService();

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  
  constructor(
    private router: Router,
    protected http: HttpClient,
    private localStorageService: LocalStorageService
  ) { 
    this.url = environment.UrlBase
    this._usuario = new Usuario();
    this._token = "";
  }

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':'application/json'
    })
  }

  public getUserNamePassword(usuario:UsuarioResponse):Observable<any>{
    return this.http.post<Usuario>(this.url+'Usuarios/autenticacion',usuario);
  }

  /**Método para guardar el usuario */
  public usuarioSession(accesToken: string): void {
    let payload = this.decodeDatosToken(accesToken)
    this._usuario = new Usuario();
    this._usuario.nombre = payload.name
    this._usuario.email = payload.email
    this._usuario.direccion = payload.direccion
    this._usuario.imagenHashCode = payload.imagenPerfil
    this._usuario.fechaNacimiento = payload.fechaNacimiento
    this._usuario.telefono = payload.telefono
    this._usuario.numeroIdentificacion = payload.sub
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario))
    localStorage.setItem('usuario', JSON.stringify(this._usuario))
  }

  /**Método para guardar el token */
  public tokenSession(accessToken: string): void {
    this._token = accessToken;
    console.log('token en sesion ', this._token);
    
    sessionStorage.setItem('token',this._token);
    localStorage.setItem('token',this._token);
    
  } 

  /**Método para obtener las partes del token */
  public decodeDatosToken(accessToken: string): any {
    if (accessToken !== null) { 
      return this.helper.decodeToken(accessToken)
    }
    return null;
  }

  /**Métodos para traer el usuario del local strage */
  public getIdentity(): Observable<any> {
    return this.localStorageService.geDatosStorage('identity')
  }

  /**Métodos para traer el usuario del local strage */
  public get getUsuarioSesion(): Usuario {  
    return JSON.parse(this.localStorageService.geDatosStorage('usuario'))
  }

  /**Métodos para traer el token del local strage */
  public get getTokenSesion(): string {    
    return this.localStorageService.geDatosStorage('token')
  }



  public isAuthenticated(): boolean {
    let payload = this.getUsuarioSesion;
    if (payload != null) {
      return true;
    }
    return false;
  }

  logout():void{
    this._token='';
    this._usuario=new Usuario();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.clear();
    sessionStorage.clear();
  }

   /**Método que agrega el token */
   public agregarAuthorizationHeader() {
    let token = this.getTokenSesion

    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer '+ token)
    }
    return this.httpHeaders
  }

  /*invalidateLogin(err: HttpErrorResponse ) {
    
    console.log('Error del sistema  ', err?.status );
    if (err?.status == 403) {
      this.logout();
      this.router.navigate(['/home']);
    }
    Swal.fire('error', err?.error , 'error')
  }*/

}
