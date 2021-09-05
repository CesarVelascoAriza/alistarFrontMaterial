import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from 'src/app/models/estado';
import { EventoOrden } from 'src/app/models/eventoPostOrden';
import { Orden } from 'src/app/models/orden';
import { Servicio } from 'src/app/models/servicio';
import { Usuario } from 'src/app/models/usuario';
import { ManageEventService } from 'src/app/services/manage-event.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  public crearOrden: Orden = new Orden();
  public listEstado: Estado[] = [];
  public events:EventoOrden = new EventoOrden();
  public servicioSeleccionado: Servicio = new Servicio();
  public usuario!: Usuario;
  public identity : any;
  public error: any;
  public titulo: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private manageEventService: ManageEventService
  ) { 
    this.titulo = 'Crea tu evento';
  }

  ngOnInit(): void {
    this.getListEstado()
  }

  saveChanges() {
    console.log(this.servicioSeleccionado)
  }

  getListEstado() {
    this.manageEventService.getAllEstados().subscribe(data => {
      this.listEstado = data;
    })
  }

  public createEvent() {
    let usuariolocal = localStorage.getItem('identity');
    this.usuario =JSON.parse(usuariolocal!);
    //this.events.nombreEvento=f.value.nombreServicio;
    this.events.usuario = this.usuario.numeroIdentificacion;
    this.crearOrden.evento.push(this.events);
    this.crearOrden.idOrden =this.servicioSeleccionado.idServicio;
    this.crearOrden.cantidad=1
    this.crearOrden.precioTotal =12321
    console.log("orden",this.crearOrden)
    //console.log(f.valid);
    //console.log(f.value);
    this.manageEventService.guardarOrden(this.crearOrden).subscribe(
    data=>{
      let identity = data
      this.identity = identity
      Swal.fire('Nuevo Evento creado con éxito', 'success');
    }, err => {
      if(err.status === 400){
        this.error = err.error;
        Swal.fire('Error en la creación del evento', 'error');
        console.log(this.error);
      }
    });
  }

}
