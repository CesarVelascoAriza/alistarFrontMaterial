import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';
import {ErrorStateMatcher} from '@angular/material/core'; 
import { Router } from '@angular/router';

import { ApiServicesService } from 'src/app/services/api-services.service';
import { DropDownService } from 'src/app/services/drop-down.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { TipoDocumento } from '../../models/tipoDocumento';
import { Usuario } from '../../models/usuario';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registrase',
  templateUrl: './registrase.component.html',
  styleUrls: ['./registrase.component.css']
})
export class RegistraseComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup | any ;
  secondFormGroup: FormGroup | any ;
 
  public tDocs : TipoDocumento[];
  public usuario : Usuario;
  public identity : any;

  formControlRegistrarse=this.fb.group({
    tipoDocumento:['',Validators.required],
    numberIdentifi:['',Validators.required],
    nameUser:['',Validators.required],
    dateUser:['',Validators.required],
    telefono:['', Validators.required],
    direccion:['', Validators.required],
    password:['', Validators.required],
    email:['',Validators.required],
    terminosCondiciones:[false,Validators.requiredTrue]
  })
  constructor(
    private fb: FormBuilder,
    private request: ApiServicesService,
    private _formBuilder: FormBuilder,
    private _usuarioService : UsuarioService,
    private dropdownService: DropDownService,
    private _router: Router
    ) { 
      this.tDocs = new Array<TipoDocumento>();
      this.usuario = new Usuario();
    }

  ngOnInit(){
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.dropdownService.getTipoDoc().subscribe(tipoDocs => {
      this.tDocs = tipoDocs
      })
  }
  
  submit(){
    console.log('formControlRegistrarse: ', this.formControlRegistrarse.value);
    /*this._usuarioService.register(this.formControlRegistrarse.value).subscribe(
      response => {
        let identity = response
        console.log(response)
        this.identity = identity
        this._router.navigate([''])
      }
    );*/
  }

}
