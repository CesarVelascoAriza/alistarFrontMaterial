import { Component, OnInit, ViewChild } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { Servicio } from 'src/app/models/servicio';
import { Usuario } from 'src/app/models/usuario';
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
  eventosUsuarios : Evento[]=[];
  
  public titulo: string;
  
  constructor(
    private manageEvent: ManageEventService,
    private _dataServices: DatosService
  ) { 
    this.usuIdentity = new Usuario();
    this.usuId = 0;
    
    this.titulo = 'Mis Eventos';
  }

  ngOnInit(): void {
    this.obtenerEventos();
  }

  public obtenerEventos(): any {
    this.usuIdentity = JSON.parse(this._dataServices.getId())
    console.log('this.usuIdentity  ' , this.usuIdentity);
    this.usuId = this.usuIdentity.numeroIdentificacion
    console.log('this.usuId  ' , this.usuId);
    this.manageEvent.getEventsUser(this.usuId).subscribe(
      response =>{
        this.eventosUsuarios = response
        console.log('obtener eventos  ' , this.eventosUsuarios);
    });

  }
  
}


