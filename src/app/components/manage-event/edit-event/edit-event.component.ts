import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Estado } from 'src/app/models/estado';
import { Evento } from 'src/app/models/evento';
import { Orden } from 'src/app/models/orden';
import { Servicio } from 'src/app/models/servicio';
import { ApiServicesService } from 'src/app/services/api-services.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ManageEventService } from 'src/app/services/manage-event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  public evento: Evento;
  public ordenes: Servicio[] = [];
  public detalleOrden: Orden[] = [];
  public listEstado: Estado[] = [];
  servicioSeleccionado: Servicio = new Servicio();
  ordenSeleccionada: Orden = new Orden();

  constructor(
    private localStorageService: LocalStorageService,
    private manageEvent: ManageEventService,
    public dialog:MatDialog,
    private api_service: ApiServicesService,
    private router: Router
  ) { 
    this.evento = JSON.parse(this.localStorageService.geDatosStorage('eventoEditar'));
    this.ordenes = this.manageEvent.ordenEvento
    this.detalleOrden = this.manageEvent.detalleOrden
    console.log('this.ordenes... ', this.ordenes);
    console.log('this.detalleOrden... ', this.detalleOrden);
  }

  ngOnInit(): void {
    this.getListEstado();
  }

  actualizarEvento(): void {
    console.log('Evento a aactualizar... ',this.evento);
    
    this.manageEvent.updateEvent(this.evento).subscribe(
      response => {
        this.dialog.closeAll();    
        Swal.fire('Evento editado con éxito', 'success').then(data => {
          window.location.reload()
        }); 
      },
      error => {
        if(error.status === 400){
          Swal.fire('Error en la creación del servicio', 'error');
        }
        console.log('Error del sistema  ', error.status );
        if (error.status == 403) {
          this.api_service.logout();
          this.router.navigate(['/home']).then(data => {
            window.location.reload();
          })
        }
      }
    )
  }

  close() {
    this.dialog.closeAll();
    this.ordenes = [];
    this.detalleOrden = [];
  }

  getListEstado() {
    this.manageEvent.getAllEstados().subscribe(
      data => {
        this.listEstado = data;       
      },
      error => {
        if(error.status === 400){
          Swal.fire('Error', 'Error al crear el evento', 'error')
        }
        if (error.status == 403) {
          this.api_service.logout();
          this.router.navigate(['/home']);
          window.location.reload();
        }
      }
    )
  }

  borrar(idServicio: number, idOrden: number) {

    console.log('idServicio.. ', this.ordenes);
    const index: number = this.ordenes.indexOf(this.servicioSeleccionado, idServicio)
    const index2: number = this.detalleOrden.indexOf(this.ordenSeleccionada, idOrden)
    this.ordenes.splice(index)
    this.detalleOrden.splice(index2)
  }
  
}
