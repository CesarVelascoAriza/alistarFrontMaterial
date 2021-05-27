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
import { SaveServiceComponent } from './components/save-service/save-service.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


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
    SaveServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
