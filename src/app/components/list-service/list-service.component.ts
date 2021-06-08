import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

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
  constructor() { }

  ngOnInit(): void {
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
