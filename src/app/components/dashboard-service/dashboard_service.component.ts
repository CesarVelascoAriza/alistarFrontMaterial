import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ManageServiceComponent } from '../manage-service/manage-service.component';

import { DashboardService } from 'src/app/services/dashboard.service';
import { RankingComponentenComponent } from '../ranking-componenten/ranking-componenten.component';

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
    public dialog:MatDialog
  ) {}

  ngOnInit(): void {
    this.serviciosSolicitados = this.dashboardService.serviciosSolicitados();
    this.proximosEventos = this.dashboardService.proximosEventos();
  }
  
}
