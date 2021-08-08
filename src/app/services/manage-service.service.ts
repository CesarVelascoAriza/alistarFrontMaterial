import { HttpClient, HttpRequest, HttpEvent,HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { Servicio } from '../models/servicio';

@Injectable({
  providedIn: 'root'
})
export class ManageServiceService {

  public url : string;

  constructor(
    private _http: HttpClient
  ) { 
    this.url = environment.UrlBase;
    /*this.url = 'http://localhost'*/
  }

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':'application/json'
    })
  }
  upload(file:File): Observable<HttpEvent<any>>
  {
    const formData: FormData = new FormData();
    formData.append('files', file);
   
    const req = new HttpRequest('POST', `${this.url}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this._http.request(req);
  }

  //Metodo para Obtener los archivos
  getFiles(){
    return this._http.get(`${this.url}/files`);
  }

  //Metodo para borrar los archivos
  deleteFile(filename: string){
    return this._http.get(`${this.url}/delete/${filename}`);
  }

  onUpload(file:any):Observable<any>{
    const fd= new FormData;
    fd.append('image',file,file.name);
    return   this._http.post(this.url+'add-image-post',fd); 
  }

  createService(servicio: Servicio){
    let json = JSON.stringify(servicio)
    let params = json
    const path = `${this.url}/Servicio/save-Servicio`
    return this._http.post<Servicio>(path, params, this.httpOptions)
  }

}
