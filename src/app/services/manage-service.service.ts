import { HttpClient, HttpRequest, HttpEvent,HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { Servicio } from '../models/servicio';
import { LocalStorageService } from './local-storage.service';
import { ApiServicesService } from './api-services.service';

@Injectable({
  providedIn: 'root' 
})
export class ManageServiceService {

  public url : string;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService ,
    private api_service: ApiServicesService,  
  ) { 
    this.url = environment.UrlBase;
  }

  upload(file:File): Observable<HttpEvent<any>>
  {
    const formData: FormData = new FormData();
    formData.append('files', file);
   
    const req = new HttpRequest('POST', `${this.url}upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  //Metodo para Obtener los archivos
  getFiles(){
    return this.http.get(`${this.url}files`);
  }

  //Metodo para borrar los archivos
  deleteFile(filename: string){
    return this.http.get(`${this.url}delete/${filename}`);
  }

  onUpload(file:any):Observable<any>{
    const fd= new FormData;
    fd.append('image',file,file.name);
    return  this.http.post(this.url+'add-image-post',fd); 
  }

  createService(servicio: Servicio): Observable<Servicio>{

    let json = JSON.stringify(servicio);
    let params = json
    let httpHeaders = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+ this.api_service.getTokenSesion});
    return this.http.post<Servicio>(environment.UrlBase + 'Servicio/save-Servicio', params, {headers: httpHeaders}) 
  }

  getServicexUser(idUsuario: number):Observable<Servicio[]>
  {
    let httpHeaders = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+ this.api_service.getTokenSesion});
    return this.http.get<Servicio[]>(environment.UrlBase + 'Servicio/get-usuario-service?usuarioId='+idUsuario,{headers: httpHeaders});
  }

  /**Método para obtener la imagen en B64 */
  getImgB64(): any {
    return this.localStorageService.geDatosStorage('imgb64');
  }

  viewService(idServicio: number): Observable<Servicio>
  {
    let params = JSON.stringify(idServicio);
    let httpHeaders = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+ this.api_service.getTokenSesion});
    return this.http.get<Servicio>(environment.UrlBase + 'Servicio?id=' + idServicio, {headers: httpHeaders})
  }

  deleteService(idServicio: number): Observable<Servicio>
  {
    let httpHeaders = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+ this.api_service.getTokenSesion});
    return this.http.delete<Servicio>(environment.UrlBase + 'Servicio/delete-Servicio?id=' + idServicio, {headers: httpHeaders})
  }

  updateService(idServicio: number): Observable<Servicio>
  {
    let httpHeaders = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+ this.api_service.getTokenSesion});
    return this.http.put<Servicio>(environment.UrlBase + 'Servicio/modify?id=' + idServicio, {headers: httpHeaders})
  }

  listarServicios(): Observable<Servicio[]>
  {
    return this.http.get<Servicio[]>(environment.UrlBase + 'Servicio')
  }

}
