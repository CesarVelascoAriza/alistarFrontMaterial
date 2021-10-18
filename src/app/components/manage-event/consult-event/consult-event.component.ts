import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Evento } from 'src/app/models/evento';
import { Orden } from 'src/app/models/orden';
import { Servicio } from 'src/app/models/servicio';
import { Usuario } from 'src/app/models/usuario';
import { ApiServicesService } from 'src/app/services/api-services.service';
import { ManageEventService } from 'src/app/services/manage-event.service';
import { ManageServiceService } from 'src/app/services/manage-service.service';
import Swal from 'sweetalert2';
import { EditEventComponent } from '../edit-event/edit-event.component';
import { ViewEventComponent } from '../view-event/view-event.component';

@Component({
  selector: 'app-service-consult',
  templateUrl: './consult-event.component.html',
  styleUrls: ['./consult-event.component.css']
})
export class ConsultEventComponent implements OnInit {

  usuId : number | any;
  usuIdentity : Usuario | any;
  eventosUsuarios : Evento[]=[];
  eventInfo: Evento;
  err: HttpErrorResponse | undefined
  listaOrdenesEvento: Servicio[]=[];
  listaOrdenes: Orden[] = [];

  public titulo: string;

  constructor(
    private router: Router,
    private manageEvent: ManageEventService,
    private manageService: ManageServiceService,
    private dialog:MatDialog,
    private api_service: ApiServicesService
  ) {
    this.usuIdentity = new Usuario();
    this.usuId = 0;
    this.eventInfo = new Evento();
    this.titulo = 'Mis Eventos';
  }

  ngOnInit(): void {
    this.obtenerEventos();
  }

  public obtenerEventos(): any {
    let usuario = this.api_service.getUsuarioSesion
    console.log('usuario .. ', usuario);
    
    this.manageEvent.getAllEventsByUsuaio(usuario.numeroIdentificacion).subscribe(
      response => {
        this.eventosUsuarios = response
        console.log('Eventos de usuario.. ', this.eventosUsuarios);
        
        if (this.eventosUsuarios.length === undefined) {
          this.eventosUsuarios.length = 0;
        }
      }, error => {
        if(error.status === 400){
          Swal.fire('Error', 'Error al listar eventos', 'error')
        }
        if (error.status == 403) {
          this.api_service.logout();
          this.router.navigate(['/home']).then(data => {
            window.location.reload();
          })
        }
      }
    );
  }

  openDialogViewEvent(idEvent: number) {
    this.manageEvent.viewEvent(idEvent).subscribe(
      response => {
        this.eventInfo = response
        console.log(this.eventInfo);
        if (this.listaOrdenesEvento.length === 0) {
          this.informacionOrden();
        }
        localStorage.setItem('evento', JSON.stringify(this.eventInfo));
        this.dialog.open(ViewEventComponent);
      },
      error => {
        if(error.status === 400){
          Swal.fire({ 
            icon: 'error',
            title: 'Error al Consultar Evento',
            text: error
          })
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

  openDialogEditEvent(idEvent: number) {
    this.manageEvent.viewEvent(idEvent).subscribe(
      response => {
        this.eventInfo = response
        if (this.listaOrdenesEvento.length === 0) {
          this.informacionOrden();
        }
        localStorage.setItem('eventoEditar', JSON.stringify(this.eventInfo))
        this.dialog.open(EditEventComponent)
      }, 
      error => {
        if (error.status === 406) {
          Swal.fire('error', 'Error al editar evento' , 'error')
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

  openDialogDeleteEvent(idEvent: number) {
    this.manageEvent.deleteEvent(idEvent).subscribe(
      response => {
        this.obtenerEventos();
      },
      error => {
        if(error.status === 400){
         Swal.fire({
           icon: 'error',
           title: 'Error al Borrar Evento',
           text:  error
          })
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

  //Método para obtner la información de las ordenes
  informacionOrden() {
    for (let i = 0; i < this.eventInfo.orden.length; i++) {
      console.log(this.eventInfo.orden[i]);
      this.manageService.getServiceById(this.eventInfo.orden[i].servicio).subscribe(
        response => {
          this.listaOrdenesEvento.push(response)
          this.listaOrdenes.push(this.eventInfo.orden[i])              
        },
        error => {
          if(error.status === 404){
            Swal.fire('No hay ordenes para este evento', 'error');
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
    this.manageEvent.ordenEvento = this.listaOrdenesEvento;   
    this.manageEvent.detalleOrden = this.listaOrdenes;
  }
}


