import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardProveedorComponent } from './components/dashboard-proveedor/dashboard-proveedor.component';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistraseComponent } from './components/registrase/registrase.component';

const routes: Routes = [
  {path:'',component:HomeComponent,pathMatch:'full'},
  {path:'dashboard-user',component:DashboardUserComponent},
  {path:'dashboard-proveedor',component:DashboardProveedorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
