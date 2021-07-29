import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegistraseComponent } from 'src/app/components/registrase/registrase.component';

@Component({
  selector: 'app-nadvar',
  templateUrl: './nadvar.component.html',
  styleUrls: ['./nadvar.component.css']
})
export class NadvarComponent implements OnInit {

  showFiller = false;
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  
  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }

  openDialogSession(){
    const dialogRef = this.dialog.open(LoginComponent);
  }

  openDialogRegistro(){
    let dialogRef = this.dialog.open(RegistraseComponent);
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }
}
