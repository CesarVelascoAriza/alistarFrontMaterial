import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Evento } from 'src/app/models/evento';
import { Orden } from 'src/app/models/orden';
import { Servicio } from 'src/app/models/servicio';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ManageEventService } from 'src/app/services/manage-event.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {

  evento: Evento;
  ordenes: Servicio[] = [];
  detalleOrden: Orden[] = [];
  carga : boolean= false;

  constructor(
    private localStorageService: LocalStorageService,
    public dialog:MatDialog,
    private manageEvent: ManageEventService
  ) { 
    this.evento = JSON.parse(this.localStorageService.geDatosStorage('evento'));
    this.ordenes = this.manageEvent.ordenEvento
    this.detalleOrden = this.manageEvent.detalleOrden
  }

  ngOnInit(): void {
   
  }

  close() {
    this.dialog.closeAll();
    this.ordenes = [];
    this.detalleOrden = [];
  }

}
