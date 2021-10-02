import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ranking-componenten',
  templateUrl: './ranking-componenten.component.html',
  styleUrls: ['./ranking-componenten.component.css']
})
export class RankingComponentenComponent implements OnInit {

  public pieChart: [] | any;
  public titulo: string = 'Servicios más solicitados';

  constructor(
    public dialog:MatDialog
  ) { }

  ngOnInit(): void {
    
  }

}
