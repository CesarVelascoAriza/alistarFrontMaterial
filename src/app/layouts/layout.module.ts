import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NadvarComponent } from './components/nadvar/nadvar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/side/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { PieComponent } from './widgets/pie/pie.component';
import { CardComponent } from './widgets/card/card.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    NadvarComponent,
    FooterComponent,
    SidebarComponent,
    PieComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    HighchartsChartModule
  ],
  exports: [
    NadvarComponent,
    FooterComponent,
    SidebarComponent,
    PieComponent,
    CardComponent
  ]
})
export class LayoutModule { }
