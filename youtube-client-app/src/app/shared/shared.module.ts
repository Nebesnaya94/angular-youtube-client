import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';

import { FilterByWordPipe } from './pipes/filter-by-word.pipe';
import { ColorfulBorderDirective } from './directives/colorful-border.directive';

@NgModule({
  declarations: [FilterByWordPipe, ColorfulBorderDirective],
  imports: [CommonModule],
  exports: [
    FilterByWordPipe,
    ColorfulBorderDirective,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    HttpClientModule,
  ],
})
export class SharedModule {}
