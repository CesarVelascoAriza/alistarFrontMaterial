import { Component, OnInit } from '@angular/core';

import { Usuario } from 'src/app/models/usuario';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public user : boolean;
  public usuario!: Usuario;
  public nombreUsuario:String ='';

  constructor(
    public api_service: ApiServicesService
  ) { 
    this.api_service.isAuthenticated();
    this.user = false;   
    console.log(this.api_service.isAuthenticated(), ' :this.api_service.isAuthenticated()');
     
    if(this.api_service.isAuthenticated()) {      
      this.user=true;
    }
  }

  ngOnInit(): void {
    
  }

}
