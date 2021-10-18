import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  err: HttpErrorResponse | undefined
  carga : boolean= false;
  titulo: string;
  
  constructor(
    private manageService: ManageServiceService,
    private dialog:MatDialog,
    private router: Router,
    private api_service: ApiServicesService
  ) { 
    this.usuIdentity = new Usuario();
    this.usuId = 0;
    this.servicioInfo = new Servicio();
    this.titulo = 'Mis Servicios';
  }
  

  ngOnInit(): void {
    this.carga = true;
    this.obtenerServicios(); 
  } 

  public obtenerServicios(): any {
    let usuario = this.api_service.getUsuarioSesion
    console.log(usuario.numeroIdentificacion)
    this.manageService.getServicexUser(usuario.numeroIdentificacion).subscribe(
      response =>{
        this.serviciosUsuarios = response
        this.carga = false;
        if (this.serviciosUsuarios.length === undefined) {
          this.serviciosUsuarios.length = 0;
        }
      }, error => {
        this.err = error
        console.log('Error del sistema  ', this.err?.status );
        if (this.err?.status == 403) {
          this.api_service.logout();
          this.router.navigate(['/home']).then(data => {
            window.location.reload();
          })
        }
        this.carga = false;  
      }
    );
  }

  openDialogCreateService() {
    this.dialog.open(CreateServiceComponent)
  }

  openDialogEditService(idServicio: number) {
    this.carga = true
    this.manageService.viewService(idServicio).subscribe(
      response => {
        this.servicioInfo = response
        localStorage.setItem('servicioEditar', JSON.stringify(this.servicioInfo))
        this.dialog.open(EditServiceComponent)
        this.carga = false
      }, error => {
        if (error.status === 406) {
          Swal.fire('error', 'No existen registros para este usuario' , 'error')
        }
        if (error.status == 403) {
          this.api_service.logout();
          this.router.navigate(['/home']).then(data => {
            window.location.reload();
          })
        }   
        this.carga = false     
      }  
    )
  }

  openDialogViewService(idServicio: number) {
    this.carga = true
    this.manageService.viewService(idServicio).subscribe(
      response => {
        this.servicioInfo = response
        localStorage.setItem('servicio', JSON.stringify(this.servicioInfo))
        this.dialog.open(ViewServiceComponent)
        this.carga = false
      }, error => { 
       if(error.status === 400){
          Swal.fire({ 
            icon: 'error',
            title: 'Error al Consultar Servicio',
            text: error
          })
        }
        if (error.status == 403) {
          this.api_service.logout();
          this.router.navigate(['/home']).then(data => {
            window.location.reload();
          })
        }
        this.carga = false
      }
    )
  }

  openDialogDeleteService(idServicio: number) {
    this.carga = true
    this.manageService.deleteService(idServicio).subscribe(
      response => {
        this.obtenerServicios();
        this.carga = false
      }, error => {
       if(error.status === 400){
        Swal.fire({
          icon: 'error',
          title: 'Error al Borrar Servicio',
          text:  error
        })
        }
        if (error.status == 403) {
          this.api_service.logout();
          this.router.navigate(['/home']).then(data => {
            window.location.reload();
          })
        }
        this.carga = false
      }
    )
  }
  
}


