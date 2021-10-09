import { Component, OnInit, Input  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Servicio } from 'src/app/models/servicio';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.component.html',
  styleUrls: ['./view-service.component.css']
})
export class ViewServiceComponent implements OnInit {

  public servicio: Servicio;

  constructor(
    private localStorageService: LocalStorageService,
    public dialog:MatDialog
  ) { 
    this.servicio = JSON.parse(this.localStorageService.geDatosStorage('servicio'));
  }

  ngOnInit(): void {

  }

  close() {
    this.dialog.closeAll(); 
  }

}
