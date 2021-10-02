import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { createTransactionPayment } from 'src/app/models/createTransactionPayment';
import { Estado } from 'src/app/models/estado';
import { Evento } from 'src/app/models/evento';
import { EventoOrden } from 'src/app/models/eventoPostOrden';
import { Orden } from 'src/app/models/orden';
import { Servicio } from 'src/app/models/servicio';
import { Usuario } from 'src/app/models/usuario';
import { ManageEventService } from 'src/app/services/manage-event.service';
import { ManageServiceService } from 'src/app/services/manage-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  crearOrden: Orden = new Orden();
  listEstado: Estado[] = [];
  events:EventoOrden = new EventoOrden();
  servicioSeleccionado: Servicio = new Servicio();
  ListaServSeleccionado: Servicio [] = [];
  usuario: Usuario;
  evento: Evento[] = [];
  cantidad: number = 1;
  idOrden: number = 0;
  createTrasactionPayment: createTransactionPayment = new createTransactionPayment();
  error: any;
  titulo: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private manageEventService: ManageEventService,
    private manageServiceService: ManageServiceService
  ) { 
    this.titulo = 'Crea tu evento';
    this.ListaServSeleccionado = new Array<Servicio>();
    this.usuario = new Usuario();
    if(this.route.snapshot.paramMap.get('id')!=null || this.route.snapshot.paramMap.get('id')!=undefined ){
      this.idOrden =Number( this.route.snapshot.paramMap.get('id'));
      this.getOrdenById();
      console.log('idOrden: ',this.idOrden)
      this.listaServxOrden();
      console.log('crear Evento:', this.crearOrden);
    }
  }

  ngOnInit(): void {
    this.getListEstado()

    if(localStorage.getItem('usuario') != null || localStorage.getItem('usuario') !=  undefined)
    {
      let usuariolocal = localStorage.getItem('usuario');
        this.usuario =JSON.parse(usuariolocal!);          
    }
  }

  saveChanges() {
    this.ListaServSeleccionado.push(this.servicioSeleccionado);
    console.log(this.servicioSeleccionado)
    
  }

  borrar(id: number)
  {
    console.log('borrar Item id: ', id)
    const index : number = this.ListaServSeleccionado.indexOf(this.servicioSeleccionado,id);
    this.ListaServSeleccionado.splice(index);
    console.log('lista selecciondos: ', this.ListaServSeleccionado)
  }

  getListEstado() {
    this.manageEventService.getAllEstados().subscribe(data => {
      this.listEstado = data;
    })
  }

  editar()
  {
    this.crearOrden.precioTotal += this.servicioSeleccionado.valorTotal
    console.log('valor total: ' + this.crearOrden.precioTotal)
  }

  cambiarValor()
  {
    this.crearOrden.cantidad != 0;
    this.servicioSeleccionado.valorTotal = this.servicioSeleccionado.precionUnidad * this.servicioSeleccionado.cantidad
    console.log( 'cantidad servicio: ' + this.servicioSeleccionado.cantidad);
  }

  createEvent(f: NgForm) {
    this.events.nombreEvento=f.value.nombreServicio;
    this.events.usuario = this.usuario.numeroIdentificacion;
    this.crearOrden.nombreEvento = f.value.nombreServicio;
    this.crearOrden.usuario = this.usuario.numeroIdentificacion;

    console.log('lista select: ', this.ListaServSeleccionado)
    for (let index = 0; index < this.ListaServSeleccionado.length; index++)
    {
      const element = this.ListaServSeleccionado[index];

      var newEvent = new Evento();
      newEvent.cantidad = element.cantidad;
      newEvent.servicio = element.idServicio;
      newEvent.valorTotal = element.valorTotal;

      this.evento.push(newEvent)

      this.crearOrden.precioTotal += newEvent.valorTotal;
    }

    this.crearOrden.evento = this.evento;


    console.log("orden",this.crearOrden)
    console.log("abc",f.valid);
    console.log("xyz",f.value);
    this.manageEventService.guardarOrden(this.crearOrden).subscribe(data=>{
      console.log(data);
    })
  }

  getOrdenById()
  {

    this.manageEventService.getOrdernById(this.idOrden).subscribe(response=>{
      this.crearOrden = response
      this.listaServxOrden();
    });

  }

  listaServxOrden()
  {
    for (let index = 0; index < this.crearOrden.evento.length; index++) {
      const element = this.crearOrden.evento[index];
      console.log('ord: ', element)
      this.seleccionServicio(element.servicio);
    }
  }

  seleccionServicio(id: number){

    this.manageServiceService.viewService(id).subscribe(data=>{
      console.log(data)
      this.servicioSeleccionado = data;
      this.ListaServSeleccionado.push(this.servicioSeleccionado)
    });
    return this.servicioSeleccionado;
  }

  toWhatsApp()
  {
    window.open("https://web.whatsapp.com/send?phone=573003258728", "_blank");
  }

  toPay()
  {
    window.open("https://recarga.nequi.com.co/bdigitalpsl/?_ga=2.81606546.443474604.1621784967-1433038197.1607735026#!/", "_blank");
  }

}
