import { Component, OnInit, ViewChild } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { Orden } from 'src/app/models/orden';
import { Servicio } from 'src/app/models/servicio';
import { Usuario } from 'src/app/models/usuario';
import { ApiServicesService } from 'src/app/services/api-services.service';
import { DatosService } from 'src/app/services/datos.service';
import { ManageEventService } from 'src/app/services/manage-event.service';
import { ManageServiceService } from 'src/app/services/manage-service.service';

@Component({
  selector: 'app-service-consult',
  templateUrl: './consult-event.component.html',
  styleUrls: ['./consult-event.component.css']
})
export class ConsultEventComponent implements OnInit {

  usuId : number | any;
  usuIdentity : Usuario | any;
  eventosUsuarios : Orden[]=[];

  public titulo: string;

  constructor(
    private manageEvent: ManageEventService,
    private api_service: ApiServicesService
  ) {
    this.usuIdentity = new Usuario();
    this.usuId = 0;

    this.titulo = 'Mis Eventos';
  }

  ngOnInit(): void {
   // this.obtenerEventos();
  }

  public obtenerEventos(): any {
    let usuario = this.api_service.getUsuarioSesion
    
    this.manageEvent.getAllOrdenByUsuaio(usuario.numeroIdentificacion).subscribe(
      response => {
        this.eventosUsuarios = response
        if (this.eventosUsuarios.length === undefined) {
          this.eventosUsuarios.length = 0;
        }
      }, error => {

      }
    );
  }
}


