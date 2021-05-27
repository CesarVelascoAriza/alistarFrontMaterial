import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

const MaterialComponents= [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatSelectModule,
  MatNativeDateModule,
  MatDatepickerModule,
]

@NgModule({
  imports: [MaterialComponents],
  exports:[MaterialComponents]
})
export class MaterialModule { }
