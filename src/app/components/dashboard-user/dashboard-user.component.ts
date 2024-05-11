import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { TipoDocumento } from 'src/app/models/tipoDocumento';
import { DropDownService } from 'src/app/services/drop-down.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit, OnDestroy {


  hide = true;
  usuario: Usuario = new Usuario()
  usuarioModificado: Usuario = new Usuario()
  tDocs : TipoDocumento[] = [];
  day = new Date()
  min = new Date(new Date().getFullYear() - 80, 0, 1);
  max = new Date(new Date().getFullYear() - 18, new Date().getMonth(), this.day.getDate());
  carga : boolean= false;
  imagenUsuario: string = "";

  //Atributos para la imagen
  fotousuario?: Blob;
  base64: string = 'Base64...'
  imageUrl?: string;
  tipo: string = '';

  formControlUsuario = this.fb.group({
    direccion:['', Validators.required],
    telefono:['', Validators.required],
    email:['', Validators.required],
    password:['', Validators.required],
    imagen:['', Validators.required]
  })

  constructor(private api_service :UsuarioService,private dropdownService: DropDownService,
    private fb: UntypedFormBuilder,
    ) { }

  ngOnInit() {
    this.carga= true
    this.getAltDocumentos();
    this.getUser();
  }

  ngOnDestroy() {
    this.obtenerImagenUsuario()
  }
  getUser(){
    this.usuarioService.getUsuarioById().subscribe(data=>{
      this.usuario=data
      this.carga=false
      console.info(" usaurio : ",data)
    });
  }
 getAltDocumentos(){
  this.dropdownService.getTipoDoc().subscribe(tipoDocs => {
    this.tDocs = tipoDocs
  })
 }

 submitActualizar(){

    this.usuario.direccion = this.formControlUsuario.value.direccion;
    this.usuario.telefono = this.formControlUsuario.value.telefono;
    this.usuario.email = this.formControlUsuario.value.email;
    this.usuario.password = this.formControlUsuario.value.password;
    this.usuario.imagen = this.localStorageService.geDatosStorage('imgUsub64')

    this.usuarioService.updateUser(this.usuario).subscribe(
      response => {
        console.log('response  ', response);   
        Swal.fire('Usuario editado con éxito', 'success').then(data => {
          window.location.reload()
        }); 
      }, 
      error => {
        if(error.status === 400){
          Swal.fire('Error en la edición del usuario', 'error');
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

 obtenerImagenUsuario() {
   console.log('obtenerImagenUsuario', this.usuario);
   
    if (this.usuario !== null) {
      this.usuarioService.getUsuarioById().subscribe(
        response => {
          this.usuario.imagen = response.imagen
        }, 
        error => {
          if (error.status === 406) {
            Swal.fire('error', 'No existen registros para este usuario' , 'error')
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
  }

  public uploadImage(event: any): void { 
    this.fotousuario = event.target.files[0];
    let tipo = (this.fotousuario?.type)?.split('/')[1];
    localStorage.setItem('tipoImagen', JSON.stringify(tipo))
    if (tipo === 'png') {
      this.imageUrl = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fotousuario)) as string   
      let reader = new FileReader();
      reader.readAsDataURL(this.fotousuario as Blob);
      reader.onloadend = () => {
        this.base64 = reader.result as string;
        const imagen = this.base64.split(',')[1]
        console.log(imagen);
        
        localStorage.setItem('imgUsub64', imagen);
      } 
    } else {
      Swal.fire('Solo se permiten archivos .png', 'error')
    }
  }

}
