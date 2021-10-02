import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { Servicio } from 'src/app/models/servicio';
import { Usuario } from 'src/app/models/usuario';
import { ManageServiceService } from 'src/app/services/manage-service.service';
import Swal from 'sweetalert2';
import { DropDownService } from 'src/app/services/drop-down.service';
import { DatosService } from 'src/app/services/datos.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-service-create',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent implements OnInit {

  public titulo: string = 'Crea tu servicio';
  public categorias : Categoria[] | any;
  public usuario: Usuario | Usuario;
  public model: Servicio | any;
  public error: any;
  public identity : any;
  public formData = new FormData();

  //Atributos para la imagen
  public fotoSeleccionada?: Blob;
  public base64: string = 'Base64...'
  public imageUrl?: string;
  
  constructor(
    private dropdownService: DropDownService,
    private manageService: ManageServiceService,
    private sant: DomSanitizer,
    public dialog:MatDialog
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
    this.imageUrl = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fotoSeleccionada)) as string   
    let reader = new FileReader();
    reader.readAsDataURL(this.fotoSeleccionada as Blob);
    reader.onloadend = () => {
      this.base64 = reader.result as string;
      const imagen = this.base64.split(',')[1]
      console.log(imagen);
      
      localStorage.setItem('imgb64', imagen);
    }   
  }

  public crearServicio(): void {

    this.model.proveedor = this.usuario;      
    this.model.imagenServicio = this.manageService.getImgB64();
    this.manageService.createService(this.model).subscribe(
      response => { 

        this.dialog.closeAll();    
        Swal.fire('Nuevo servicio'+ response.nombreServicio + ' creado con éxito', 'success').then(data => {
          window.location.reload()
        }); 
        //this.router.navigate([this.redirect]);
        
    }, err => {
      if(err.status === 400){
        this.error = err.error;
        Swal.fire('Error en la creación del servicio', 'error');
        console.log(this.error);
      }
    });

  }

  public editService(): void {
    
  }

}
