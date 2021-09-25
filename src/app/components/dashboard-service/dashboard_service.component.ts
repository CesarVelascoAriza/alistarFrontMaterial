import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiServicesService } from 'src/app/services/api-services.service';

import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard_service.component.html',
  styleUrls: ['./dashboard_service.component.css']
})
export class DashboardServiceComponent implements OnInit {
  
  serviciosSolicitados: [] | any;
  proximosEventos: [] | any;

  constructor(
    private dashboardService: DashboardService,
    public dialog:MatDialog,
    private api_service: ApiServicesService,
  ) {}

  ngOnInit(): void {
    this.serviciosSolicitados = this.dashboardService.serviciosSolicitados();
    this.proximosEventos = this.dashboardService.proximosEventos();
    console.log('usuario en sesion... ', this.api_service.getUsuarioSesion);
  }
  
}
