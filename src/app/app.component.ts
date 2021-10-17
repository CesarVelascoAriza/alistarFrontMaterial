import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServicesService } from './services/api-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'alistarFrontMaterial';
  sideBarOpen = true;

  constructor(
    private router: Router,
    private api_service: ApiServicesService
  ) {

  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen
  }

  ngOnInit() {
    if (!this.api_service.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }
}
