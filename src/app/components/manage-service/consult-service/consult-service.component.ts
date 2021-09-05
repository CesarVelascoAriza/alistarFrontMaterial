import { Component, OnInit, ViewChild } from '@angular/core';
import { Servicio } from 'src/app/models/servicio';
import { Usuario } from 'src/app/models/usuario';
import { DatosService } from 'src/app/services/datos.service';
import { ManageServiceService } from 'src/app/services/manage-service.service';

@Component({
  selector: 'app-service-consult',
  templateUrl: './consult-service.component.html',
  styleUrls: ['./consult-service.component.css']
})
export class ConsultServiceComponent implements OnInit {

  usuId : number | any;
  servicios : Servicio[]=[];
  usuIdentity : Usuario | any;
  serviciosUsuarios : Servicio[]=[];
  
  public titulo: string;
  
  constructor(
    private manageService: ManageServiceService,
    private _dataServices: DatosService
  ) { 
    this.usuIdentity = new Usuario();
    this.usuId = 0;
    
    this.titulo = 'Mis Servicios';
  }

  ngOnInit(): void {
    this.obtenerServicios(); 
  }

  public obtenerServicios(): any {
    this.usuIdentity = JSON.parse(this._dataServices.getId())
    console.log('this.usuIdentity  ' , this.usuIdentity);
    this.usuId = this.usuIdentity.numeroIdentificacion
    console.log('this.usuId  ' , this.usuId);
    this.manageService.getServicexUser(this.usuId).subscribe(
      response =>{
        this.serviciosUsuarios = response
        console.log(this.serviciosUsuarios.length);
        console.log('this.serviciosUsuarios ',  this.serviciosUsuarios);
        
        if (this.serviciosUsuarios.length === undefined) {
          this.serviciosUsuarios.length = 0;
        }
    });
    
    /*for(let i in servicios) {
      console.log('servicios[i].direccion  ', servicios[i].direccion)
      console.log('typeof servicios[i].direccion  ', typeof servicios[i].direccion);
      console.log('this.consultarServicios()  ' , this.consultarServicios());
      
      
      /*this.serviciosUsuarios.push({
        direccion:servicios[i].direccion,

      })
    }*/
  }
  
}


