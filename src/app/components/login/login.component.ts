import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Usuario } from 'src/app/models/usuario';
import { ConsultaUsuarioResponse } from 'src/app/models/consultaUsuarioResponse';

import { ApiServicesService } from 'src/app/services/api-services.service';
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
    password: ['', Validators.required],
  });
  //user:Usuario| undefined;
  public usuario: Usuario

  public resUsuario: ConsultaUsuarioResponse
  public identity: any
  public consulta: any
  constructor(
    private fb: FormBuilder,
    private request: ApiServicesService,
    private _router: Router
    ) {
      this.usuario = new Usuario();
      this.resUsuario = new ConsultaUsuarioResponse('')
   }

  ngOnInit(): void {
    /**datos del usuario identificado */
    this.identity = this.request.getIdentity();
  }


  onSubmit(){
   console.log( this.formUserControl)
   console.log( this.formUserControl.get('username')?.value)
   console.log( this.formUserControl.get('password')?.value)
   console.log( this.formUserControl.value)
    this.request.getUserNamePassword(this.formUserControl.value).subscribe(
      response=>{
        console.log('usuario: '+response)
        let identity = response
        this.identity = identity

        if (!this.identity.numeroIdentificacion) {
          alert('El usuario no existe')
        } else {
          localStorage.setItem('identity', JSON.stringify(identity))
          localStorage.setItem('nombreUsuario', this.identity.nombre)
          this._router.navigate(['dashboard-user']).then(data => {
            window.location.reload()
          })
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          console.log('el error: ',error)
          alert('Falla en la autenticatición, Por favor Revise sus credenciales')
        }
      }
    );
  }
}
