import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConsultEventComponent } from './consult-event/consult-event.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ViewEventComponent } from './view-event/view-event.component';


@NgModule({
  declarations: [
    CreateEventComponent,
    ConsultEventComponent,
    ViewEventComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
    MatCardModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatGridListModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    HighchartsChartModule,
    MatProgressBarModule,
    FlexLayoutModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatTableModule,
    MatDatepickerModule,
    MatDatepickerModule
  ]
})
export class ManageEventModule { }
