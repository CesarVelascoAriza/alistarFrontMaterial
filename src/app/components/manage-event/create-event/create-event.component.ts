import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { createTransactionPayment } from 'src/app/models/createTransactionPayment';
import { Estado } from 'src/app/models/estado';
import { Evento } from 'src/app/models/evento';
import { EventoOrden } from 'src/app/models/eventoPostOrden';
import { Orden } from 'src/app/models/orden';
import { Servicio } from 'src/app/models/servicio';
import { Usuario } from 'src/app/models/usuario';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ManageEventService } from 'src/app/services/manage-event.service';
import { ManageServiceService } from 'src/app/services/manage-service.service';
import { ListServiceComponent } from '../../list-service/list-service.component';


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
  servicios: number[] = []
  precios: number[] = []
  valorServicio: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public manageEventService: ManageEventService,
    private manageServiceService: ManageServiceService,
    private dialog:MatDialog
  ) { 
    this.titulo = 'Crea tu evento';
    this.ListaServSeleccionado = new Array<Servicio>();

    this.usuario = new Usuario();
    if(this.route.snapshot.paramMap.get('id')!=null || this.route.snapshot.paramMap.get('id')!=undefined ){
      this.idOrden =Number( this.route.snapshot.paramMap.get('id'));
      this.getOrdenById();
      this.listaServxOrden();
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
      this.seleccionServicio(element.servicio);
    }
  }

  seleccionServicio(id: number){

    this.manageServiceService.viewService(id).subscribe(data=>{
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

  createEvent() {
    console.log(this.crearOrden);
    
  }

  agregarServiciosAlEvento() {
    this.dialog.open(ListServiceComponent)

    this.manageEventService.servicioSeleccionado.subscribe(data => {
      
      //agregarlo por primera vez
      if (this.ListaServSeleccionado.length == 0) {
        this.ListaServSeleccionado.push(data)
        for (let i in this.ListaServSeleccionado) {
          this.ListaServSeleccionado[i].valorTotal = this.ListaServSeleccionado[i].precionUnidad * this.ListaServSeleccionado[i].cantidad
    
        }
  
      } else {
        for (let j in this.ListaServSeleccionado) {
          this.servicioSeleccionado = this.ListaServSeleccionado[j]
          this.servicios.push(this.servicioSeleccionado.idServicio) 
          this.valorServicio = this.ListaServSeleccionado[j].valorTotal;                  
        }
  
        //aumentar la cantidad
        if (this.servicios.includes(data.idServicio)) {
          for (let i in this.ListaServSeleccionado) {
            if (this.ListaServSeleccionado[i].idServicio === data.idServicio) {
              this.ListaServSeleccionado[i].cantidad +=1
              this.ListaServSeleccionado[i].valorTotal = this.ListaServSeleccionado[i].precionUnidad * this.ListaServSeleccionado[i].cantidad
            }            
          }
        } else {
          this.ListaServSeleccionado.push(data)
          for (let i in this.ListaServSeleccionado) {
            this.ListaServSeleccionado[i].valorTotal = this.ListaServSeleccionado[i].precionUnidad * this.ListaServSeleccionado[i].cantidad
          }          
        }
      }
           
    })
  }

  cambiarValorTotal(idServicio: number)
  {
    for (let i in this.ListaServSeleccionado) {
      if (this.ListaServSeleccionado[i].idServicio === idServicio) {
        this.ListaServSeleccionado[i].cantidad +=1
        this.ListaServSeleccionado[i].valorTotal = this.ListaServSeleccionado[i].precionUnidad * this.ListaServSeleccionado[i].cantidad
      }            
    }
  }

  cambiarValorTotalOrden(valor: number) {
    this.precios.push(valor) 
    console.log('precios .. ', this.precios);
    
    /*this.precios.forEach(values => {
      console.log('values,  ', values);
      
      this.crearOrden.precioTotal += values
      console.log('this.crearOrden.precioTotal ', this.crearOrden.precioTotal);
      
    });*/
  }

}
