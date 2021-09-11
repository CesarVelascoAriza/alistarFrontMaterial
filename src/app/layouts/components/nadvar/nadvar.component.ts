import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegistraseComponent } from 'src/app/components/registrase/registrase.component';

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
    private _router: Router
    ) { 
      this.user = false;
      //this.nombreUsuario='';
      if(localStorage.getItem('identity') != null || localStorage.getItem('identity') !=  undefined)
      {
        let usuariolocal = localStorage.getItem('identity');
          //this.usuario =JSON.parse(usuariolocal!);
          this.user=true;
          //this.nombreUsuario = this.usuario.nombre;
        //console.log("Usuario de mas " + this.nombreUsuario);
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

  cerrarSesion(){
    localStorage.removeItem('identity')
    localStorage.removeItem('nombreUsuario')
    this._router.navigate(['']).then(data=>{
      window.location.reload()
    })

  }
}
