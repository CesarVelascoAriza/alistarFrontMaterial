import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

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
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
   
  }

  close() {
    this.dialog.closeAll();
    this.ordenes = [];
    this.detalleOrden = [];
  }

}
