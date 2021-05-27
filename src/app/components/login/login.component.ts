import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
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
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  user:Usuario| undefined;
  constructor(private fb: FormBuilder,private request: ApiServicesService) {

   }

  ngOnInit(): void {
  }


  onSubmit(){
   console.log( this.formUserControl)
   console.log( this.formUserControl.get('username')?.value)
   console.log( this.formUserControl.get('password')?.value)
   console.log( this.formUserControl.value)
    this.request.getUserNamePasswor(this.formUserControl.value).subscribe(
      data=>{
        console.log(data)

      }
    )
  }
}
