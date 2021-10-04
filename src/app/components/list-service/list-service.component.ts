import { Component, OnInit, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Servicio } from 'src/app/models/servicio';
import { ManageEventService } from 'src/app/services/manage-event.service';
import { ManageServiceService } from 'src/app/services/manage-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit, OnDestroy {

  page_size : number =12
  page_number: number =1
  pageSizeOptions: number[] = [8, 16, 32, 100];
  pageEvent: PageEvent |undefined;
  servicios: Servicio[] = [];
  msnError: string = "";
  ListaServSeleccionado: Servicio [] = [];
  suscripcion: Subscription = new Subscription(); 

  @ViewChild(MatPaginator) matpaginador:MatPaginator | undefined; 

  constructor(
    private manageService: ManageServiceService,
    private manageEventService: ManageEventService,
    public dialog:MatDialog
  ) {   }

  ngOnInit(): void {
    this.listarServicios()
  }

  ngOnDestroy(): void {
    console.log('Ondestroy en lista', this.manageEventService.servicioSeleccionado);
    this.manageEventService.servicioSeleccionado = new EventEmitter<Servicio>();

  }
  
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  paginar(e:PageEvent){
    this.page_size = e.pageSize
    this.page_number = e.pageIndex +1
    this.servicios
  }

  listarServicios() {
    this.manageService.listarServicios().subscribe(
      response => {
        this.servicios = response;
      }, error => {
        this.msnError = 'Error al Listar Servicios ', error
        Swal.fire('Error', this.msnError, 'error')
      }
    )
  }

  enviarServicio(servicio : Servicio){
    servicio.cantidad = 1;
    servicio.precionUnidad = 1000;
    this.manageEventService.servicioSeleccionado.emit(servicio)

    this.dialog.closeAll()

  }

}
