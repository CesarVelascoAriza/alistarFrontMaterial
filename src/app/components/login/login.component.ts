import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConsultaUsuarioResponse } from 'src/app/models/consultaUsuarioResponse';
import { ApiServicesService } from 'src/app/services/api-services.service';
import Swal from 'sweetalert2';
import { UsuarioResponse } from 'src/app/models/usuaruiResponse';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  spinner =false;
  formUserControl = this.fb.group({
    usuario: ['', Validators.required],
    password: ['', Validators.required]
  });
  //user:Usuario| undefined;
  usuario: UsuarioResponse  = new UsuarioResponse ;

  public resUsuario: ConsultaUsuarioResponse
  public identity: any
  public consulta: any

  constructor(
    private fb: UntypedFormBuilder,
    private request: ApiServicesService,
    private _router: Router,
    private api_service: ApiServicesService,
    public dialog:MatDialog
  ) {
    this.resUsuario = new ConsultaUsuarioResponse('')
  }

  ngOnInit(): void {

    
  }

  onSubmitIniciar(){
    this.usuario.usuario = parseInt(this.formUserControl.value.usuario);
    this.usuario.password = this.formUserControl.value.password;
    /*if (this.usuario.usuario === NaN || this.usuario.usuario === undefined || this.usuario.password === '') {
      Swal.fire({
				title: 'Opps!',
				text: `Usuario o Contraseña vacíos`,
				icon: 'error',
				confirmButtonText: 'Cerrar'
			})
    }*/
     this.request.getUserNamePassword(this.usuario).subscribe(
       response=>{
         this.api_service.usuarioSession(response.token)
         this.api_service.tokenSession(response.token)
         let usuario = this.api_service.getUsuarioSesion;  
                
         this.dialog.closeAll();
         this._router.navigate(['list'])
         Swal.fire({
            icon: 'success',
            title: 'Login',
            text: `Login correcto para ${usuario.nombre}`
         }).then(data => {
          window.location.reload()
        }); 
          
       },
       error => {
         var errorMessage = <any>error;
         if (errorMessage != null) {
           Swal.fire('error', 'Falla en la autenticatición, Por favor Revise sus credenciales', error)
         }
       }
     );
   }
}
