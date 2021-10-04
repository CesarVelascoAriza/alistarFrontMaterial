import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Servicio } from 'src/app/models/servicio';
import { Usuario } from 'src/app/models/usuario';
import { ApiServicesService } from 'src/app/services/api-services.service';
import { ManageServiceService } from 'src/app/services/manage-service.service';
import Swal from 'sweetalert2';
import { CreateServiceComponent } from '../create-service/create-service.component';
import { EditServiceComponent } from '../edit-service/edit-service.component';
import { ViewServiceComponent } from '../view-service/view-service.component';

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
  servicioInfo : Servicio;
  formview: boolean = false;
  cant: string = ""
  prueba: string = "Esto es una prueba"
  
  public titulo: string;
  
  constructor(
    private manageService: ManageServiceService,
    private dialog:MatDialog,
    private api_service: ApiServicesService,
  ) { 
    this.usuIdentity = new Usuario();
    this.usuId = 0;
    this.servicioInfo = new Servicio();
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
        this.serviciosUsuarios = response
        console.log('this.serviciosUsuarios .. ', Object.values(this.serviciosUsuarios))
        if (this.serviciosUsuarios.length === undefined) {
          this.serviciosUsuarios.length = 0;
        }
    });
  }

  openDialogCreateService() {
    this.dialog.open(CreateServiceComponent)
  }

  openDialogEditService() {
    this.dialog.open(EditServiceComponent)
  }

  openDialogViewService(idServicio: number) {
    this.manageService.viewService(idServicio).subscribe(
      response => {
        this.servicioInfo = response
        console.log('this.servicioInfo ... ', this.servicioInfo);
        localStorage.setItem('servicio', JSON.stringify(this.servicioInfo))
        this.dialog.open(ViewServiceComponent)
      }, error => { 
        Swal.fire({ 
          icon: 'error',
          title: 'Error al Consultar Servicio',
          text: error
       })
      }
    )

  }

  openDialogDeleteService(idServicio: number) {
    this.manageService.deleteService(idServicio).subscribe(
      response => {
        console.log('response  ', response);
        console.log('idServicio  ', idServicio);
        this.obtenerServicios();
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Error al Borrar Servicio',
          text:  error
       })
      }
    )
  }
  
}


