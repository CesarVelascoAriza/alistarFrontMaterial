import { Component, OnInit, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Servicio } from 'src/app/models/servicio';
import { ApiServicesService } from 'src/app/services/api-services.service';
import { ManageEventService } from 'src/app/services/manage-event.service';
import { ManageServiceService } from 'src/app/services/manage-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit, OnDestroy {

  page_size : number =4
  page_number: number =1
  pageSizeOptions: number[] = [4, 8, 16, 24];
  pageEvent: PageEvent |undefined;
  servicios: Servicio[] = [];
  msnError: string = "";
  ListaServSeleccionado: Servicio [] = [];
  suscripcion: Subscription = new Subscription(); 

  @ViewChild(MatPaginator) matpaginador:MatPaginator | undefined; 

  constructor(
    private manageService: ManageServiceService,
    private manageEventService: ManageEventService,
    public dialog:MatDialog,
    private api_service: ApiServicesService,
    private router: Router
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
        console.log('Lista de servicios', this.servicios);
      }, error => {
        if(error.status === 400){
          this.msnError = 'Error al Listar Servicios ', error
          Swal.fire('Error', this.msnError, 'error')
        }
        if (error.status == 403) {
          this.api_service.logout();
          this.router.navigate(['/home']);
          window.location.reload();
        }
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
