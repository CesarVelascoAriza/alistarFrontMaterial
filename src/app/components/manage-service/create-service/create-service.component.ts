import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { Servicio } from 'src/app/models/servicio';
import { Usuario } from 'src/app/models/usuario';
import { ManageServiceService } from 'src/app/services/manage-service.service';
import Swal from 'sweetalert2';
import { DropDownService } from 'src/app/services/drop-down.service';;
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ApiServicesService } from 'src/app/services/api-services.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-service-create',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent implements OnInit {

  titulo: string = 'Crea tu servicio';
  categorias : Categoria[] | any;
  usuario: Usuario | Usuario;
  model: Servicio | any;
  error: any;
  identity : any;
  formData = new FormData();

  //Atributos para la imagen
  fotoSeleccionada?: Blob;
  base64: string = 'Base64...'
  imageUrl?: string;
  tipo: string = '';
  
  constructor(
    private dropdownService: DropDownService,
    private manageService: ManageServiceService,
    private sant: DomSanitizer,
    public dialog:MatDialog,
    private router: Router,
    private api_service: ApiServicesService,
    private localStorageService: LocalStorageService
  ) {
    `$('.modal').modal()`;
    `$('select').formSelect()`;
    this.categorias = new Array<Categoria>();
    this.model = new Servicio();
    this.usuario = new Usuario();
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
        localStorage.setItem('imgb64', imagen);
      } 
    } else {
      Swal.fire('Solo se permiten archivos .png', 'error')
    }
  }

  public crearServicio(): void {

    this.model.proveedor = this.usuario;      
    this.model.imagenServicio = this.manageService.getImgB64();
    let tipoImagen = JSON.parse(this.localStorageService.geDatosStorage('tipoImagen'))
    if (tipoImagen === 'png') {
      this.manageService.createService(this.model).subscribe(
        response => { 
          Swal.fire('Servicio creado con éxito', 'success').then(data => {
            window.location.reload();
          }); 
          
      }, err => {
        if(err.status === 400){
          Swal.fire('Error en la creación del servicio', 'error');
        }
        console.log('Error del sistema  ', err.status );
        if (err.status == 403) {
          this.api_service.logout();
          this.router.navigate(['/home']);
          window.location.reload();
        }
      });
    } else {
      Swal.fire('Solo se permiten archivos .png', 'error')
    }

  }

}
