import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NadvarComponent } from './components/nadvar/nadvar.component';
import { MaterialModule } from './material/material.module';
import { SlaiderComponent } from './components/slaider/slaider.component';
import { RegistraseComponent } from './components/registrase/registrase.component';
import { LoginComponent } from './components/login/login.component';
import { ListServiceComponent } from './components/list-service/list-service.component';
import { SaveEventComponent } from './components/save-event/save-event.component';
import { SaveOrderComponent } from './components/save-order/save-order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardProveedorComponent } from './components/dashboard-proveedor/dashboard-proveedor.component';
import { ManageServiceComponent } from './components/manage-service/manage-service.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaginatePipe } from './pipes/paginate.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NadvarComponent,
    SlaiderComponent,
    RegistraseComponent,
    LoginComponent,
    ListServiceComponent,
    SaveEventComponent,
    SaveOrderComponent,
    HomeComponent,
    DashboardUserComponent,
    DashboardProveedorComponent,
    ManageServiceComponent,
    FooterComponent,
    PaginatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
