import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public title:string = 'Contenido de Alistar'
  public copy:string = '© 2021 Copyright:'
  public alistar:string = 'Alistar.com'

  constructor() { }

  ngOnInit(): void {
  }

}
