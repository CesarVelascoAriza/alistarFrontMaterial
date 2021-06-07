import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegistraseComponent } from '../registrase/registrase.component';

@Component({
  selector: 'app-nadvar',
  templateUrl: './nadvar.component.html',
  styleUrls: ['./nadvar.component.css']
})
export class NadvarComponent implements OnInit {

  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }

  openDialogSession(){
    const dialogRef = this.dialog.open(LoginComponent);
  }

  openDialogRegistro(){
    let dialogRef = this.dialog.open(RegistraseComponent);
  }
}
