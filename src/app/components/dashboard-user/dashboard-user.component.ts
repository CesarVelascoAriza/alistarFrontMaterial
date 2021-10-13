import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MediaObserver, MediaChange } from '@angular/flex-layout'
import { Subscription } from 'rxjs'
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { TipoDocumento } from 'src/app/models/tipoDocumento';
import { DropDownService } from 'src/app/services/drop-down.service';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit, OnDestroy {


  hide = true;
  usuario: Usuario = new Usuario()
  tDocs : TipoDocumento[] = [];
  day = new Date()
  min = new Date(new Date().getFullYear() - 80, 0, 1);
  max = new Date(new Date().getFullYear() - 18, new Date().getMonth(), this.day.getDate());

  actualizarForm=this.fb.group({
    tipoDocumento:['',Validators.required],
    numberIdentifi:['',Validators.required],
    nameUser:['',Validators.required],
    dateUser:['',Validators.required],
    telefono:['', Validators.required],
    direccion:[this.usuario.direccion, Validators.required],
    password:['', Validators.required],
    email:['',Validators.required]
  });

  constructor(private api_service :UsuarioService,private dropdownService: DropDownService,
    private fb: FormBuilder,
    ) { }

  ngOnInit() {
    this.getAltDocumentos();
    this.getUser();
  }

  ngOnDestroy() {

  }
  getUser(){
    this.api_service.getUsuarioById().subscribe(data=>{
      this.usuario=data
      console.info(" usaurio : ",data)
    });
  }
 getAltDocumentos(){
  this.dropdownService.getTipoDoc().subscribe(tipoDocs => {
    this.tDocs = tipoDocs
  })
 }

 submitActualizar(){
  this.usuario.numeroIdentificacion = this.actualizarForm.value.numberIdentifi ? 0 : this.usuario.numeroIdentificacion;
  this.usuario.direccion = this.actualizarForm.value.direccion ? '' :this.usuario.direccion;
  this.usuario.email = this.actualizarForm.value.email ? '' : this.usuario.email;
  this.usuario.nombre = this.actualizarForm.value.nameUser ? '' :this.usuario.nombre  ;
  this.usuario.telefono = this.actualizarForm.value.telefono?'':this.usuario.telefono;
  this.usuario.fechaNacimiento = this.actualizarForm.value.dateUser?'':this.usuario.fechaNacimiento;

   console.info(this.usuario);

 }
}
