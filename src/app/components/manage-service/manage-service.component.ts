import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatStepperModule} from '@angular/material/stepper';
import {ErrorStateMatcher} from '@angular/material/core';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import { Categoria } from '../../models/categoria';

import { DropDownService } from 'src/app/services/drop-down.service';
import { ManageServiceService } from 'src/app/services/manage-service.service';
import { Servicio } from 'src/app/models/servicio';
import { Usuario } from 'src/app/models/usuario';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-manage-service',
  templateUrl: './manage-service.component.html',
  styleUrls: ['./manage-service.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class ManageServiceComponent implements OnInit {

  public Cats : Categoria[];
  public selectedFile: File | undefined;
  public identity : any;
  public service: Servicio
  public usuario!: Usuario;

  formControlCreateService=this.fb.group({
    nombreServicio:['',Validators.required],
    categoria:['',Validators.required],
    descripcionServicio:['',Validators.required],
    direccion:['',Validators.required],
    precionUnidad:['', Validators.required],
    imagenServicio:['', Validators.required],
    terminosCondiciones:[false,Validators.requiredTrue]
  })

  constructor(
    private fb: FormBuilder,
    private dropdownService : DropDownService,
    private _formBuilder: FormBuilder,
    private manageService: ManageServiceService
    ) { 
      this.Cats = new Array<Categoria>();
      this.service = new Servicio();
      this.usuario = new Usuario();
    }

  ngOnInit() {
    this.dropdownService.getCategory().subscribe(category => {
      this.Cats = category
      });
    console.log(this.Cats);

    if(localStorage.getItem('identity') != null || localStorage.getItem('identity') !=  undefined)
    {
      let usuariolocal = localStorage.getItem('identity');
        this.usuario =JSON.parse(usuariolocal!);      
    }
  }

  cargarImagen(event:any){
    this.selectedFile=<File>event.target.files[0]
  }

  enviarImagen(){
    this.manageService.onUpload(this.selectedFile).subscribe(
      response=>{
         if(response.status=='success'){
           console.log(response);
         }
      },
      error=>{
        console.log(<any>error);
      }
    );
    
  }

  reset(){

  }

  submit()
  {
    console.log('Servicio: ',this.formControlCreateService);
    this.service.nombreServicio = this.formControlCreateService.value.nombreServicio;
    this.service.categoria = this.formControlCreateService.value.categoria;
    this.service.descripcionServicio = this.formControlCreateService.value.descripcionServicio;
    this.service.direccion = this.formControlCreateService.value.direccion;
    this.service.proveedor = this.usuario;
    this.service.precionUnidad = this.formControlCreateService.value.precionUnidad;
    this.service.imagenServicio = this.formControlCreateService.value.imagenServicio;
    console.log('service: ', this.service)
    /*Espacio para realizar 
    la implementación del boton cargar imagen */
    this.manageService.createService(this.service).subscribe(response =>{
      let identity = response
      this.identity = identity
    });
  }

}
