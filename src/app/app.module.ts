import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { SlaiderComponent } from './components/slaider/slaider.component';
import { RegistraseComponent } from './components/registrase/registrase.component';
import { LoginComponent } from './components/login/login.component';
import { ListServiceComponent } from './components/list-service/list-service.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PaginatePipe } from './pipes/paginate.pipe';
import { LayoutModule } from './layouts/layout.module';
import { MatDividerModule } from '@angular/material/divider';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RankingComponentenComponent } from './components/ranking-componenten/ranking-componenten.component'
import { DashboardServiceComponent } from './components/dashboard-service/dashboard_service.component';
import { ManageServiceModule } from './components/manage-service/manage-service.module';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';
import { DashboardEventComponent } from './components/dashboard-event/dashboard-event.component';
import { ManageEventModule } from './components/manage-event/manage-event.module';

@NgModule({
  declarations: [
    AppComponent,
    SlaiderComponent,
    RegistraseComponent,
    LoginComponent,
    ListServiceComponent,
    HomeComponent,
    DashboardUserComponent,
    DashboardServiceComponent,
    PaginatePipe,
    RankingComponentenComponent,
    DashboardEventComponent
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
    LayoutModule,
    MatDividerModule,
    MatProgressBarModule,
    HighchartsChartModule,
    FlexLayoutModule,
    MatTabsModule,
    ManageServiceModule,
    ManageEventModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
