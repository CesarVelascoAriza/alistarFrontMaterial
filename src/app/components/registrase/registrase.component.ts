import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-registrase',
  templateUrl: './registrase.component.html',
  styleUrls: ['./registrase.component.css']
})
export class RegistraseComponent implements OnInit {

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
  constructor(private fb: FormBuilder,private request: ApiServicesService) { }

  ngOnInit(): void {
  }
  submit(){

  }
}
