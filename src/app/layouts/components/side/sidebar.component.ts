import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from 'src/app/models/usuario';
import { ApiServicesService } from 'src/app/services/api-services.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user : boolean;
  usuario!: Usuario;
  nombreUsuario: string ='';
  imagenUsuario: string = "";

  constructor(
    private api_service: ApiServicesService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { 
    this.api_service.isAuthenticated();
    this.user = false;   
     
    if(this.api_service.isAuthenticated()) {      
      this.user=true;
    }

    this.usuario = this.api_service.getUsuarioSesion;
    
  }

  ngOnInit(): void {
    this.obtenerUsuario();
    this.obtenerImagenUsuario();
  }

  obtenerUsuario() {
    if (this.usuario !== null) {
      this.nombreUsuario = this.usuario.nombre
    }
  }

  obtenerImagenUsuario() {
    if (this.usuario !== null) {
      this.usuarioService.getUsuarioById().subscribe(
        response => {
          this.usuario.imagen = response.imagen
          console.log('imagen.. ' , this.usuario.imagen);
        }, 
        error => {
          if (error.status === 406) {
            Swal.fire('error', 'No existen registros para este usuario' , 'error')
          }
          if (error.status == 403) {
            this.api_service.logout();
            this.router.navigate(['/home']).then(data => {
              window.location.reload();
            })
          } 
        }
      )
    }
  }

}
