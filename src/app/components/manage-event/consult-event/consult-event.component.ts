import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Orden } from 'src/app/models/orden';
import { Usuario } from 'src/app/models/usuario';
import { ApiServicesService } from 'src/app/services/api-services.service';
import { ManageEventService } from 'src/app/services/manage-event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-consult',
  templateUrl: './consult-event.component.html',
  styleUrls: ['./consult-event.component.css']
})
export class ConsultEventComponent implements OnInit {

  usuId : number | any;
  usuIdentity : Usuario | any;
  eventosUsuarios : Orden[]=[];
  err: HttpErrorResponse | undefined

  public titulo: string;

  constructor(
    private router: Router,
    private manageEvent: ManageEventService,
    private api_service: ApiServicesService
  ) {
    this.usuIdentity = new Usuario();
    this.usuId = 0;

    this.titulo = 'Mis Eventos';
  }

  ngOnInit(): void {
    this.obtenerEventos();
  }

  public obtenerEventos(): any {
    let usuario = this.api_service.getUsuarioSesion
    console.log(usuario);
    
    this.manageEvent.getAllEventsByUsuaio(usuario.numeroIdentificacion).subscribe(
      response => {
        this.eventosUsuarios = response
        
        if (this.eventosUsuarios.length === undefined) {
          this.eventosUsuarios.length = 0;
        }
      }, error => {
        this.err = error
        console.log('Error del sistema  ', this.err?.status );
        if (this.err?.status == 403) {
          this.api_service.logout();
          this.router.navigate(['/home']);
        }
        Swal.fire('error', this.err?.error , 'error')
      }
    );
  }

  invalidateLogin() {

  }
}


