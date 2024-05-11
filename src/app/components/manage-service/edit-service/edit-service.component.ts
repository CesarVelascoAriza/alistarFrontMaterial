import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
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

  servicio: Servicio;
  categorias : Categoria[] | any;
  usuario: Usuario = new Usuario();

  //Atributos para la imagen
  fotoSeleccionada?: Blob;
  base64: string = 'Base64...'
  imageUrl?: string;
  tipo: string = '';

  constructor(
    private dropdownService: DropDownService,
    private localStorageService: LocalStorageService,
    private manageService: ManageServiceService,
    public dialog:MatDialog,
    private router: Router,
    private api_service: ApiServicesService,
    private sant: DomSanitizer
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
    this.servicio.imagenServicio = this.localStorageService.geDatosStorage('imgServiciob64')
    console.log('servicio enviado... ', this.servicio);
    this.manageService.updateService(this.servicio).subscribe(
      response => {    
        this.dialog.closeAll();    
        Swal.fire('Servicio editado con éxito', 'success').then(data => {
          window.location.reload()
        }); 
      }, error => {
        if(error.status === 400){
          Swal.fire('Error en la creación del servicio', 'error');
        }
        if (error.status == 403) {
          this.api_service.logout();
          this.router.navigate(['/home']).then(data => {
            window.location.reload();
          })
        }
      }
    )
  }

  close() {
    this.dialog.closeAll(); 
  }

  public uploadImage(event: any): void { 
    this.fotoSeleccionada = event.target.files[0];
    let tipo = (this.fotoSeleccionada?.type)?.split('/')[1];
    localStorage.setItem('tipoImagen', JSON.stringify(tipo))
    if (tipo === 'png') {
      this.imageUrl = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fotoSeleccionada)) as string   
      let reader = new FileReader();
      reader.readAsDataURL(this.fotoSeleccionada as Blob);
      reader.onloadend = () => {
        this.base64 = reader.result as string;
        const imagen = this.base64.split(',')[1]
        console.log(imagen);
        
        localStorage.setItem('imgServiciob64', imagen);
      } 
    } else {
      Swal.fire('Solo se permiten archivos .png', 'error')
    }
  }

}
