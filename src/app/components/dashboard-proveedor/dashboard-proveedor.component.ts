import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard-proveedor',
  templateUrl: './dashboard-proveedor.component.html',
  styleUrls: ['./dashboard-proveedor.component.css']
})
export class DashboardProveedorComponent implements OnInit {
  
  pieChart: [] | any;
  serviciosSolicitados: [] | any;
  proximosEventos: [] | any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.pieChart = this.dashboardService.pieChart();
    this.serviciosSolicitados = this.dashboardService.serviciosSolicitados();
    this.proximosEventos = this.dashboardService.proximosEventos();
  }
}
