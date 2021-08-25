import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-ranking-componenten',
  templateUrl: './ranking-componenten.component.html',
  styleUrls: ['./ranking-componenten.component.css']
})
export class RankingComponentenComponent implements OnInit {

  public pieChart: [] | any;
  public titulo: string = 'Servicios más solicitados';

  constructor(
    private dashboardService: DashboardService,
    public dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.pieChart = this.dashboardService.pieChart();
  }

}
