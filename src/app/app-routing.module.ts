import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CreateServiceComponent } from './components/manage-service/create-service/create-service.component';
import { ConsultServiceComponent } from './components/manage-service/consult-service/consult-service.component';
import { ListServiceComponent } from './components/list-service/list-service.component';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';
import { DashboardEventComponent } from './components/dashboard-event/dashboard-event.component';
import { ConsultEventComponent } from './components/manage-event/consult-event/consult-event.component';
import { CreateEventComponent } from './components/manage-event/create-event/create-event.component';
import { LoginComponent } from './components/login/login.component';
import { ViewEventComponent } from './components/manage-event/view-event/view-event.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo:'home'},
  {path:'home',component:HomeComponent},
  {path:'create_services',component:CreateServiceComponent},
  {path:'consult_services',component:ConsultServiceComponent},
  {path:'eventos', component:DashboardEventComponent},
  {path:'consult_events', component:ConsultEventComponent},
  {path:'create_events', component:CreateEventComponent},
  {path:'dashboard-user', component:DashboardUserComponent},
  {path:'list',component:ListServiceComponent},
  {path:'login',component:LoginComponent},
  {path:'viewEvent',component:ViewEventComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
