import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Servicio } from 'src/app/models/servicio';
import { ManageServiceService } from 'src/app/services/manage-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit {

  page_size : number =12
  page_number: number =1
  varcon:String[]=['10','12','10','12','10','12','10','12','10','12','10','12','10','12','10','12','10','12','10','12','10','12','10','12','10','12','10','12','10','12','10','12','10','12','10','12'
  ,'10','12','10','12','10','12','10','12','10','12','10','12','10','12','10','12','10','12','10','12','10','12','10','12','10','12','10','12'
  ,'10','12','10','12','10','12','10','12','10','12','10','12'];


  pageSizeOptions: number[] = [8, 16, 32, 100];

  // MatPaginator Output
  pageEvent: PageEvent |undefined;
  
  servicios: Servicio[] = [];
  msnError: string = "";

  constructor(
    private manageService: ManageServiceService
  ) {   }

  ngOnInit(): void {
    this.manageService.listarServicios().subscribe(
      response => {
        this.servicios = response;
      }, error => {
        this.msnError = 'Error al Listar Servicios ', error
        Swal.fire('Error', this.msnError, 'error')
      }
    )
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  paginar(e:PageEvent){
    this.page_size = e.pageSize
    this.page_number = e.pageIndex +1
  }
}
