import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegistraseComponent } from 'src/app/components/registrase/registrase.component';
import { ApiServicesService } from 'src/app/services/api-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nadvar',
  templateUrl: './nadvar.component.html',
  styleUrls: ['./nadvar.component.css']
})
export class NadvarComponent implements OnInit {

  public user : boolean;
  showFiller = false;
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  
  constructor(
    public dialog:MatDialog,
    private _router: Router,
    public api_service: ApiServicesService
  ) { 
    this.user = false; 
    this.api_service.isAuthenticated();
    this.user = false;   
    console.log(this.api_service.isAuthenticated(), ' :this.api_service.isAuthenticated()');
     
    if(this.api_service.isAuthenticated()) {      
      this.user=true;
    }
  }

  ngOnInit(): void {
    
  }

  openDialogSession(){
    const dialogRef = this.dialog.open(LoginComponent);
  }

  openDialogRegistro(){
    let dialogRef = this.dialog.open(RegistraseComponent);
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  public logout(): void {
    this.api_service.logout();
    console.log('this.user ', this.user);
    
    this._router.navigate(['/home'])
    Swal.fire('Sesión finalizada con éxito', 'success').then(data => {
      window.location.reload()
    }); 
    
  }
}
