import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { Categoria } from 'src/app/models/categoria';
import { Servicio } from 'src/app/models/servicio';
import { Usuario } from 'src/app/models/usuario';
import { ApiServicesService } from 'src/app/services/api-services.service';
import { DropDownService } from 'src/app/services/drop-down.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ManageServiceService } from 'src/app/services/manage-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {

  public servicio: Servicio;
  public categorias : Categoria[] | any;
  public usuario: Usuario = new Usuario();

  constructor(
    private dropdownService: DropDownService,
    private localStorageService: LocalStorageService,
    private manageService: ManageServiceService,
    public dialog:MatDialog,
    private router: Router,
    private api_service: ApiServicesService
  ) { 
    this.categorias = new Array<Categoria>();
    this.servicio = JSON.parse(this.localStorageService.geDatosStorage('servicioEditar'));
  }

  ngOnInit(): void {
    this.dropdownService.getCategory().subscribe(category => {
      this.categorias = category
    })

    if(localStorage.getItem('usuario') != null || localStorage.getItem('usuario') !=  undefined)
    {
      let usuariolocal = localStorage.getItem('usuario');
        this.usuario =JSON.parse(usuariolocal!);           
    }
  }

  actualizarServicio(): void {
    console.log('servicio enviado... ', this.servicio);
    this.manageService.updateService(this.servicio).subscribe(
      response => {    
        this.dialog.closeAll();    
        Swal.fire('Servicio editado con éxito', 'success').then(data => {
          window.location.reload()
        }); 
      }, error => {
        console.log(error.status);
        if(error.status === 400){
          Swal.fire('Error en la creación del servicio', 'error');
        }
        console.log('Error del sistema  ', error.status );
        if (error.status == 403) {
          this.api_service.logout();
          this.router.navigate(['/home']);
          window.location.reload();
        }
      }
    )
  }

  close() {
    this.dialog.closeAll(); 
  }

}
