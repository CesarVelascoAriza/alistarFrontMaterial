import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public user : boolean;
  public usuario!: Usuario;
  public nombreUsuario:String ='';
  constructor(
    private _router: Router
  ) { 
    this.user=false;
    this.nombreUsuario='';
    if(localStorage.getItem('identity') != null || localStorage.getItem('identity') !=  undefined)
    {
      let usuariolocal = localStorage.getItem('identity');
        this.usuario =JSON.parse(usuariolocal!);
        this.user=true;
        this.nombreUsuario = this.usuario.nombre;
      console.log("Usuario de mas " + this.nombreUsuario);
    }
  }

  ngOnInit(): void {
  }

  cerrarSesion(){
    localStorage.removeItem('identity')
    this._router.navigate(['']).then(data=>{
      window.location.reload()
    })

  }

}
