import { Component, OnInit, ViewChild } from '@angular/core';
import { Servicio } from 'src/app/models/servicio';
import { Usuario } from 'src/app/models/usuario';
import { ApiServicesService } from 'src/app/services/api-services.service';
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
    private _dataServices: DatosService,
    private api_service: ApiServicesService,
  ) { 
    this.usuIdentity = new Usuario();
    this.usuId = 0;
    
    this.titulo = 'Mis Servicios';
  }

  ngOnInit(): void {
    this.obtenerServicios(); 
  }

  public obtenerServicios(): any {
    let usuario = this.api_service.getUsuarioSesion
    console.log(usuario);
    
    this.manageService.getServicexUser(usuario.numeroIdentificacion).subscribe(
      response =>{
        console.log('response .. ', response);
        
        /*this.serviciosUsuarios = response
        console.log('this.serviciosUsuarios ', this.serviciosUsuarios);
        console.log('this.serviciosUsuarios ',  this.serviciosUsuarios);
        
        if (this.serviciosUsuarios.length === undefined) {
          this.serviciosUsuarios.length = 0;
        }*/
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


